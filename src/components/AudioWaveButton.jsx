import { PiWaveformBold } from "react-icons/pi";

const AudioWaveButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 bg-[#4B4F5B] text-white px-8 py-4 rounded-md hover:bg-[#797c85] transition-colors text-lg"
    >
      <PiWaveformBold className='text-2xl' />
      <span>Start Talking</span>
    </button>
  );
};

export default AudioWaveButton;