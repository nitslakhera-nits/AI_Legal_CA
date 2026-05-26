import { fileToDataUri } from "../utils/files/fileToDataUri.js"
import cloudinary from "../config/cloudinary/cloudinary.js"

export const uploadToCloudinary = async(file)=>{
    const dataURI = fileToDataUri(file);

    return await cloudinary.uploader.upload(dataURI ,{
        folder : "legal_ca_ai"
    });
};