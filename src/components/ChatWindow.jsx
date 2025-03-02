import { useState, useRef, useEffect,useContext } from "react";
import { BiArrowBack, BiMenu } from "react-icons/bi";
import AIPopup from "./AIPopup";
import AudioWaveButton from "./AudioWaveButton";
import Sidebar from "./Sidebar";
import axios from "axios";
import Speech from "speak-tts";
import Hood from "./Hood";
import { DataContext } from "../context/DataContext";

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

const ChatWindow = ({ isLoggedIn, onLogin, onLogout,csrfToken }) => {
  const { setAudioForServer, setMessages, inputText, setInputText,isRecording, setIsRecording
     ,transcript, setTranscript } = useContext(DataContext);
  const [showAIPopup, setShowAIPopup] = useState(false);
  const [history, setHistory] = useState([]);
  const [uploadedFileName, setUploadedFileName] = useState("");
  // const [isRecording, setIsRecording] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);
  const formData = useRef(new FormData());
  const audioChunks = useRef([]);
  const mediaRecorder = useRef(null);
  const formDataRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("Uploaded file:", file);
    handlePdfUpload(file);
};

const handlePdfUpload = async (file) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append('file', file);
    const apiUrl = import.meta.env.VITE_API_URL;
    const response = await axios.post(
      `{apiUrl}/tp/upload/`,
      formData,
      {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      }
    );

    if (response.status === 201) {
      alert('PDF uploaded successfully!');
      console.log('PDF upload response:', response.data);
    } else {
      setError('PDF upload failed');
    }
  } catch (err) {
    setError(err.response?.data?.error || 'PDF upload failed');
  }
};

useEffect(() => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }

  recognitionRef.current = new SpeechRecognition();
  recognitionRef.current.continuous = true;
  recognitionRef.current.interimResults = true;
  recognitionRef.current.lang = "en-US";

  recognitionRef.current.onresult = (event) => {
    let finalTranscript = "";
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
      } else {
        interimTranscript += transcript;
      }
    }

    setTranscript((prev) => prev + finalTranscript);
  };

  recognitionRef.current.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };
}, []);

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/wav",
      });
      audioChunksRef.current = [];
    };
    mediaRecorderRef.current.start();
    recognitionRef.current.start();
    setIsRecording(true);
  } catch (err) {
    console.error("Error accessing microphone:", err);
  }
};

const stopRecording = () => {
  mediaRecorderRef.current.stop();
  recognitionRef.current.stop();
  setIsRecording(false);
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
    await startRecording();
    setShowAIPopup(true);
  } catch (error) {
    alert("Please enable microphone access to use this feature.");
  }
};
const handleNewChat = () => {
  setHistory([]);
  formData.current.delete("file");
  setUploadedFileName("");
  setShowAIPopup(false);
};

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

const onToggleRecording = () => {
  if (isRecording) {
    stopRecording();
  } else {
    startRecording();
  }
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
                {  "Upload"}
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
        ) :(
        <AIPopup
          onClose={() => setShowAIPopup(false)}
          onToggleRecording={onToggleRecording}
        
        />
      )}
      </div>
    </div>
  );
};

export default ChatWindow;
