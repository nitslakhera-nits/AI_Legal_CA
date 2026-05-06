import { useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../../api/endpoints.js';
import { useLogin } from '../../hooks/useLogin.js';
import { useRegister } from '../../hooks/useRegister.js';
import { useVerifyOtp } from '../../hooks/useverifyotp.js';

export const AuthModal = ({ isOpen, onClose, view }) => {
    const [currentView, setCurrentView] = useState(view);
    const [showPassword, setShowPassword] = useState(false);
    const register = useRegister();
    const verifyOtp = useVerifyOtp();
    const login = useLogin();

    //--------- Register Form----------------
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        register(formData , setEmailForOtp, setCurrentView , toast);

    }

    const resetRegisterForm = () => {
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            role: "",
            password: "",
        });
    };

    //-------------------------------------

    //----------OTP Form----------------
    const [otp, setOtp] = useState("");
    const [emailForOtp, setEmailForOtp] = useState("");

    const submitOtpHandler = async (e) => {
        e.preventDefault();
        console.log({ emailForOtp, otp });
        verifyOtp({ email: emailForOtp, otp }, setCurrentView, toast);
    }

    const resetOtpForm = () => {
        setOtp("");
    };


    //----------------------------------

    // --------------Login Form----------------
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: "",
        role: "",
        password: "",
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const submitLoginHandler = async (e) => {
        e.preventDefault();
        login(loginForm, onClose, toast);
    }

    const resetLoginForm = () => {
        setLoginForm({
            email: "",
            role: "",
            password: "",
        });
    };
    // ---------------------------------------






    useEffect(() => {
        if (view) {
            setCurrentView(view);
        }

    }, [view]);

    useEffect(() => {
        if (currentView === 'register') resetRegisterForm();
        if (currentView === 'otp') resetOtpForm();
        if (currentView === 'login') resetLoginForm();
    }, [currentView]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-white/15 flex items-center justify-center z-[2000]"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[14px] max-w-[380px] w-[90%] p-8 relative flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-2xl cursor-pointer text-gray-500"
                >
                    ✕
                </button>

                {/* ================= OTP VIEW ================= */}
                {currentView === 'otp' ? (
                    <form onSubmit={submitOtpHandler} className="w-full flex flex-col gap-4">

                        <h2 className="text-xl font-bold text-gray-800">Verify OTP</h2>

                        <p className="text-sm text-gray-500">
                            OTP sent to {emailForOtp}
                        </p>

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="w-full px-3 py-2.5 rounded-lg bg-purple-500 text-white text-sm font-semibold cursor-pointer hover:bg-purple-600 transition"
                        >
                            Verify OTP
                        </button>
                    </form>


                ) : currentView === 'login' ? (

                    /* ================= LOGIN ================= */
                    <form onSubmit={submitLoginHandler} className="w-full flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-gray-800">Sign In</h2>

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                            name="email"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                        />

                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create Your Password"
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm pr-10"
                                value={loginForm.password}
                                onChange={handleLoginChange}
                            />

                            {showPassword ? (
                                <EyeOff
                                    onClick={() => setShowPassword(false)}
                                    className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                            ) : (
                                <Eye
                                    onClick={() => setShowPassword(true)}
                                    className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                            )}
                        </div>

                        <select
                            name='role'
                            value={loginForm.role}
                            onChange={handleLoginChange}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                        >
                            <option value="" disabled>Select Profession</option>
                            <option value='ca'>CA</option>
                            <option value='advocate'>Advocate</option>
                            <option value='hybrid'>Hybrid</option>
                        </select>

                        <button
                            type="submit"
                            className="w-full px-3 py-2.5 rounded-lg bg-purple-500 text-white text-sm font-semibold cursor-pointer hover:bg-purple-600 transition"
                        >
                            Login
                        </button>
                    </form>

                ) : (

                    /* ================= REGISTER ================= */
                    <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">
                        <h2 className="text-xl font-bold text-gray-800">Create Account</h2>

                        <div className='flex justify-center items-center gap-4'>
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                                name='firstName'
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                                name='lastName'
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <select
                            name='role'
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                        >
                            <option value="" disabled>Select Profession</option>
                            <option value='ca'>CA</option>
                            <option value='advocate'>Advocate</option>
                            <option value='hybrid'>Hybrid</option>
                        </select>

                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Create Your Password"
                                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm pr-10"
                                value={formData.password}
                                onChange={handleChange}
                            />

                            {showPassword ? (
                                <EyeOff
                                    onClick={() => setShowPassword(false)}
                                    className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                            ) : (
                                <Eye
                                    onClick={() => setShowPassword(true)}
                                    className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                />
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full px-3 py-2.5 rounded-lg bg-purple-500 text-white text-sm font-semibold cursor-pointer hover:bg-purple-600 transition"
                        >
                            Create Account
                        </button>
                    </form>
                )}

                {/* SWITCH */}
                <div className="text-sm text-gray-500 text-center">
                    {currentView === 'login' ? (
                        <>
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setCurrentView('register')}
                                className="text-purple-500 font-semibold underline cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : currentView === 'register' ? (
                        <>
                            Already have an account?{' '}
                            <button
                                type="button"
                                onClick={() => setCurrentView('login')}
                                className="text-purple-500 font-semibold underline cursor-pointer"
                            >
                                Sign In
                            </button>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};