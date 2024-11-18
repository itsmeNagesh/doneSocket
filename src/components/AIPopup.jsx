import { motion } from 'framer-motion';
import { FaCheck, FaMicrophone, FaStop } from 'react-icons/fa';

const AIPopup = ({ onClose, onToggleRecording, isRecording }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4"
    >
      {/* Wave Animation Container */}
      <div className="bg-gray-100 rounded-lg p-8 mb-8 w-full max-w-lg">
        <div className="flex justify-center items-end h-32 space-x-1">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 bg-purple-600 rounded-full"
              animate={{
                height: ['20px', '60px', '20px'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>

      {/* Buttons Container */}
      <div className="flex space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleRecording}
          className={`p-4 rounded-full transition-colors ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
        >
          {isRecording ? <FaStop className="text-2xl" /> : <FaMicrophone className="text-2xl" />}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 transition-colors"
        >
          <FaCheck className="text-2xl" />
        </motion.button>
      </div>
    </motion.div>
  );
}

export default AIPopup;