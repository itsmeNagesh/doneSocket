import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import ChatWindow from "./components/ChatWindow";
import LoginPopup from "./components/LoginPopup";
import RegisterPopup from "./components/RegisterPopup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  
  useEffect(() => {
    const sessionId = Cookies.get("sessionId"); 
    if (sessionId) {
      setIsLoggedIn(true); 
    }
  }, []);


  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginPopup(false);
  };


  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
    Cookies.remove("sessionId"); 
    window.location.href = "https://apexiq.ai";
  };


  const handleRegister = () => {
    setShowRegisterPopup(false);
    setShowLoginPopup(true);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route
            path="/"
            element={
              <ChatWindow
                isLoggedIn={isLoggedIn}
                onLogin={() => setShowLoginPopup(true)}
                onLogout={handleLogout} // Add logout functionality
              />
            }
          />
        </Routes>

        {/* Show LoginPopup if showLoginPopup is true */}
        {showLoginPopup && (
          <LoginPopup
            onClose={() => setShowLoginPopup(false)}
            onRegister={() => {
              setShowLoginPopup(false);
              setShowRegisterPopup(true);
            }}
            onLoginSuccess={handleLogin}
          />
        )}

        {/* Show RegisterPopup if showRegisterPopup is true */}
        {showRegisterPopup && (
          <RegisterPopup
            onClose={() => setShowRegisterPopup(false)}
            onLogin={handleRegister}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
