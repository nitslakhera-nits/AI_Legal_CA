import { asyncHandler } from "../../../../middleware/asyncHandler.js";
import Client from "../models/clientModel.js";
import createClient from "../services/clientServices.js";
import { sendResponse } from "../../../../utils/apiResponse.js";


export const registerClient = asyncHandler(async (req, res) => {
    

    try {

        await createClient({ ...req.body, userId: req.user._id });

        sendResponse(res, 201, true, "Client Added");

    } catch (error) {

        res.status(400);

        throw new Error(error.message);
    }

});

export const getAllClients = asyncHandler(async (req, res) => {
    const clients = await Client.find({ userId: req.user._id }).sort({ createdAt: -1 });
    sendResponse(res, 200, true, "Clients Fetched Successfully", clients);
});

export const getByIdClient = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const clientId = await Client.findOne({ _id: id, userId: req.user._id }).lean();
    console.log(clientId);
    if (!clientId) {
        res.status(404);
        throw new Error("Client Not Found");
    }

    sendResponse(res, 200, true, " single Client data fetch successfully", clientId);
})

export const updateClient = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const updatedClients = await Client.findOneAndUpdate(
        {
            _id: id,
            userId: req.user._id
        },

        req.body,
        {
            returnDocument: "after", // update hone ke baad wala latest document return karo.
            runValidators: true
        }
    );

    if (!updatedClients) {
        res.status(404);
        throw new Error("Client Not Found");
    }

    sendResponse(res, 200, true, "Client Updated Successafully", updatedClients);


})

export const deleteClient = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteClient = await Client.findOneAndDelete({
        _id: id,
        userId: req.user._id
    });

    if (!deleteClient) {
        res.status(404);
        throw new Error("Client Not Found");
    }

    sendResponse(res, 200, true, "Client Deleted SuccessFully");
});