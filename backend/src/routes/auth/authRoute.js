import express from 'express';
import { forgotPassword, LoginUser, LogOutUser, registerUser, resendOtp, resetPassword, verifyOtp } from '../../controllers/auth/authUserController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register' , registerUser);
router.post('/verify-otp' , verifyOtp);
router.post('/resend-otp' , resendOtp);
router.post('/forgot-password' , forgotPassword);
router.post('/reset-password/:token' , resetPassword);
router.post('/login' , LoginUser);
router.post('/logout' ,authMiddleware, LogOutUser);

export default router;