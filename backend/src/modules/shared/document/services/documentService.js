
import Document from "../models/clientDocsModel.js"
import { uploadToCloudinary } from "../../../../services/cloudinaryService.js";
import Client from "../../client/models/clientModel.js";

//upload docs and client data
export const uploadDocs = async (req) => {
    const file = req.file;
    const { clientId, documentType, extractedData } = req.body;

    //client check
    const clientExist = await Client.findById(clientId);
    if (!clientExist) {

        throw new Error("Client Not Found");
    }

    // JSON PARSE SAFE
    let parsedData = {};

    try {
        parsedData = extractedData ? JSON.parse(extractedData) : {};

    } catch (error) {
        throw new Error("Invalid Extracted Data");
    }

    let fileUrl = null;
    let public_id = null;
    //optional file upload 
    if (file) {

        const uploadedFile = await uploadToCloudinary(file);

        fileUrl = uploadedFile.secure_url; //uploaded file ka internet URL . jisse browser me file open ho sakti h
        public_id = uploadedFile.public_id; //Cloudinary ki unique id .
    }


    const document = await Document.create({
        clientId,
        documentType,
        fileUrl, //Cloudinary ek object(secure file) return karta h
        public_id,
        extractedData: parsedData,
        uploadedBy: req.user._id
    });
    return document;
};


// MULTIPLE UPLOAD
export const uploadMultipleDocs = async (req) => {
    const files = req.files;
    const { clientId, documentType } = req.body;

    if (!files || files.length === 0) {
        throw new Error("Files are required");
    }

    const clientExists = await Client.findById(clientId);
    if (!clientExists) {
        throw new Error("Client Not Found");
    }

    const uploadedDocuments = [];

    for (const file of files) {
        const uploadFile = await uploadToCloudinary(file);

        const document = await Document.create({
            clientId,
            documentType,
            fileUrl: uploadFile.secure_url,
            public_id: uploadFile.public_id,
            uploadedBy: req.user._id

        });

        uploadedDocuments.push(document);
    }

    return uploadedDocuments;
};

//GET ALL DOCUMENT 
export const getAllDocuments = async (req) => {
    return await Document.find({
        uploadedBy: req.user._id
    })
        .populate("clientId")
        .sort({ createdAt: -1 })

};

//GET SINGLE DOCUMENT
export const getSingleDocument = async (id, userId) => {
    const document = await Document.findOne({
        _id: id,
        uploadedBy: userId
    }).populate("clientId");

    if (!document) {
        throw new Error("Document Not Find");
    }

    return document;


}

export const getClientDocuments = async (clientId, userId) => {

    const documents = await Document.find({
        clientId,
        uploadedBy: userId
    })
        .populate("clientId")
        .sort({ createdAt: -1 });

    return documents;
};

//UPDATE CLIENT DOCUMENT
export const updateDocumnt = async (id, body, userId) => {
    const document = await Document.findOneAndUpdate(
        {
            _id: id,
            uploadedBy: userId
        },
        body, //body = frontend/client se jo updated data aa raha h.mean req.body hoti h
        {
            returnDocument: "After", // frontend ko latest updated data mile waps DB se fetch na kre 
            runValidators: true //update time par bhi schema validation
        }
    );
    if (!document) {
        throw new Error("Document Not Found");
    }

    return document;
}

//DELETE DOCUMENT
export const deleteDocument = async (id, userId) => {
    const document = await Document.findOne({
        _id: id,
        uploadedBy: userId
    });

    if (!document) {
        throw new Error("Document Not Found");
    }
    await document.deleteOne();
    return true;
}