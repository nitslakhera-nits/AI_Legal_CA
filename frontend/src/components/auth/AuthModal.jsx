// src/components/auth/AuthModal.jsx
import { useState, useEffect } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { OtpForm } from './OtpForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const AuthModal = ({ isOpen, onClose, view }) => {

    const [currentView, setCurrentView] = useState(view || 'login');
    const [emailForOtp, setEmailForOtp] = useState('');

    // view prop change hone pe sync karo
    useEffect(() => {
        if (view) setCurrentView(view);
    }, [view]);

    const handleClose = () => {
        setCurrentView(view || 'login');
        setEmailForOtp('');
        onClose();
    };

    if (!isOpen) return null;

    // Switch + Sign up / Sign in footer text
    const switchText = {
        login: { msg: "Don't have an account?", label: 'Sign Up', to: 'register' },
        register: { msg: 'Already have an account?', label: 'Sign In', to: 'login' },
    };

    return (
        <div
            className="fixed inset-0 bg-white/15 flex items-center justify-center z-[2000]"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-[14px] max-w-[380px] w-[90%] p-8 relative flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* CLOSE BUTTON */}
                <button onClick={handleClose}
                    className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-500">
                    ✕
                </button>

                {/* FORM RENDERING */}
                {currentView === 'login' && (
                    <LoginForm
                        onSuccess={handleClose}
                        onSwitch={setCurrentView}
                        setEmailForOtp={setEmailForOtp}
                    />
                )}
                {currentView === 'register' && (
                    <RegisterForm
                        onSwitch={setCurrentView}
                        setEmailForOtp={setEmailForOtp}
                    />
                )}
                {currentView === 'otp' && (
                    <OtpForm
                        emailForOtp={emailForOtp}
                        onSwitch={setCurrentView}
                    />
                )}
                {currentView === 'forgot' && (
                    <ForgotPasswordForm onSwitch={setCurrentView} />
                )}

                {/* SWITCH FOOTER */}
                {switchText[currentView] && (
                    <div className="text-sm text-gray-500 text-center">
                        {switchText[currentView].msg}{' '}
                        <button type="button"
                            onClick={() => setCurrentView(switchText[currentView].to)}
                            className="text-purple-500 font-semibold underline cursor-pointer">
                            {switchText[currentView].label}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};