import express from 'express';
import { deleteClient, getAllClients, getByIdClient, registerClient, updateClient } from '../../controller/client/clientsController.js';

const router = express.Router();

router.post("/register-client", registerClient);
router.get('/all-clients', getAllClients);
router.get('/get-single-client/:id', getByIdClient);
router.patch('/update-client/:id', updateClient);
router.delete('/delete-client/:id', deleteClient);

export default router;