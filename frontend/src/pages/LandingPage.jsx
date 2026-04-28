import { useState } from 'react';
import { AuthModal } from '../components/auth/AuthModal';
import { FaChartLine } from "react-icons/fa";
import { HiScale } from "react-icons/hi";
import { FaBrain } from "react-icons/fa";

export const LandingPage = () => {
    const [authModalOpen, setAuthModalOpen] = useState(false);



    return (
        <>
            {/* Hero Section */}
            <div className="min-h-[calc(100vh-60px)] bg-[#1e293b] flex items-center justify-center relative overflow-hidden px-5 py-10">
                <div className="absolute w-[500px] h-[500px] bg-ai rounded-full opacity-[0.08] top-[-200px] left-[-200px] blur-[100px]" />
                <div className="absolute w-[500px] h-[500px] bg-action rounded-full opacity-[0.08] bottom-[-200px] right-[-200px] blur-[100px]" />

                <div className="max-w-[700px] text-center relative z-10 flex flex-col gap-6">
                    <div className="inline-block bg-purple-300/10 text-purple-500 px-4 py-2 rounded-full text-xs font-semibold uppercase self-center">
                        ✨ AI-Powered Legal Platform
                    </div>
                    <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
                        Smart Tools for{' '}
                        <span className="text-ai">CA & Advocates</span> in India
                    </h1>
                    <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                        Simplify compliance, automate deadlines, and manage your practice with intelligent AI-powered tools designed for India's legal and tax professionals.
                    </p>
                    <div className="flex gap-3 justify-center flex-wrap">
                        <button

                            className="bg-action text-white border border-purple-500 px-7 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:opacity-90"
                        >
                            Get Started Free
                        </button>
                        <button
                            className="bg-white text-purple-500 border border-gray-500 px-7 py-3 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 hover:opacity-80"
                        >
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-surface py-20 px-5 flex flex-col items-center">
                <h2 className="text-3xl md:text-4xl font-bold text-legal mb-3 text-center">
                    Designed for India's Legal Professionals
                </h2>
                <p className="text-gray-500 text-center mb-10 max-w-[600px]">
                    Comprehensive tools tailored for CAs, Advocates, and Hybrid professionals
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl w-full">
                    {/* Card 1 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-200 rounded-lg mx-auto mb-4 flex justify-center items-center text-purple-500" ><FaChartLine size={25} /></div>
                        <h3 className="text-lg font-bold text-legal mb-3">For CA</h3>
                        <ul className="text-gray-500 text-sm leading-8 list-none p-0 m-0">
                            <li>ITR Filings</li>
                            <li>GST Returns</li>
                            <li>Compliance Deadlines</li>
                        </ul>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center transition-all duration-300">
                        <div className="w-12 h-12 bg-purple-200 rounded-lg mx-auto mb-4 flex justify-center items-center text-purple-500" ><HiScale size={25} /></div>
                        <h3 className="text-lg font-bold text-legal mb-3">For Advocates</h3>
                        <ul className="text-gray-500 text-sm leading-8 list-none p-0 m-0">
                            <li>Case Management</li>
                            <li>Hearing Tracking</li>
                            <li>Client Portfolio</li>
                        </ul>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center transition-all duration-300">
                        <div className="w-12 h-12 bg-blue-200 rounded-lg mx-auto mb-4 flex justify-center items-center text-purple-500" ><FaBrain size={22} /></div>
                        <h3 className="text-lg font-bold text-legal mb-3">AI Powered</h3>
                        <ul className="text-gray-500 text-sm leading-8 list-none p-0 m-0">
                            <li>Smart Reminders</li>
                            <li>Document Analysis</li>
                            <li>Legal Research</li>
                        </ul>
                    </div>
                </div>
            </div>

            <AuthModal
                isOpen={authModalOpen}
                onClose={() => setAuthModalOpen(false)}

            />
        </>
    );
};