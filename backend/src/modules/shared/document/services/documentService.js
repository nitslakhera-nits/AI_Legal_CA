
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
        extractedData: JSON.parse(extractedData),
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

        });

        uploadedDocuments.push(document);
    }

    return uploadedDocuments;
};

//GET ALL DOCUMENT 
export const getAllDocuments = async (req) => {
    return await Document.find()
        .populate("clientId")
        .sort({ createdAt: -1 })
};

//GET SINGLE DOCUMENT
export const getSingleDocument = async (id) => {
    const document = await Document.findById(id).populate("clientId"); // client + docs ka data ...agr only docs ka data chaiye to find() hta do 

    if (!document) {
        throw new Error("Document Not Find");
    }

    return document;


}

//UPDATE CLIENT DOCUMENT
export const updateDocumnt = async (id, body) => {
    const document = await Document.findByIdAndUpdate(
        id,
        body, //body = frontend/client se jo updated data aa raha h.mean req.body hoti h
        {
            returnDocument: "After", // frontend ko latest updated data mile waps DB se fetch na kre 
            runValidators: true //update time par bhi schema validation
        }
    )
}

//DELETE DOCUMENT
export const deleteDocuemnt = async (id) => {
    const document = await Document.findById(id);

    if (!document) {
        throw new Error("Document Not Found");
    }
    await document.deleteOne();
    return true;
}