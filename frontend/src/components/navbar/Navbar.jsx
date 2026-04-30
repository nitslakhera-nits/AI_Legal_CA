import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthModal } from '../auth/AuthModal';

export const Navbar = ({ user }) => {
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authView, setAuthView] = useState('login');

    return (
        <>
            <nav className="sticky top-0 bg-legal h-[60px] flex items-center z-1000 shadow-md bg-[#1e293b]">
                <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center w-full">
                    <div
                        className="flex items-center gap-3 cursor-pointer transition-opacity duration-300 "
                        onClick={() => navigate('/')}
                    >
                        <div className="w-10 h-10 bg-purple-500  rounded-lg flex items-center justify-center text-white font-bold text-base">
                            LC
                        </div>
                        <span className="text-white text-lg font-semibold">
                            Legal<span className="text-purple-500"> AI</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            onClick={() => {
                                setAuthView('login');
                                setAuthModalOpen(true)
                            }}
                            className="bg-purple-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-white hover:text-purple-500 cursor-pointer"
                        >
                            Login
                        </button>
                        {/* <button
                            onClick={() => {
                                setAuthView('register');
                                setAuthModalOpen(true)
                            }}
                            className="bg-white text-purple-500  px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-purple-500 hover:text-white cursor-pointer"
                        >
                            Register
                        </button> */}

                    </div>
                </div>
            </nav>
            <AuthModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                view={authView}
            />
        </>
    );
};
