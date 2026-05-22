import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Send, Paperclip, Camera } from "lucide-react";

const AIChatbotPage = () => {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            text: "Hello! I'm LegalMind AI Assistant. How can I help you today?",
        },
    ]);

    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    // File & Camera refs
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // Auto Scroll Bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, isLoading]);

    // File Select
    const handleFileSelect = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        toast.success(`Selected file: ${file.name}`);

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: `📎 File Selected: ${file.name}`,
            },
        ]);
    };

    // Camera Capture
    const handleCameraCapture = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        toast.success("Photo captured successfully");

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: `📸 Photo Uploaded: ${file.name}`,
            },
        ]);
    };

    // Send Message
    const handleSend = async () => {
        const prompt = inputValue.trim();

        if (!prompt) {
            toast.error("Please enter a message");
            return;
        }

        // User Message
        const userMessage = {
            role: "user",
            text: prompt,
        };

        setMessages((prev) => [...prev, userMessage]);

        setInputValue("");
        setIsLoading(true);

        // Fake AI Response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: `This is a response to "${prompt}"`,
                },
            ]);

            setIsLoading(false);
        }, 700);
    };

    // Enter Key Send
    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="h-screen bg-white flex flex-col">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white px-6 py-4">
                <h1 className="text-2xl font-bold text-gray-900">
                    AI Assistant
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Ask anything about GST, ITR, documents, legal workflow, etc.
                </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6 pb-40 md:px-8">
                <div className="mx-auto max-w-4xl space-y-5">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.role === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                        >
                            <div
                                className={`max-w-[85%] rounded-3xl px-5 py-3 text-sm leading-relaxed shadow-sm md:max-w-2xl ${message.role === "user"
                                        ? "rounded-br-md bg-purple-600 text-white"
                                        : "rounded-bl-md bg-gray-100 text-gray-900"
                                    }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}

                    {/* Loading */}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="rounded-3xl rounded-bl-md bg-gray-100 px-5 py-4 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                                    <div className="delay-100 h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                                    <div className="delay-200 h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Bottom Input */}
            <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white px-4 py-4 md:left-[260px]">
                <div className="mx-auto flex max-w-4xl items-end gap-3">

                    {/* Input Box */}
                    <div className="flex flex-1  items-center  gap-2 rounded-3xl border border-gray-300 bg-white px-3 py-2 shadow-sm transition focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">

                        {/* File Upload */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="mb-1 shrink-0 text-gray-400 transition hover:text-purple-600"
                        >
                            <Paperclip size={20} />
                        </button>

                        {/* Camera Upload */}
                        <button
                            type="button"
                            onClick={() => cameraInputRef.current.click()}
                            className="mb-1 shrink-0 text-gray-400 transition hover:text-purple-600"
                        >
                            <Camera size={20} />
                        </button>

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileSelect}
                        />

                        {/* Hidden Camera Input */}
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            ref={cameraInputRef}
                            className="hidden"
                            onChange={handleCameraCapture}
                        />

                        {/* Textarea */}
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask LegalMind AI anything..."
                            rows={1}
                            className="w-full flex-1 resize-none bg-transparent px-2 py-1 text-sm text-gray-900 outline-none min-h-[44px] max-h-32 overflow-y-auto"
                        />

                        {/* Send Button */}
                        <button
                            type="button"
                            onClick={handleSend}
                            disabled={isLoading}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-purple-600 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIChatbotPage;