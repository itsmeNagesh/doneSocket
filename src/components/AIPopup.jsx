import { motion } from 'framer-motion';
import { FaCheck, FaMicrophone, FaStop } from 'react-icons/fa';

const AIPopup = ({ onClose, onToggleRecording, isRecording }) => {
  return (
    <main className="justify-center h-full relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="inset-0 h-full z-50 flex flex-col items-center justify-center "
      >
        {/* Text "Listening" */}
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-medium text-black self-start pl-20 ml-10"
          >
            LISTENING
          </motion.div>
        )}

        {/* Wave Animation Container */}
        <div className="bg-gray-100 rounded-lg p-8 mb-8 w-full">
  <div className="flex justify-center items-end h-32 space-x-2">
    {[...Array(30)].map((_, i) => {
      // Generate HSL colors, varying the hue from 0 (red) to 270 (purple/blue spectrum)
      const hue = (i / 30) * 270; // Adjust 270 to include more hues if needed
      const color = `hsl(${hue}, 60%, 50%)`; // Saturation and lightness fixed for vibrant colors
      return (
        <motion.div
          key={i}
          className="w-3 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            height: ['20px', '60px', '20px'],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      );
    })}
  </div>
</div>



        {/* Buttons Container */}
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onToggleRecording}
            className={`p-4 rounded-full transition-colors ${
              isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            }`}
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
    </main>
  );
};

export default AIPopup;
