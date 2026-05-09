import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "Name must be at least 3 characters"],
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,

    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
        match: [/^[0-9]+$/, "Only numbers are allowed"],
        minlength: [10, "Phone number must be 10 digits"],
        maxlength: [10, "Phone number must be 10 digits"],
    },
    panCardNo: {
        type: String,
        required: [true, "PAN card number is required"],
        unique: true,
        trim: true,
        uppercase: true,
        match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card number",],
    },
    aadharNumber: {
        type: String,
        required: [true, "Aadhaar number is required"],
        unique: true,
        trim: true,
        match: [
            /^[0-9]{12}$/,
            "Aadhaar number must be exactly 12 digits",
        ],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
        minlength: [3, "Address must be at least 3 characters"],
        maxlength: [200, "Address cannot exceed 200 characters"],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

export default mongoose.model('Client',clientSchema);