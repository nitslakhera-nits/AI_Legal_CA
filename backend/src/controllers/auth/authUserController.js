import User from '../../models/authUser/authUserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendOtpEmail } from '../../services/email/emailService.js';
import { generateToken } from '../../utils/generateToken.js';
import { createUser } from '../../services/auth/authService.js';
import { sendResponse } from '../../utils/apiResponse.js';
import {
    asyncHandler

} from '../../middleware/asyncHandler.js';
export const registerUser = asyncHandler(async (req, res) => {

    const { firstName, lastName, email, role, password } = req.body;

    if (!firstName || !lastName || !email || !role || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const { user, otp } = await createUser(req.body)

    await sendOtpEmail(email, otp);

    sendResponse(res, 201, true, "Registered. Please verify OTP.");

});

export const verifyOtp = asyncHandler(async (req, res) => {

    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    if (user.otp !== otp || !user.otpExpiresAt || user.otpExpiresAt < Date.now()) {
        res.status(400);
        throw new Error("Invalid or expired OTP");
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();
    sendResponse(res, 200, true, "OTP verified successfully. You can now log in.");

});

export const LoginUser = asyncHandler(async (req, res) => {

    const { email, password, role, isLoggedIn } = req.body;

    //check user exists or not
    const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(404);
        throw new Error("User not found");
    }

    // Check if the user is verified
    if (!userExists.isVerified) {
        res.status(400);
        throw new Error("Please verify your email before logging in");
    }

    //check password
    const isPasswordValid = await bcrypt.compare(password, userExists.password);
    if (!isPasswordValid) {
        res.status(400);
        throw new Error("Invalid password");
    }

    //check role
    if (userExists.role !== role) {
        res.status(400);
        throw new Error("Invalid role");
    }

    //token
    const newToken = generateToken(userExists);

    userExists.token = newToken;
    userExists.isLoggedIn = true;

    await userExists.save();

    sendResponse(res, 200, true, "Login successful", { token: newToken, userExists });



});

export const LogOutUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    user.token = null;
    user.isLoggedIn = false;
    await user.save();
    sendResponse(res, 200, true, "Logout successful");
});