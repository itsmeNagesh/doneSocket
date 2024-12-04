import { PiWaveformBold } from "react-icons/pi";

const AudioWaveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 bg-purple-600 text-white px-8 py-4 rounded-md hover:bg-purple-700 transition-colors text-lg"
    >
      <PiWaveformBold className='text-2xl' />
      <span>Start Talking</span>
    </button>
  );
};

export default AudioWaveButton;