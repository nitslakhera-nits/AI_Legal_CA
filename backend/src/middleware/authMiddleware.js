import jwt from 'jsonwebtoken';
import { asyncHandler } from './asyncHandler.js';
import User from '../models/authUser/authUserModel.js';

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401);
        throw new Error("Access denied. No token provided.");
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await User.findById(decoded.id);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        if (user.token !== token) {
            res.status(401);
            throw new Error("Token expired or replaced");
        }

        req.user = {
            id: user._id,
            role: user.role
        };

        next();

    } catch (error) {
        res.status(401);
        throw new Error(error.message || "Invalid token");
    }
});