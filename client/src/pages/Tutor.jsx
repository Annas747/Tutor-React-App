import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import clsx from 'clsx';

export default function Tutor() {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'ai', content: 'Hello! I am your AI Tutor. How can I help you with your studies today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), sender: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input })
            });

            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            const aiMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                content: data.content
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);

        } catch (error) {
            console.error('Error sending message:', error);
            // Fallback
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'ai',
                content: "I'm having trouble connecting to the server. Please try again later."
            }]);
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-white border-b border-slate-100 p-4 flex items-center gap-3">
                <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h2 className="font-semibold text-slate-800">AI Personal Tutor</h2>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-slate-500 font-medium">Online & Ready</span>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-50/50">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={clsx(
                            "flex gap-4 max-w-3xl",
                            msg.sender === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}
                    >
                        <div className={clsx(
                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                            msg.sender === 'ai'
                                ? "bg-white border-primary-100 text-primary-600 shadow-sm"
                                : "bg-primary-600 border-transparent text-white"
                        )}>
                            {msg.sender === 'ai' ? <Bot size={18} /> : <User size={18} />}
                        </div>

                        <div className={clsx(
                            "p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
                            msg.sender === 'ai'
                                ? "bg-white border border-slate-100 text-slate-700 rounded-tl-none"
                                : "bg-primary-600 text-white rounded-tr-none"
                        )}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex gap-4 max-w-3xl">
                        <div className="w-8 h-8 rounded-full bg-white border border-primary-100 text-primary-600 flex items-center justify-center shadow-sm">
                            <Bot size={18} />
                        </div>
                        <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2 text-slate-400">
                            <Loader2 size={16} className="animate-spin" />
                            <span className="text-xs">Thinking...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-slate-100">
                <form onSubmit={handleSend} className="flex gap-2 relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask a question about your course..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all placeholder:text-slate-400"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isLoading}
                        className="absolute right-2 top-1.5 p-1.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={18} />
                    </button>
                </form>
                <div className="text-center mt-2">
                    <p className="text-xs text-slate-400">AI can make mistakes. Consider checking important information.</p>
                </div>
            </div>
        </div>
    );
}
