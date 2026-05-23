import express from 'express'
import { multipleUpload, singleUpload } from '../../../../middleware/upload/multer.js';
import { deleteDocs, getAllDocs, getClientDocs, getSingleDocs, updateDocs, uploadDocument, uploadMultiDocument } from '../controllers/clientDocsUploadController.js';

const router = express.Router();

router.post('/upload', singleUpload, uploadDocument)
// router.post('/upload-multi' ,multipleUpload , uploadMultiDocument);
router.get("/all", getAllDocs);
router.get("/client/:clientId", getClientDocs);
router.get("/:id", getSingleDocs);
router.patch("/update/:id", updateDocs);
router.delete("/delete/:id", deleteDocs);

export default router;