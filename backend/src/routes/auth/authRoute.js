import express from 'express';
import { authMiddleware } from '../../middleware/index.js';
import { forgotPassword, LoginUser, LogOutUser,  resendOtp, resetPassword,  registerUser, refreshAccessToken, verifyOtp } from '../../controller/auth/authUserController.js';

const router = express.Router();

router.post('/register' , registerUser);
router.post('/verify-otp' , verifyOtp);
router.post('/resend-otp' , resendOtp);
router.post('/forgot-password' , forgotPassword);
router.post('/reset-password/:token' , resetPassword);
router.post('/login' , LoginUser);
router.post('/refresh-token' , refreshAccessToken)
router.post('/logout' ,authMiddleware, LogOutUser);

export default router;