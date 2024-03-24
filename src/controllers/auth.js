import { registerValidator } from '../validations/auth'
import User from '../models/User'
import bcryptjs from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const { email, password, name, avatar } = req.body;
        const { error } = registerValidator.validate(req.body, { abortEarly: false });
        if (error) {
            const messages = error.detail.map(item => item.messages);
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

export const signin = async (req, res) => {

}

export const logout = async (req, res) => {

}