import { loginValidator, registerValidator } from '../validations/auth'
import User from '../models/User'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { error } = registerValidator.validate(req.body, { abortEarly: false });

        if (error) {
            const messages = error.details.map(item => item.message);
            return res.status(500).json(messages);
        }

        const existUser = await User.findOne({ email });
        if (existUser) return res.status(500).json({ messages: "Email already registered" });

        const hashedPassword = await bcryptjs.hash(password, 10)
        const role = (await User.countDocuments({}) === 0 ? "admin" : "user");

        const user = await User.create({ ...req.body, password: hashedPassword, role });

        return res.status(201).json({ messages: "Registration successful", user });

    } catch (error) {
        console.log(error)
    }
}

export const login = async (req, res) => {
    try {
        const { error } = loginValidator.validate(req.body)
        if (error) res.status(400).json({ message: error.message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) res.status(404).json({ message: "User not found" });

        const isMatch = await bcryptjs.compare(req.body.password, user.password);

        if (!isMatch) res.status(400).json({ message: "Password mismatch" });

        const token = jwt.sign({ userId: user._id }, "123456", { expiresIn: "1h" })

        return res.status(200).json({ message: "Login successful", userId: user._id, token })

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const logout = async (req, res) => {

}