import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Mic } from "lucide-react";

const Chat = ({ spokenText, aiResponse }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: inputText }]);
    setInputText('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'AI response would come from backend here...' }]);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col h-screen bg-[#D9D9D9]"
    >
      <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 flex flex-col h-full">
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {spokenText && (
              <div className="flex justify-end space-x-2">
                <div className="max-w-[75%]">
                  <p className="font-medium text-xl mb-2">You:</p>
                  <p className="text-lg bg-white p-3 rounded-lg text-gray-700">
                    {spokenText}
                  </p>
                </div>
              </div>
            )}
            {aiResponse && (
              <div className="flex items-start space-x-2">
                <div className="max-w-[75%]">
                  <p className="font-medium text-xl mb-2">AI ASSISTANT:</p>
                  <p className="text-lg bg-white p-3 rounded-lg text-gray-700">
                    {aiResponse}
                  </p>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div key={`state-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'items-start'} space-x-2`}>
                <div className="max-w-[75%]">
                  <p className="font-medium text-xl mb-2">{message.role === 'user' ? 'You:' : 'AI ASSISTANT:'}</p>
                  <p className="text-lg bg-white p-3 rounded-lg text-gray-700">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 mb-8 bg-[#D9D9D9] border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg border bg-[#4B4F5B] border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setIsRecording(!isRecording)}
              className={`p-2 rounded-full ${isRecording ? 'bg-red-500' : 'bg-[#4B4F5B]'} hover:bg-opacity-80 transition-colors`}
            >
              <Mic className={`w-6 h-6 ${isRecording ? 'text-white' : 'text-white'}`} />
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;