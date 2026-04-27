import express from 'express';
import { LoginUser, registerUser, verifyOtp } from '../../controllers/auth/authUserController.js';

const router = express.Router();

router.post('/register' , registerUser)
router.post('/verify-otp' , verifyOtp);
router.post('/login' , LoginUser);

export default router;