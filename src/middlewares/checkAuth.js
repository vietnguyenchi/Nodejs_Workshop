import { errorMessages } from "../constants/message";
import { verifyToken } from "../utils/jwt";
import User from "../models/User";

const checkAuth = async (req, res, next) => {
    try {

        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) return res.status(400).json({ message: errorMessages.TOKEN_INVALID });

        const decode = verifyToken(token);
        if (!decode) return res.status(400).json({ message: errorMessages.TOKEN_INVALID });

        const user = await User.findById(decode.userId);
        if (!user) return res.status(404).json({ message: "User not found" })

        req.user = user;
        next();

    } catch (error) {

        next(error);

    }
}

export default checkAuth;