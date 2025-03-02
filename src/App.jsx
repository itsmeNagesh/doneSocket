import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import LoginPopup from "./components/LoginPopup";
import RegisterPopup from "./components/RegisterPopup";
import Cookies from 'universal-cookie';
import axios from "axios";
function App() {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);
  const [csrfToken, setCsrfToken] = useState('');
  
  const fetchCsrfToken = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      await axios.get(`${apiUrl}/tp/csrf/`, {
        withCredentials: true,
      });
      const token = cookies.get('csrftoken');
      setCsrfToken(token);
    } catch (err) {
      console.error('Failed to fetch CSRF token:', err);
    }
  };

  useEffect(() => {
    fetchCsrfToken();
    if (csrfToken) {
      setIsLoggedIn(true); 
    }
  }, [csrfToken]);


  const handleLogin = () => {
    setShowLoginPopup(false);
  };


  const handleLogout = () => {
    console.log("Logging out...");
    setIsLoggedIn(false);
    Cookies.remove("sessionid"); 
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
                csrfToken={csrfToken}
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
            csrfToken={csrfToken}
            fetchCsrfToken={fetchCsrfToken}
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
