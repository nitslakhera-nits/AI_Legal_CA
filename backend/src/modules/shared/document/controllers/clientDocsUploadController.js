import { asyncHandler } from "../../../../middleware/asyncHandler.js";
import client from "../../client/models/clientModel.js";
import { deleteDocuemnt, getAllDocuments, getSingleDocument, updateDocumnt, uploadDocs, uploadMultipleDocs } from "../services/documentService.js";
import { sendResponse } from "../../../../utils/apiResponse.js";

//create docs file form
export const uploadDocument = asyncHandler(async (req, res) => {
    const document = await uploadDocs(req);

    sendResponse(res, 201, true, "Documents Uploaded", document.toObject());

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
    const document = await getSingleDocument(req.params.id);

    sendResponse(res, 201, true, "Document Fetched", document.toObject());
});

//UPADATE DOCUMENT
export const updateDocs = asyncHandler(async (req, res) => {
    const document = await updateDocumnt(req.params.id, req.body);

    sendResponse(res, 200, true, "Document Updated", document);
});

//DELETE DOCUMENT
export const deleteDocs = asyncHandler(async (req, res) => {
    await deleteDocuemnt(req.params.id);

    sendResponse(res, 200, true, "Document Deleted");
});
