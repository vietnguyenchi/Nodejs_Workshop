import { errorMessages } from "../constants/message";

const checkPermission = (roles) => (req, res, next) => {
    try {

        const hashPermission = roles.some(role => req.user.roles.includes(role));

        if (!hashPermission) return res.status(403).json({ message: errorMessages.PERMISSION_DENIED })

        next();

    } catch (error) {

        next(error);

    }
}

export default checkPermission;