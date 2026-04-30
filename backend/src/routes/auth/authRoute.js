import express from 'express';
import { LoginUser, LogOutUser, registerUser, verifyOtp } from '../../controllers/auth/authUserController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register' , registerUser)
router.post('/verify-otp' , verifyOtp);
router.post('/login' , LoginUser);
router.post('/logout' ,authMiddleware, LogOutUser);

export default router;