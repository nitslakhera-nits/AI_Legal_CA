import mongoose from "mongoose";
import Document from "../../document/models/clientDocsModel.js";
import cloudinary from "../../../../config/cloudinary/cloudinary.js";

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


// UNIQUE INDEXES
clientSchema.index(
    { userId: 1, panCardNo: 1 },
    { unique: true }
);

clientSchema.index(
    { userId: 1, aadharNumber: 1 },
    { unique: true }
);


// CASCADE DELETE
clientSchema.post(
    "findOneAndDelete",
    async function (client) {

        try {

            // agar client exist nahi karta
            if (!client) return;

            // client ke documents fetch karo
            const documents = await Document.find({
                clientId: client._id
            });

            // cloudinary images delete
            for (const doc of documents) {

                if (doc.public_id) {

                    await cloudinary.uploader.destroy(
                        doc.public_id
                    );
                }
            }

            // mongoDB documents delete
            await Document.deleteMany({
                clientId: client._id
            });

        } catch (error) {

            console.log("Cascade Delete Error:",error);
        }
    }
);

export default mongoose.model("Client", clientSchema);