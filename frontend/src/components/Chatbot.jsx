import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Hi! I am the PriorityOne AI Assistant. How can I help you analyze data today?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-chatbot', handleOpen);
    return () => window.removeEventListener('open-chatbot', handleOpen);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Error connecting to AI server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#1f108e] to-[#3730a3] rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#eaedff] flex flex-col overflow-hidden z-50">
          <div className="bg-[#1f108e] p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <h3 className="font-bold">AI Copilot</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors"><X className="w-5 h-5" /></button>
          </div>
          
          <div className="flex-1 p-4 h-96 overflow-y-auto bg-[#faf8ff] space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  msg.role === 'user' ? 'bg-[#1f108e] text-white rounded-br-none' : 'bg-white border border-[#eaedff] text-[#131b2e] rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-[#eaedff] rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <Loader2 className="w-4 h-4 text-[#1f108e] animate-spin" />
                </div>
              </div>
            )}
          </div>
          
          <div className="p-3 bg-white border-t border-[#eaedff]">
            <form onSubmit={sendMessage} className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI anything..." 
                className="flex-1 bg-[#f2f3ff] rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1f108e]"
              />
              <button type="submit" disabled={loading} className="bg-[#1f108e] text-white p-2 rounded-xl hover:bg-[#3730a3] transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
