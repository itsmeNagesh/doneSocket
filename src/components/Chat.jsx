import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Mic, Send, Square, Volume2 } from "lucide-react";

const Chat = ({ spokenText, aiResponse }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recordedText, setRecordedText] = useState('');

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, Your browser does not support text to speech');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const textToSend = inputText || recordedText;
    if (!textToSend.trim()) return;

    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
    setInputText('');
    setRecordedText('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'AI response would come from backend here...' 
      }]);
    }, 1000);
  };

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      setRecordedText("This is the text being spoken...");
    } else {
      setRecordedText("");
    }
  };

  const MessageAvatar = ({ role }) => (
    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
      role === 'user' ? 'bg-blue-500' : 'bg-none'
    }`}>
      <img
        src={role === 'user' ? "/api/placeholder/40/40" : "./icon-park_robot.png"}
        alt={role === 'user' ? "User avatar" : "AI avatar"}
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  );

  const MessageWithControls = ({ content, role }) => (
    <div className="flex items-start gap-2">
      <p className="text-lg bg-white p-3 rounded-lg text-gray-700">
        {content}
      </p>
      {role === 'assistant' && (
        <motion.button
          onClick={() => textToSpeech(content)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 mt-2.5 flex items-center justify-center rounded-full hover:bg-gray-300 transition-colors"
        >
          <Volume2 className="w-4 h-4 text-bold text-gray-600" />
        </motion.button>
      )}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex flex-col h-fit bg-[#D9D9D9]"
    >
      <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 flex flex-col h-screen">
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {spokenText && (
              <div className="flex justify-end mt-5 space-x-3">
                <div className="flex-1 flex justify-end">
                  <div className="max-w-[75%]">
                    <div className="flex justify-end">
                      <p className="font-medium text-xl mb-2">You:</p>
                    </div>
                    <MessageWithControls content={spokenText} role="user" />
                  </div>
                </div>
                <MessageAvatar role="user" />
              </div>
            )}
            {aiResponse && (
              <div className="flex space-x-3">
                <MessageAvatar role="assistant" />
                <div className="flex-1">
                  <div className="max-w-[75%]">
                    <p className="font-medium text-xl mb-2">AI ASSISTANT:</p>
                    <MessageWithControls content={aiResponse} role="assistant" />
                  </div>
                </div>
              </div>
            )}
            {messages.map((message, index) => (
              <div 
                key={`message-${index}`} 
                className={`flex space-x-3 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                {message.role !== 'user' && <MessageAvatar role="assistant" />}
                <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                  <div className="max-w-[75%]">
                    <div className={`flex ${message.role === 'user' ? 'justify-end' : ''}`}>
                      <p className="font-medium text-xl mb-2">
                        {message.role === 'user' ? 'You:' : 'AI ASSISTANT:'}
                      </p>
                    </div>
                    <MessageWithControls content={message.content} role={message.role} />
                  </div>
                </div>
                {message.role === 'user' && <MessageAvatar role="user" />}
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 mb-20 bg-[#D9D9D9] border-t border-gray-200">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              value={inputText || recordedText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 rounded-lg border bg-[#4B4F5B] border-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              type="button"
              onClick={handleRecordingToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full ${
                isRecording ? 'bg-red-500' : 'bg-[#4B4F5B]'
              } hover:bg-opacity-80 transition-colors`}
            >
              {isRecording ? (
                <Square className="w-6 h-6 text-white" />
              ) : (
                <Mic className="w-6 h-6 text-white" />
              )}
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Chat;