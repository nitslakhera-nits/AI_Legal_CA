// src/components/auth/RegisterForm.jsx
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRegister } from '../../hooks/useRegister';

export const RegisterForm = ({ onSwitch, setEmailForOtp }) => {

    const register = useRegister();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', role: '', password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // register hook ke andar setEmailForOtp set hoga, phir otp view pe jaayega
        register(formData, setEmailForOtp, () => onSwitch('otp'), toast);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800">Create Account</h2>

            <div className="flex justify-center items-center gap-4">
                <input type="text" name="firstName" placeholder="First Name"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                    value={formData.firstName} onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                    value={formData.lastName} onChange={handleChange} />
            </div>

            <input type="email" name="email" placeholder="Email"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm"
                value={formData.email} onChange={handleChange} />

            <select name="role" value={formData.role} onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm">
                <option value="" disabled>Select Profession</option>
                <option value="ca">CA</option>
                <option value="advocate">Advocate</option>
                <option value="hybrid">Hybrid</option>
            </select>

            <div className="relative w-full">
                <input type={showPassword ? 'text' : 'password'}
                    name="password" placeholder="Create Your Password"
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm pr-10"
                    value={formData.password} onChange={handleChange} />
                {showPassword
                    ? <EyeOff onClick={() => setShowPassword(false)} className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
                    : <Eye onClick={() => setShowPassword(true)} className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
                }
            </div>

            <button type="submit"
                className="w-full px-3 py-2.5 rounded-lg bg-purple-500 text-white text-sm font-semibold cursor-pointer hover:bg-purple-600 transition">
                Create Account
            </button>
        </form>
    );
};