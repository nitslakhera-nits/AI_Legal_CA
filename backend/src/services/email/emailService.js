import nodemailer from 'nodemailer';
import 'dotenv/config';

export const sendEmail = (email, otp) => {
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

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            }
            else {
                console.log('Email sent:', info.response);
            }
        });

    } catch (error) {
        console.error('Error sending email:', error);
    }



}