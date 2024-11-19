// import { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
// } from "react-router-dom";
// import ChatWindow from "./components/ChatWindow";
// import LoginPopup from "./components/LoginPopup";
// import RegisterPopup from "./components/RegisterPopup";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [showRegisterPopup, setShowRegisterPopup] = useState(false);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//     setShowLoginPopup(false);
//   };

//   const handleRegister = () => {
//     setShowRegisterPopup(false);
//     setShowLoginPopup(true);
//   };

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route
//             path="/"
//             element={<ChatWindow isLoggedIn={isLoggedIn} onLogin={() => setShowLoginPopup(true)} />}
//           />
//         </Routes>
//         {showLoginPopup && (
//           <LoginPopup
//             onClose={() => setShowLoginPopup(false)}
//             onRegister={() => {
//               setShowLoginPopup(false);
//               setShowRegisterPopup(true);
//             }}
//             onLogin={handleLogin}
//           />
//         )}
//         {showRegisterPopup && (
//           <RegisterPopup
//             onClose={() => setShowRegisterPopup(false)}
//             onLogin={() => {
//               setShowRegisterPopup(false);
//               setShowLoginPopup(true);
//             }}
//           />
//         )}
//       </div>
//     </Router>
//   );
// };

// export default App;

import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ChatWindow isLoggedIn={true} onLogin={()=>{
        console.log('Login');
      }} />
    </div>
  );
}

export default App;

