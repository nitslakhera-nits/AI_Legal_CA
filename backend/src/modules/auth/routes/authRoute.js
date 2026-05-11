import express from 'express';
import { authMiddleware } from '../../../middleware/authMiddleware.js';
import {forgotPassword, LoginUser, LogOutUser,  resendOtp, resetPassword, verifyOtp, registerUser } from '../controllers/auth/authUserController.js';

const router = express.Router();

router.post('/register' , registerUser);
router.post('/verify-otp' , verifyOtp);
router.post('/resend-otp' , resendOtp);
router.post('/forgot-password' , forgotPassword);
router.post('/reset-password/:token' , resetPassword);
router.post('/login' , LoginUser);
router.post('/logout' ,authMiddleware, LogOutUser);

export default router;