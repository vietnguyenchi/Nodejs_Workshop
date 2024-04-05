import { errorMessages } from "../constants/message";

const checkIsAdmin = async (req, res, next) => {
    try {
        if (req?.user?.role !== "admin") {
            console.log(req.user);
            return res.status(403).json({ message: errorMessages.PERMISSION_DENIED || "Permission denied!" });
        }

        next();

    } catch (error) {

        next(error);

    }
}

export default checkIsAdmin;