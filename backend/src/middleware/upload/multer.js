import multer from 'multer'

const storage = multer.memoryStorage();

//single upload file
export const singleUpload = multer({storage}).single("file");

//multiple upload up to 10
export const multipleUpload = multer({storage}).array("files" , 10)