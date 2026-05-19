import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Send } from "lucide-react";

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

  // Auto Scroll Bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

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

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">
          AI Assistant
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Ask anything about GST, ITR, documents, legal workflow, etc.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 pb-36">
        <div className="max-w-4xl mx-auto space-y-5">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] md:max-w-2xl px-5 py-3 rounded-3xl text-sm leading-relaxed ${
                  message.role === "user"
                    ? "bg-purple-600 text-white rounded-br-md"
                    : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-5 py-4 rounded-3xl rounded-bl-md">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input */}
      <div className="fixed bottom-0 left-0 md:left-[260px] right-0 bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message LegalMind AI..."
            rows={1}
            className="flex-1 resize-none rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
          />

          <button
            type="button"
            onClick={handleSend}
            disabled={isLoading}
            className="h-12 w-12 flex items-center justify-center rounded-2xl bg-purple-600 text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;