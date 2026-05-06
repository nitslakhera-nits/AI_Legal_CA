import nodemailer from 'nodemailer';
import 'dotenv/config';
import { resetPasswordTemplate } from './templates/resetPasswordTemplate.js';

export const sendOtpEmail = async (email, otp) => {

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });


        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Your OTP for AI Legal CA Registration',
            text: `Your OTP for registration is: ${otp}. It will expire in 10 minutes.`
        }

        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully');


    } catch (error) {
        console.error('Error sending email:', error);
    }



}

// Reset Password Email
export const sendResetPasswordEmail = async (email, resetLink) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: 'Password Reset Request for AI Legal CA',
            html: resetPasswordTemplate(resetLink)
        }

        await transporter.sendMail(mailOptions);
        console.log('✅ Reset password email sent successfully');

    } catch (error) {
        console.error('Error sending reset password email:', error);
    }
};