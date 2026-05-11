import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        otp: {
            type: String,
            required: true
        },
        expiresAt: Date
    }
});

export default mongoose.model('OTP', otpSchema);