import mongoose from "mongoose";


const documentSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
        required: true,
    },
    documentType: {
        type: String,
        enum: ["AADHAR", "PAN", "GST", "TDS", "BANK_STATEMENT", "ITR"],
        required: true,
    },
    fileUrl: {
        type: String,
        default: null,
    },
    public_id: { //image delete/update karne ke liye
        type: String,
        default: null,
    },

    // manual form data
    extractedData: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

documentSchema.index(
    { clientId: 1, documentType: 1 ,  uploadedBy: 1},
    { unique: true }
);

export default mongoose.model('Document', documentSchema);