<<<<<<< Updated upstream
import { useState } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';
import SuggestedPrompts from './components/SuggestedPrompts';
import Sidebar from './components/Sidebar';
import AudioWave from './components/AudioWave';

function App() {
  const [messages, setMessages] = useState([]);
  const [showPrompts, setShowPrompts] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isResponding, setIsResponding] = useState(false);

  const handleSendMessage = (text) => {
    const newMessage = { type: 'user', text };
    setMessages([...messages, newMessage]);
    setShowPrompts(false);
    setIsResponding(true);

    // If this is the first message in a new chat, create a chat title
    if (!currentChatId) {
      const newChatId = Date.now();
      const newChat = { id: newChatId, title: text.slice(0, 30), messages: [newMessage] };
      setChatHistory(prev => [...prev, newChat]);
      setCurrentChatId(newChatId);
    }

    // Simulate AI response
    setTimeout(() => {
      const botResponse = { type: 'bot', text: 'This is a sample response.' };
      setMessages(prev => [...prev, botResponse]);
      setIsResponding(false);
      
      // Update chat history
      if (currentChatId) {
        setChatHistory(prev => prev.map(chat => 
          chat.id === currentChatId 
            ? { ...chat, messages: [...chat.messages, newMessage, botResponse] }
            : chat
        ));
      }
    }, 3000);
  };

  const handleNewChat = () => {
    const newChatId = Date.now();
    setCurrentChatId(null);
    setMessages([]);
    setShowPrompts(true);
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
    const selectedChat = chatHistory.find(chat => chat.id === chatId);
    setMessages(selectedChat?.messages || []);
    setShowPrompts(false);
  };

  return (
    <div className="flex h-screen bg-white">
      <Sidebar 
        show={showSidebar}
        chatHistory={chatHistory}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
      />
      <div className="flex flex-1 flex-col">
        <ChatHeader 
          onBack={() => window.history.back()} 
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />
        <div className="flex-1 overflow-hidden bg-gray-50">
          {showPrompts && messages.length === 0 ? (
            <SuggestedPrompts onSelectPrompt={handleSendMessage} />
          ) : (
            <ChatMessages messages={messages} />
          )}
          {isResponding && <AudioWave />}
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
=======
import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import LoginPopup from "./components/LoginPopup";
import RegisterPopup from "./components/RegisterPopup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginPopup(false);
  };

  const handleRegister = () => {
    setShowRegisterPopup(false);
    setShowLoginPopup(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<ChatWindow isLoggedIn={isLoggedIn} onLogin={() => setShowLoginPopup(true)} />}
          />
        </Routes>
        {showLoginPopup && (
          <LoginPopup
            onClose={() => setShowLoginPopup(false)}
            onRegister={() => {
              setShowLoginPopup(false);
              setShowRegisterPopup(true);
            }}
            onLogin={handleLogin}
          />
        )}
        {showRegisterPopup && (
          <RegisterPopup
            onClose={() => setShowRegisterPopup(false)}
            onLogin={() => {
              setShowRegisterPopup(false);
              setShowLoginPopup(true);
            }}
          />
        )}
      </div>
    </Router>
>>>>>>> Stashed changes
  );
};

<<<<<<< Updated upstream
export default App;
=======
export default App;

// import ChatWindow from './components/ChatWindow';

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <ChatWindow />
//     </div>
//   );
// }

// export default App;

>>>>>>> Stashed changes
