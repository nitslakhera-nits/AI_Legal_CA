// src/components/auth/LoginForm.jsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useLogin } from '../../hooks/auth/useLogin';

export const LoginForm = ({ onSuccess, onSwitch, setEmailForOtp }) => {

    const login = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const [loginForm, setLoginForm] = useState({ email: '', role: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login(loginForm, onSuccess, toast, setEmailForOtp, () => onSwitch('otp'));
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800">Sign In</h2>

            <input
                type="email" name="email" placeholder="Email"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                value={loginForm.email} onChange={handleChange}
            />

            <div className="relative w-full">
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password" placeholder="Enter Your Password"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm pr-10"
                    value={loginForm.password} onChange={handleChange}
                />
                {showPassword
                    ? <EyeOff onClick={() => setShowPassword(false)} className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
                    : <Eye onClick={() => setShowPassword(true)} className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
                }
            </div>

            <select name="role" value={loginForm.role} onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm">
                <option value="" disabled>Select Profession</option>
                <option value="ca">CA</option>
                <option value="advocate">Advocate</option>
                <option value="hybrid">Hybrid</option>
            </select>

            <button type="submit"
                className="w-full px-3 py-2.5 rounded-lg bg-purple-500 text-white text-sm font-semibold cursor-pointer hover:bg-purple-600 transition">
                Login
            </button>

            <button type="button" onClick={() => onSwitch('forgot')}
                className="text-sm text-purple-500 underline cursor-pointer text-center">
                Forgot Password?
            </button>
        </form>
    );
};