import { useState } from 'react';
import { MicrophoneIcon, PaperClipIcon } from '@heroicons/react/24/solid';

export default function ChatInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Add voice recording logic here
  };

  return (
    <form onSubmit={handleSend} className="border-t bg-white p-4">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center gap-2 rounded-xl bg-gray-900 p-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message ApexIQ AI"
            className="flex-1 bg-transparent px-3 py-2 text-white placeholder-gray-400 focus:outline-none"
          />
          <div className="flex items-center gap-2 px-2">
            <label className="cursor-pointer">
              <PaperClipIcon className="h-6 w-6 text-gray-400 hover:text-white" />
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
            <button
              type="button"
              onClick={toggleRecording}
              className={`${isRecording ? 'text-red-500' : 'text-gray-400 hover:text-white'}`}
            >
              <MicrophoneIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}