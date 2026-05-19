import mongoose from "mongoose";
import Document from "../../document/models/clientDocsModel.js";
import cloudinary from "../../../../utils/cloudinary.js";

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

clientSchema.pre("findOneAndDelete", async function (next) {

    try {

        // delete hone wala client
        const client = await this.model.findOne(this.getFilter());

        if (client) {

            // client ke saare docs fetch karo
            const documents = await Document.find({
                clientId: client._id
            });

            // cloudinary se images delete karo
            for (const doc of documents) {

                if (doc.public_id) {

                    await cloudinary.uploader.destroy(
                        doc.public_id
                    );
                }
            }

            // mongo db se docs delete karo
            await Document.deleteMany({
                clientId: client._id
            });
        }

        next();

    } catch (error) {

        next(error);
    }
});

export default mongoose.model("Client", clientSchema);