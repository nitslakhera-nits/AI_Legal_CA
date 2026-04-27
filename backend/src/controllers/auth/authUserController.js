import User from '../../models/authUser/authUserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../../services/email/emailService.js';

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, role, password } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !role || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            role,
            password: hashedPassword
        })

        //send OTP to email
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
        sendEmail(email, token); //send OTP to email

        newUser.token = token;
        await newUser.save();

        return res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}