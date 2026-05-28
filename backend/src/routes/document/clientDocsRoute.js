// import { deleteDocs, getAllDocs, getClientDocs, getSingleDocs, updateDocs, uploadDocument } from '../../controller/clientDocsUploadController.js';
import { singleUpload } from '../../middleware/upload/multer.js';
import { deleteDocs, getAllDocs, getClientDocs, getSingleDocs, updateDocs, uploadDocument } from '../../controller/document/clientDocsUploadController.js';
// import { multipleUpload, singleUpload } from '@/middleware';
import express from 'express'

const router = express.Router();

router.post('/upload', singleUpload, uploadDocument)
// router.post('/upload-multi' ,multipleUpload , uploadMultiDocument);
router.get("/all", getAllDocs);
router.get("/client/:clientId", getClientDocs);
router.get("/:id", getSingleDocs);
router.patch("/update/:id", updateDocs);
router.delete("/delete/:id", deleteDocs);

export default router;