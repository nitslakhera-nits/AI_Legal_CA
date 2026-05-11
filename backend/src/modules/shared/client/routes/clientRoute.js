import express from 'express';
import { authMiddleware } from '../../../../middleware/authMiddleware.js';
import { deleteClient, getAllClients, getByIdClient, registerClient, updateClient } from '../controllers/clientsController.js';

const router = express.Router();

router.post("/register-client" ,authMiddleware, registerClient);
router.get('/all-clients' , authMiddleware,getAllClients);
router.get('/get-single-client/:id' ,authMiddleware,getByIdClient);
router.patch('/update-client/:id' , authMiddleware,updateClient);
router.delete('/delete-client/:id' ,authMiddleware,deleteClient);

export default router;