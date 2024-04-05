import { loginValidator, registerValidator } from '../validations/auth'
import User from '../models/User'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { hashPassword } from '../utils/hashPassword'
import { generateToken } from '../utils/jwt'

export const register = async (req, res) => {
    try {

        const existUser = await User.findOne({ email });
        if (existUser) return res.status(500).json({ messages: "Email already registered" });

        // const hashedPassword = await bcryptjs.hash(password, 10)
        const role = (await User.countDocuments({}) === 0 ? "admin" : "user");

        const hashPass = await hashPassword(req.body.password)

        const user = await User.create({ ...req.body, password: hashPass, role: role });

        return res.status(201).json({ messages: "Registration successful", user });

    } catch (error) {

        next(error);

    }
}

export const login = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email });
        if (!user) res.status(404).json({ message: "User not found" });

        const isMatch = await bcryptjs.compare(req.body.password, user.password);

        if (!isMatch) res.status(400).json({ message: "Password mismatch" });

        const token = generateToken({ userId: user._id }, "10d")

        return res.status(200).json({ message: "Login successful", userId: user._id, token })

    } catch (error) {

        next(error);

    }
}

export const logout = async (req, res) => {

}