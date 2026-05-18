// src/components/auth/ForgotPasswordForm.jsx
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForgotPassword } from '../../hooks/auth/useForgotPassword';

export const ForgotPasswordForm = ({ onSwitch }) => {

    const forgotPassword = useForgotPassword();
    const [forgotEmail, setForgotEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await forgotPassword(forgotEmail, toast);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <h2 className="text-xl font-bold text-gray-800">Forgot Password</h2>
                <p className="text-sm text-gray-500">
                    Enter your registered email, we'll send you a reset link.
                </p>

                <input type="email" placeholder="Enter your email"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                    value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />

                <button type="submit"
                    className="w-full px-3 py-2.5 rounded-lg bg-purple-500 text-white text-sm font-semibold cursor-pointer hover:bg-purple-600 transition">
                    Send Reset Link
                </button>
            </form>

            <button type="button" onClick={() => onSwitch('login')}
                className="text-sm text-purple-500 underline cursor-pointer text-center">
                Back to Login
            </button>
        </>
    );
};