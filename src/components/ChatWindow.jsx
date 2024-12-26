import { useState, useRef, useEffect } from "react";
import { BiArrowBack, BiMenu } from "react-icons/bi";
import AIPopup from "./AIPopup";
import AudioWaveButton from "./AudioWaveButton";
import Sidebar from "./Sidebar";
import axios from "axios";
import Speech from 'speak-tts';
import Hood from './Hood';

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

const ChatWindow = ({ isLoggedIn, onLogin }) => {
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [history, setHistory] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const formData = useRef(new FormData());
  const audioChunks = useRef([]);
  const mediaRecorder = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Uploaded file:", file);
    formData.current.append("file", file);
    setUploadedFileName(file.name);
  };

  const sendFormDataToBackend = async () => {
    try {
      const response = await axios.post("http://localhost:3000/upload-pdf", formData.current, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
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
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        const audioFormData = new FormData();
        audioFormData.append("audio", audioBlob);

        try {
          const response = await axios.post("http://localhost:3000/process-audio", audioFormData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
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

  return (
    <div className="flex h-screen bg-[#D9D9D9]">
      {isSidebarOpen && <Sidebar onNewChat={handleNewChat} onLogin={onLogin} history={[]} />}
      <div className={`flex-1 flex flex-col ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <header className="bg-[#1E1F22] h-[75px] p-4 shadow-sm flex justify-between items-center">
          <div className="flex items-center">
            <button className="flex items-center text-white hover:text-purple-600 transition-colors" onClick={toggleSidebar}>
              <BiMenu className="text-xl" />
            </button>
          </div>
          <button className="flex items-center text-white hover:text-purple-600 transition-colors">
            <BiArrowBack className="text-xl" />
            <span className="ml-2">Back</span>
          </button>
        </header>

        {!showAIPopup ? (
          <main className="flex items-center justify-center h-fit overflow-hidden relative">
          <div className="text-center space-y-8 mt-20 pt-10">
            <Hood />
          </div>
          <div className="fixed top-3/2 transform -translate-y-1/2 flex justify-center">
    <h5 className="text-center font-bold text-[#6E1EA3] text-2xl">
      What can<br />I<br />help you with?
    </h5>
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
