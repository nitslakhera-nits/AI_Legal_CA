import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { useResetPassword } from '../../hooks/useResetPassword';

export const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const resetPassword = useResetPassword();

    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        await resetPassword(token, newPassword, navigate, toast);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white rounded-[14px] max-w-[380px] w-[90%] p-8 flex flex-col gap-4">

                <h2 className="text-xl font-bold text-gray-800">Reset Password</h2>
                <p className="text-sm text-gray-500">Enter your new password below.</p>

                <form onSubmit={submitHandler} className="w-full flex flex-col gap-4">

                    <div className="relative w-full">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm pr-10"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
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
                        Reset Password
                    </button>

                </form>
            </div>
        </div>
    );
};