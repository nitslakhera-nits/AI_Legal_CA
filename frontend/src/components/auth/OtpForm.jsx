// src/components/auth/OtpForm.jsx
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useVerifyOtp } from '../../hooks/auth/useVerifyOtp';
import { useResendOtp } from '../../hooks/auth/useResendOtp';

export const OtpForm = ({ emailForOtp, onSwitch }) => {

    const verifyOtp = useVerifyOtp();
    const resendOtp = useResendOtp();

    const [otp, setOtp] = useState('');
    const [resendTimer, setResendTimer] = useState(0);
    const [canResend, setCanResend] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyOtp({ email: emailForOtp, otp }, () => onSwitch('login'), toast);
    };

    const handleResend = async (e) => {
        e.preventDefault();
        setCanResend(false);
        setResendTimer(30);
        await resendOtp(emailForOtp, toast);
    };

    useEffect(() => {
        if (resendTimer <= 0) { setCanResend(true); return; }
        const interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [resendTimer]);

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800">Verify OTP</h2>
            <p className="text-sm text-gray-500">OTP sent to {emailForOtp}</p>

            <input type="text" placeholder="Enter OTP"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                value={otp} onChange={(e) => setOtp(e.target.value)} />

            <button type="submit"
                className="w-full px-3 py-2.5 rounded-lg bg-purple-500 text-white text-sm font-semibold cursor-pointer hover:bg-purple-600 transition">
                Verify OTP
            </button>

            <button type="button" onClick={handleResend} disabled={!canResend}
                className={`w-full px-3 py-2.5 rounded-lg text-sm font-semibold transition
                    ${canResend
                        ? 'border border-purple-500 text-purple-500 cursor-pointer hover:bg-purple-50'
                        : 'border border-gray-200 text-gray-400 cursor-not-allowed'}`}>
                {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
            </button>
        </form>
    );
};