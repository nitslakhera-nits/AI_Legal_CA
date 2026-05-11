import express from 'express'
import { multipleUpload, singleUpload } from '../../../../middleware/multer.js';
import { authMiddleware } from '../../../../middleware/authMiddleware.js';
import { deleteDocs ,getAllDocs, getSingleDocs, updateDocs, uploadDocument, uploadMultiDocument } from '../controllers/clientDocsUploadController.js';

const router = express.Router();

router.post('/upload', authMiddleware, singleUpload, uploadDocument)
// router.post('/upload-multi' ,multipleUpload , uploadMultiDocument);
router.get("/all", authMiddleware, getAllDocs);
router.get("/:id", authMiddleware, getSingleDocs);
router.patch("/update/:id", authMiddleware, updateDocs);
router.delete("/delete/:id", authMiddleware, deleteDocs);

export default router;