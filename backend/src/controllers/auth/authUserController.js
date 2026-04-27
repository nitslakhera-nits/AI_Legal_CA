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

export const verifyOtp = async (req, res) => {
    try {
        const {email , otp} = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(user.otp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        res.status(200).json({ message: "OTP verified successfully" });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const LoginUser = async (req, res) => {
    try {
            const { email ,password , role} = req.body;

            //check user exists or not
            const userExists = await User.findOne({ email });
            if(!userExists){
                return res.status(404).json({ message: "User not found" });
            }

            // Check if the user is verified
            if(!userExists.isVerified){
                return res.status(400).json({ message: "Please verify your email first" });
            }

            //check password
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if(!isPasswordValid){
                return res.status(400).json({ message: "Invalid password" });
            }

            //check role
            if(userExists.role !== role){
                return res.status(400).json({ message: "Invalid role" });
            }

            res.status(200).json({ message: "Login successful" , user: {
                id: userExists._id,
                firstName: userExists.firstName,
                lastName: userExists.lastName,
                email: userExists.email,
                role: userExists.role
            } });

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}