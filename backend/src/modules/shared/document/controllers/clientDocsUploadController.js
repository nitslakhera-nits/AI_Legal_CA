import { asyncHandler } from '../../../../utils/handlers/asyncHandler.js';
import client from "../../client/models/clientModel.js";
import { deleteDocument, getAllDocuments, getClientDocuments, getSingleDocument, updateDocumnt, uploadDocs, uploadMultipleDocs } from "../services/documentService.js";
import { sendResponse } from "../../../../utils/response/apiResponse.js";

//create docs file form
export const uploadDocument = asyncHandler(async (req, res) => {

    try {

        const document = await uploadDocs(req);

        sendResponse(
            res,
            201,
            true,
            "Documents Uploaded",
            document.toObject()
        );

    } catch (error) {

        res.status(400);

        throw error;
    }
});

export const uploadMultiDocument = asyncHandler(async (req, res) => {

    const document = await uploadMultipleDocs(req);
    sendResponse(res, 201, true, "Documents Uploaded", document.toObject());


})

//GET ALL DOCUMENT
export const getAllDocs = asyncHandler(async (req, res) => {
    const documents = await getAllDocuments(req);

    sendResponse(res, 201, true, "Document Fetched", documents)
});

//GET SINGLE DOCUMENT
export const getSingleDocs = asyncHandler(async (req, res) => {
    const document = await getSingleDocument(req.params.id, req.user._id);

    sendResponse(res, 201, true, "Document Fetched", document.toObject());
});

//GET CLIENT DOCUMENT
export const getClientDocs = asyncHandler(
    async (req, res) => {

        const documents = await getClientDocuments(req.params.clientId, req.user._id);

        sendResponse(res, 200, true, "Client Documents Fetched", documents);
    }
);

//UPADATE DOCUMENT
export const updateDocs = asyncHandler(async (req, res) => {
    const document = await updateDocumnt(req.params.id, req.body, req.user._id);

    sendResponse(res, 200, true, "Document Updated", document);
});

//DELETE DOCUMENT
export const deleteDocs = asyncHandler(async (req, res) => {
    await deleteDocument(req.params.id, req.user._id);

    sendResponse(res, 200, true, "Document Deleted");
});
