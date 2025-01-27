import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import LoginPopup from "./components/LoginPopup";
import RegisterPopup from "./components/RegisterPopup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  // When the user successfully logs in:
  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginPopup(false);
  };

  // When the user has registered, we show the Login popup:
  const handleRegister = () => {
    setShowRegisterPopup(false);
    setShowLoginPopup(true);
  };
const onLoginSuccess=()=>{

}
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* The ChatWindow is displayed at the root path. */}
        <Routes>
          <Route
            path="/"
            element={
              <ChatWindow
                isLoggedIn={isLoggedIn}
                onLogin={() => setShowLoginPopup(true)}
              />
            }
          />
        </Routes>

        {/* Show the LoginPopup if `showLoginPopup` is true. */}
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

        {/* Show the RegisterPopup if `showRegisterPopup` is true. */}
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
