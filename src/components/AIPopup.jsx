
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaMicrophone, FaStop } from "react-icons/fa";
import Chat from "./Chat"; // Import the Chat component
import { DataContext } from "../context/DataContext";

const AIPopup = ({ onToggleRecording,  }) => {
  const [showGeneratingResponse, setShowGeneratingResponse] = useState(false);
  const [spokenText, setSpokenText] = useState("LISTENING");
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [socket, setSocket] = useState(null);
  const [isVoiceResponse, setIsVoiceResponse] = useState(false); 

  const {isRecording, collection_name, transcript, inputText, setInputText, messages,currentMessage, setCurrentMessage, setMessages } = useContext(DataContext);

  const handleCheckClick = () => {
    onToggleRecording();
    setShowGeneratingResponse(true);
  };

  const handleRecordingToggle = () => {
    onToggleRecording();
    if (!isRecording) {
      setSpokenText("Recording...");
    } else {
      setSpokenText("LISTENING");
    }
  };

  useEffect(() => {
    if (showGeneratingResponse && transcript) {
      sendMessage();
    }
  }, [showGeneratingResponse, transcript]);

  const speakText = (text) => {
    console.log("speakText called with text:", text); // Add this line
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US"; // Set language
      utterance.rate = 1.0; // Adjust speed if needed
      speechSynthesis.speak(utterance);
      console.log("Speech synthesis started"); // Add this line
    } else {
      console.warn("Speech synthesis not supported in this browser.");
    }
  };
  
  useEffect(() => {
    const newSocket = new WebSocket("wss://ws.apexiq.ai/ws/audio/");
    setSocket(newSocket);
  
    newSocket.onopen = () => {
      console.log("Connected to WebSocket server");
    };
  
    newSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Message from server:", data);
  
        if (data.text) {
          // Start streaming the response word by word
          // streamMessage(data.text);
          streamMessage("Hello, how can I assist you?"|| data.text);
          if (isVoiceResponse) {
            console.log("Calling speakText with:", data.text); // Add this line
            speakText(data.text);
          }
          // Set showChatWindow to true when a response is received
          setShowChatWindow(true);
        }
      } catch (error) {
        setShowChatWindow(true);
        console.error("Error parsing message:", error);
      }
    };
  
    newSocket.onclose = (event) => {
      setShowChatWindow(true);
  //     console.log(" WebSocket Closed");
  // console.log(" Close Event:", event);
  // console.log("Close Code:", event.code, "Reason:", event.reason);
    };
  
    newSocket.onerror = (error) => {
      setShowChatWindow(true);
      console.error("WebSocket error:", error);
    };
  
    return () => {
      if (newSocket) newSocket.close();
    };
  }, []);
  
  // Stream the response word by word
  const streamMessage = (text) => {
    let words = text.split(" ");
    let index = 0;
    let tempMessage = ""; // Temporary message state
    
    const interval = setInterval(() => {
      if (index < words.length) {
        tempMessage += (tempMessage ? " " : "") + words[index];
        setCurrentMessage(tempMessage );
        index++;
      } else {
        clearInterval(interval);
        setMessages((prev) => [...prev, { role: "assistant", content: tempMessage }]);
        setCurrentMessage("");
      }
    }, 200); // Adjust speed as needed
  };
  
  
  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      alert("WebSocket is not connected!");
      return;
    }
  
    const message = {
      session_id: "v3bteula7ncrsq5y792dqtmohxqwpvv0",
      collection_name: collection_name || "pdf_collection_20250228_201524",
      text_query: inputText || transcript,
      audio_query: "",
    };
  
    // Add user message to the chat
    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputText },
    ]);
  
    socket.send(JSON.stringify(message));
    console.log("Message sent:", message);
    setInputText(""); // Clear input field
    setIsVoiceResponse(!!transcript);
  };
  
  if (showChatWindow) {
    return <Chat speakText={speakText}
     spokenText={transcript|| "spoken text will be display here "} aiResponse={"Ai response here visible here.."} senddataToServer={sendMessage} onToggleRecording={onToggleRecording} />;
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
          {/* Loading animation */}
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
            {transcript}
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

