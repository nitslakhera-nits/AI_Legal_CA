import User from '../../models/authUser/authUserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendOtpEmail } from '../../services/email/emailService.js';

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, role, password } = req.body;

        if (!firstName || !lastName || !email || !role || !password) {
            return res.status(400).json({ message: "All fields required" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const newUser = new User({
            firstName,
            lastName,
            email,
            role,
            password: hashedPassword,
            otp,
            otpExpiry: Date.now() + 10 * 60 * 1000
        });

        await newUser.save();
        await sendOtpEmail(email, otp);

        res.status(201).json({
            message: "Registered. Please verify OTP.", user: newUser
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};