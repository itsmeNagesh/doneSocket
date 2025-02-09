import { useState, useRef, useEffect } from "react";
import { BiArrowBack, BiMenu } from "react-icons/bi";
import AIPopup from "./AIPopup";
import AudioWaveButton from "./AudioWaveButton";
import Sidebar from "./Sidebar";
import axios from "axios";
import Speech from "speak-tts";
import Hood from "./Hood";
// import AudioPlayer from '../components/AudioPlayer';
const speech = new Speech();
if (speech.hasBrowserSupport()) {
  speech.init({
    volume: 1,
    lang: "en-US",
    rate: 1,
    pitch: 1,
    voice: "Google US English",
    splitSentences: true,
  });
}

const ChatWindow = ({ isLoggedIn, onLogin, onLogout }) => {
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [history, setHistory] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const formData = useRef(new FormData());
  const audioChunks = useRef([]);
  const mediaRecorder = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Uploaded file:", file);
    formData.current.append("file", file);
    setUploadedFileName(file.name);
  };
  // Handle Data Upload pdf file
  const sendFormDataToBackend = async () => {
    const apiUrl = import.meta.env.VITE_API_URL; 
    try {
      const csrfToken = Cookies.get("X-CSRFToken");
      const response = await axios.post(
        `${apiUrl}tp/upload/`,
        formData.current,
        {
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response fron Upload api:", response.data);
      // formData.current.delete("file");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleAudioWaveButtonClick = async () => {
    if (!isLoggedIn) {
      onLogin();
      return;
    }
    if (!uploadedFileName) {
      alert("Please upload a file first.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (stream) {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = (event) => {
          audioChunks.current.push(event.data);
        };
        sendFormDataToBackend();
        setShowAIPopup(true);
      }
    } catch (error) {
      alert("Please enable microphone access to use this feature.");
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  };

  const handleStartRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "inactive") {
      audioChunks.current = [];
      mediaRecorder.current.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = async () => {
    if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        const audioFormData = new FormData();
        audioFormData.append("audio", audioBlob);

        try {
          const response = await axios.post(
            "http://localhost:3000/process-audio",
            audioFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          const textResponse = response.data.text;
          console.log("Received text response:", textResponse);
          await speech.speak({
            text: textResponse,
          });
          setHistory((prevHistory) => [...prevHistory, textResponse]);
          audioChunks.current = [];
        } catch (error) {
          console.error("Error sending audio file:", error);
        }
      };
      setIsRecording(false);
    }
  };

  // API to get audio file
  // const response = await axios.post("http://localhost:3000/get-audio", audioFormData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
  // });
  // const audioBlob = response.data.audio;
  // const audioUrl = URL.createObjectURL(audioBlob);
  // const audio = new Audio(audioUrl);
  // audio.play();

  const handleNewChat = () => {
    setHistory([]);
    formData.current.delete("file");
    setUploadedFileName("");
    setShowAIPopup(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Websocket connection
  // useEffect(() => {
  //   socket.current = io('wss://api.apexiq.ai/ws/audio/');
  //   socket.current.on('connect', () => {
  //     console.log('WebSocket connection established');
  //   });
  //   socket.current.on('message', (data) => {
  //     console.log('Message from server:', data);
  //   });
  //   socket.current.on('disconnect', () => {
  //     console.log('WebSocket connection closed');
  //   });
  //   socket.current.on('error', (error) => {
  //     console.error('WebSocket error:', error);
  //   });

  //   return () => {
  //     if (socket.current) {
  //       socket.current.disconnect();
  //     }
  //   };
  // }, []);
  const exampleData = {
    text: "You're asking the million-dollar question: what is an agent? Well, let me break it down for you in simple terms.",
    audio:
      "1S4FOzI0Cjvk/vo6LOf5OiPYEjv3FBQ7qZcdO4rGHTu+Khg77kgVO53fIDvf+DI7Id4oO8H0ITtk4ik7Or8kOyF/DTuESgk7s20GO+Fh5jpeMec6/qvsOicc1", // Example Base64 audio
  };

  return (
    <div className="flex h-screen bg-[#D9D9D9]">
      {isSidebarOpen && (
        <Sidebar
          onNewChat={handleNewChat}
          onLogin={onLogin}
          history={[]}
          isLoggedIn={isLoggedIn}
        />
      )}
      <div
        className={`flex-1 flex flex-col min-h-screen overflow-hidden ${
          isSidebarOpen ? "ml-80" : "ml-0"
        }`}
      >
        <header className="bg-[#1E1F22] h-[75px] p-4 shadow-sm flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="flex items-center text-white hover:text-purple-600 transition-colors"
              onClick={toggleSidebar}
            >
              <BiMenu className="text-xl" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <button
                className="flex items-center hover:text-purple-600 transition-colors bg-white text-black px-4 py-2 rounded"
                onClick={onLogout} // ✅ Fixed: Corrected `onClick` attribute
              >
                <span className="ml-2">Logout</span>
              </button>
            )}
            <button className="flex items-center text-white hover:text-purple-600 transition-colors"  onClick={() => (window.location.href = "https://apexiq.ai")}>
              <BiArrowBack className="text-xl" />
              <span className="ml-2">Back</span>
            </button>
          </div>
        </header>

        {!showAIPopup ? (
          <main className="flex items-center justify-center h-fit overflow-hidden relative">
            <div className="text-center space-y-8 mt-20 pt-10">
              <Hood />
            </div>
            <div className="fixed top-3/2 transform -translate-y-1/2 flex justify-center">
              <h5 className="text-center font-bold text-[#6E1EA3] text-2xl">
                What can
                <br />I<br />
                help you with?
              </h5>
              {/* <AudioPlayer text={exampleData.text} audioBase64={exampleData.audio} /> */}
            </div>
            <div className="absolute bottom-16 w-full flex justify-center space-x-4">
              <label className="bg-[#4B4F5B] text-white px-8 py-4 rounded cursor-pointer hover:bg-[#797c85] transition-colors inline-block text-lg">
                {uploadedFileName || "Upload"}
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </label>

              <div>
                <AudioWaveButton onClick={handleAudioWaveButtonClick} />
              </div>
            </div>
          </main>
        ) : (
          <AIPopup
            onClose={() => setShowAIPopup(false)}
            onToggleRecording={handleToggleRecording}
            isRecording={isRecording}
          />
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
