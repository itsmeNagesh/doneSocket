// import React, { useState } from 'react';

// const AudioPlayer = ({ text, audioBase64 }) => {
//     const [audioUrl, setAudioUrl] = useState(null);

//     // Decode and play the audio
//     const handlePlayAudio = () => {
//         // Decode Base64 to binary data
//         const binaryData = atob(audioBase64);
//         const arrayBuffer = new Uint8Array(binaryData.length);

//         for (let i = 0; i < binaryData.length; i++) {
//             arrayBuffer[i] = binaryData.charCodeAt(i);
//         }

//         // Create a Blob and generate an object URL
//         const blob = new Blob([arrayBuffer], { type: 'audio/wav' }); // Use correct MIME type
//         const url = URL.createObjectURL(blob);
//         setAudioUrl(url);
//     };

//     return (
//         <div>
//             <p>{text}</p>
//             <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 
// focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
//  onClick={handlePlayAudio}>Play Audio</button>
//             {audioUrl && (
//                 <audio controls>
//                     <source src={audioUrl} type="audio/wav" />
//                     Your browser does not support the audio element.
//                 </audio>
//             )}
//         </div>
//     );
// };
// export default AudioPlayer;
// Example usage
// const App = () => {
//     const exampleData = {
//         text: "You're asking the million-dollar question: what is an agent? Well, let me break it down for you in simple terms.",
//         audio: "1S4FOzI0Cjvk/vo6LOf5OiPYEjv3FBQ7qZcdO4rGHTu+Khg77kgVO53fIDvf+DI7Id4oO8H0ITtk4ik7Or8kOyF/DTuESgk7s20GO+Fh5jpeMec6/qvsOicc1" // Example Base64 audio
//     };

//     return <AudioPlayer text={exampleData.text} audioBase64={exampleData.audio} />;
// };

// import React, { useState } from "react";

// const AudioPlayer = () => {
//   const [text, setText] = useState("");
//   const [isSpeaking, setIsSpeaking] = useState(false);

//   const handleSpeak = () => {
//     if (!text) return alert("Please enter some text.");

//     const utterance = new SpeechSynthesisUtterance(text);
//     utterance.onstart = () => setIsSpeaking(true);
//     utterance.onend = () => setIsSpeaking(false);

//     speechSynthesis.speak(utterance);
//   };

//   const handleStop = () => {
//     speechSynthesis.cancel();
//     setIsSpeaking(false);
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
//       <h2>Text to Voice</h2>
//       <textarea
//         rows="5"
//         style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
//         placeholder="Type something here..."
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//       />
//       <div>
//         <button
//           onClick={handleSpeak}
//           disabled={isSpeaking}
//           style={{
//             padding: "10px 20px",
//             marginRight: "10px",
//             cursor: isSpeaking ? "not-allowed" : "pointer",
//           }}
//         >
//           Speak
//         </button>
//         <button
//           onClick={handleStop}
//           disabled={!isSpeaking}
//           style={{
//             padding: "10px 20px",
//             cursor: !isSpeaking ? "not-allowed" : "pointer",
//           }}
//         >
//           Stop
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AudioPlayer;
