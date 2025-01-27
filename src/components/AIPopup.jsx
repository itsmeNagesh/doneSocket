import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaMicrophone, FaStop } from "react-icons/fa";
import ChatWindow from "./Chat"; // Import the new component

const AIPopup = ({ onToggleRecording, isRecording }) => {
  const [showGeneratingResponse, setShowGeneratingResponse] = useState(false);
  const [spokenText, setSpokenText] = useState("LISTENING");
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const handleCheckClick = () => {
    setShowGeneratingResponse(true);
  };

  const handleRecordingToggle = () => {
    onToggleRecording();
    if (!isRecording) {
      setSpokenText("This is the text being spoken...");
    } else {
      setSpokenText("LISTENING");
    }
  };

  useEffect(() => {
    if (showGeneratingResponse) {
      setTimeout(() => {
        setAiResponse("This is the AI's answer to your question.");
        setShowChatWindow(true);
      }, 3000);
    }
  }, [showGeneratingResponse]);

  if (showChatWindow) {
    return <ChatWindow spokenText={spokenText} aiResponse={aiResponse} />;
  }

  return (
    <main className="justify-center h-full relative">
      {showGeneratingResponse ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="h-full flex flex-col items-center justify-center"
        >
          {/* New UI for generating response */}
          <div className="mt-20 flex justify-center items-center">
            <div className="w-8 h-8 bg-red-500 rounded-full animate-bounce mr-2"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full animate-bounce mr-2"></div>
            <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce mr-2"></div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full animate-bounce mr-2"></div>
            <div className="w-8 h-8 bg-orange-500 rounded-full animate-bounce"></div>
          </div>
          <div className="text-2xl mt-10 font-medium text-[#6E1EA3] mb-6">
            Generating Response...
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="inset-0 h-full z-50 flex flex-col items-center justify-center"
        >
          {/* Display listening text or spoken text */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-medium text-black self-start pl-10 ml-10"
          >
            {spokenText}
          </motion.div>

          {/* Wave Animation */}
          <div className="rounded-lg p-8 mb-8 w-full overflow-x-hidden">
            <div className="flex justify-center items-end h-32 space-x-2 overflow-hidden">
              {[...Array(30)].map((_, i) => {
                const hue = (i / 30) * 270;
                const color = `hsl(${hue}, 60%, 50%)`;
                return (
                  <motion.div
                    key={i}
                    className="w-1 lg:w-3 rounded-full"
                    style={{ backgroundColor: color }}
                    animate={{ height: ["20px", "60px", "20px"] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  />
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRecordingToggle}
              className={`p-4 rounded-full transition-colors ${
                isRecording
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {isRecording ? (
                <FaStop className="text-2xl" />
              ) : (
                <FaMicrophone className="text-2xl" />
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCheckClick}
              className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
            >
              <FaCheck className="text-2xl" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </main>
  );
};

export default AIPopup;
