import bcrypt from "bcryptjs";
import User from "../../models/authUser/authUserModel.js";
import jwt from "jsonwebtoken";
import generateOtp from "../../utils/generateOtp.js";

export const createUser = async (data) => {
    const { firstName, lastName, email, role, password } = data;

    const userExists = await User.findOne({email});

    if(userExists){
        throw new Error("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOtp();

    const newUser = new User({
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword,
        otp,
        otpExpiresAt: Date.now() + 10 * 60 * 1000
    });
    
    await newUser.save();

    return { email , otp}

}