export const fileToDataUri = (file) => {
    const b64 = Buffer.from(file.buffer).toString("base64");

    return `data:${file.mimetype};base64,${b64}`; //Base64 Data URL bana raha hai
}