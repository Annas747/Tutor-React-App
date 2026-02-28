import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Users, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';

export default function Community() {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);

    // Poll for messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('/api/messages');
                if (response.ok) {
                    const data = await response.json();
                    setMessages(prev => {
                        // Only update if length changed to avoid jitter, simple check
                        if (data.length !== prev.length) return data;
                        return prev;
                    });
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Poll every 3s
        return () => clearInterval(interval);
    }, []);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setSending(true);
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sender_id: user.id,
                    content: newMessage
                })
            });

            if (response.ok) {
                const savedMessage = await response.json();
                setMessages(prev => [...prev, savedMessage]);
                setNewMessage('');
            }
        } catch (error) {
            console.error("Error sending message:", error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="flex h-[calc(100vh-8rem)] gap-6 animate-in fade-in duration-500">
            {/* Main Chat Area */}
            <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                    <h2 className="font-bold text-slate-800 flex items-center gap-2">
                        <MessageSquare className="text-primary-600" size={20} />
                        Student Community
                    </h2>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Live
                    </span>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/30">
                    {isLoading ? (
                        <div className="flex justify-center py-10 text-slate-400">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            <p>No messages yet. Be the first to say hi! 👋</p>
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isMe = msg.sender_id === user.id;
                            return (
                                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                                        <div className="flex items-center gap-2 mb-1 px-1">
                                            <span className="text-xs font-bold text-slate-600">{msg.name}</span>
                                            {msg.role === 'instructor' && (
                                                <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded uppercase tracking-wide font-bold">INS</span>
                                            )}
                                            <span className="text-[10px] text-slate-400">
                                                {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <div className={`px-4 py-2.5 rounded-2xl shadow-sm text-sm ${isMe
                                            ? 'bg-primary-600 text-white rounded-br-none'
                                            : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                                            }`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex gap-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message to the community..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500 transition-all"
                    />
                    <Button type="submit" disabled={sending || !newMessage.trim()}>
                        <Send size={18} />
                    </Button>
                </form>
            </div>

            {/* Sidebar - Active Users (Static for now) */}
            <div className="w-72 bg-white rounded-2xl border border-slate-100 shadow-sm hidden lg:flex flex-col overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Users className="text-violet-500" size={20} />
                        Online Members
                    </h3>
                </div>
                <div className="p-4 space-y-4 overflow-y-auto">
                    {/* Hardcoded active users for demo */}
                    {[
                        { name: user.name, role: user.role, status: 'online' }, // Current User
                        { name: 'Instructor Alice', role: 'instructor', status: 'online' },
                        { name: 'Sarah Miller', role: 'student', status: 'away' },
                        { name: 'Mike Ross', role: 'student', status: 'online' },
                        { name: 'Jessica Pearson', role: 'instructor', status: 'offline' },
                    ].map((member, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold border border-slate-200">
                                    {member.name.charAt(0)}
                                </div>
                                <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${member.status === 'online' ? 'bg-green-500' :
                                    member.status === 'away' ? 'bg-amber-500' : 'bg-slate-300'
                                    }`}></span>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-700">{member.name}</p>
                                <p className="text-xs text-slate-500 capitalize">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
