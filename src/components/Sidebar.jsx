import { BiMessageSquare } from 'react-icons/bi';
import { useState } from 'react';

const Sidebar = ({ onNewChat, onLogin, history }) => {
  return (
    <div className="w-80 bg-[#9F60B9] text-white fixed h-screen">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center mb-8">
            <BiMessageSquare className="text-3xl" />
            {/* <h2 className="text-xl font-semibold ml-3">No Rules Rules</h2> */}
          </div>
          
          <button 
            onClick={onNewChat} 
            className="bg-white text-[#9F60B9] px-4 py-2 rounded mb-4 hover:bg-gray-200 transition-colors"
          >
            New Chat
          </button>

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