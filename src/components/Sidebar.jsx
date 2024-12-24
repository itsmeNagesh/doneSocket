import { BiMessageSquare } from 'react-icons/bi';
import { useState } from 'react';
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { IoChatbubble } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";

const Sidebar = ({ onNewChat, onLogin, history }) => {
  return (
    <div className="w-80 bg-[#1E1F22] text-white fixed h-screen">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
        <div className="flex items-center justify-between mb-2 pt-1">
  <h1 className="text-xl font-bold">New Chat</h1>
  <BiSolidMessageSquareAdd onClick={onNewChat} size={32} className='text-[#3FA738] cursor-pointer' />
</div>

          <Tabs>
  <TabList className="flex items-center justify-between rounded-md h-[45px] bg-[#3F424A]">
    <Tab className="flex items-center cursor-pointer px-4 py-2 text-xs font-bold text-green-400 border-gray-600 gap-1">
      <IoChatbubble size={15}/>
      CHATS
      <span className="ml-1 px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded-full">24</span>
    </Tab>
    <Tab className="flex items-center cursor-pointer gap-1 px-4 py-2 text-xs font-bold text-gray-400">
      <FaBookmark size={15}/>
      SAVED
      <span className="ml-1 px-2 py-0.5 bg-gray-500 text-white text-xs font-semibold rounded-full">24</span>
    </Tab>
  </TabList>
  <TabPanel>
  <div className="pt-4">
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-full bg-[#383b3f] px-4 py-2 text-sm text-white rounded-md"
      />
    </div>
    <div>hello</div>
  </div>
</TabPanel>

</Tabs>

            {/* {history.map((item, index) => (
              <div key={index} className="py-2 hover:bg-white/10 cursor-pointer rounded px-2 transition-colors">
                {item}
              </div>
            ))} */}
          
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