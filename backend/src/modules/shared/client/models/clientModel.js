import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    firstName: {
        type: String,
        required: true,
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
        trim: true,
    },

    phone: {
        type: String,
        required: true,
        trim: true,
    },

    panCardNo: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },

    aadharNumber: {
        type: String,
        required: true,
        trim: true,
    },

    address: {
        type: String,
        required: true,
        trim: true,
    }

}, { timestamps: true });

// same user duplicate Aadhaar add nahi kar payega
clientSchema.index(
    { userId: 1, panCardNo: 1 },
    { unique: true }
);

// same user duplicate Aadhaar add nahi kar payega
clientSchema.index(
    { userId: 1, aadharNumber: 1 },
    { unique: true }
);

export default mongoose.model("Client", clientSchema);