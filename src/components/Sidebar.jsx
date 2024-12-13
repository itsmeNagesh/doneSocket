import { BiMessageSquare } from 'react-icons/bi';
import { useState } from 'react';
import { BiSolidMessageSquareAdd } from "react-icons/bi";

const Sidebar = ({ onNewChat, onLogin, history }) => {
  return (
    <div className="w-80 bg-[#1E1F22] text-white fixed h-screen">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
        <div className="flex items-center justify-between mb-4 pt-3">
  <h1 className="text-xl font-bold">New Chat</h1>
  <BiSolidMessageSquareAdd onClick={onNewChat} size={32} className='text-[#3FA738] cursor-pointer' />
</div>


          <div className="border-t border-white/20 pt-4">
            {/* {history.map((item, index) => (
              <div key={index} className="py-2 hover:bg-white/10 cursor-pointer rounded px-2 transition-colors">
                {item}
              </div>
            ))} */}
          </div>
        </div>
        <button 
          onClick={onLogin} 
          className="bg-white text-[#9F60B9] px-4 py-2 rounded hover:bg-gray-200 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Sidebar;