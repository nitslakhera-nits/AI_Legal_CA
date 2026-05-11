import User from '../../models/authUserModel.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { sendOtpEmail, sendResetPasswordEmail } from '../../services/email/emailService.js';
import { generateAccessToken, generateRefreshToken } from '../../../../utils/generateToken.js';
import { createUser } from '../../services/auth/authService.js';
import { sendResponse } from '../../../../utils/apiResponse.js';
import { asyncHandler } from '../../../../middleware/asyncHandler.js';
import generateOtp from '../../../../utils/generateOtp.js';


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

export const resendOtp = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (user.isVerified) {
        res.status(400);
        throw new Error("User already verified");
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    await user.save();
    await sendOtpEmail(email, otp);

    sendResponse(res, 200, true, "OTP resent successfully");
});

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
        res.status(404);
        return sendResponse(res, 200, true, "If email exists, link sent.");
    }
    if (!userExists.isVerified) {
        res.status(400);
        return sendResponse(res, 200, true, "Please verify your email before resetting password", { email });
    }

    // Generate reset token and save to user document
    const token = crypto.randomBytes(20).toString('hex');
    userExists.resetPasswordToken = token; // Store token in user document
    userExists.resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes expiry

    await userExists.save();
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`; // Generate reset link with token
    await sendResetPasswordEmail(email, resetLink); // Send reset link via email

    // Send reset link via email
    await sendResponse(res, 200, true, "Reset Link sent ", { token, resetLink: resetLink });

});

export const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() } // Check if token is not expired
    });
    if (!user) {
        res.status(400);
        throw new Error("Invalid or expired reset password token");
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpiresAt = null;
    await user.save();

    sendResponse(res, 200, true, "Password reset successful");
});

export const LoginUser = asyncHandler(async (req, res) => {

    const { email, password, role } = req.body;

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
    const accessToken = generateAccessToken(userExists);
    const refreshToken = generateRefreshToken(userExists);

    // Save refresh token in database
    userExists.refreshToken = refreshToken;

    userExists.isLoggedIn = true;
    await userExists.save();

    //set cookies for access and refresh tokens
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000 // 15 min for access token expiration
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days for refresh token expiration
    });

    // Send user data in response
    const userData = {
        _id: userExists._id,
        email: userExists.email,
        role: userExists.role,
    };

    sendResponse(res, 200, true, "Login successful", { user: userData });



});

export const LogOutUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    user.refreshToken = null;
    user.isLoggedIn = false;
    await user.save();

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    sendResponse(res, 200, true, "Logout successful");
});