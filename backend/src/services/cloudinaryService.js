import { fileToDataUri } from "../utils/fileToDataUri.js"
import cloudinary from "../utils/cloudinary.js"

export const uploadToCloudinary = async(file)=>{
    const dataURI = fileToDataUri(file);

    return await cloudinary.uploader.upload(dataURI ,{
        folder : "legal_ca_ai"
    });
};