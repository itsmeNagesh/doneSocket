import { BiMessageSquare } from "react-icons/bi";
import { useState } from "react";
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { IoChatbubble } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa6";
import { IoFilterOutline } from "react-icons/io5";

const Sidebar = ({ onNewChat, onLogin,isLoggedIn }) => {
  // Updated dummy data for chat and saved history
  const chatHistory = [
    {
      id: 1,
      title: "Warning Messages Samples",
      preview: "Sure! Here are three different versions of 404 error messages for an ecommerce.",
      timestamp: "Now",
    },
    {
      id: 2,
      title: "Competitive Analysis Research",
      preview: "A competitive analysis of restaurant delivery mobile applications reveals key insights.",
      timestamp: "Thu",
    },
    {
      id: 3,
      title: "User Personas Research",
      preview: "User persona research is a process of creating fictional but realistic representations.",
      timestamp: "Mon",
    },
  ];

  const savedHistory = [
    {
      id: 1,
      title: "Saved Article 1",
      preview: "A guide to understanding the basics of React components and state management.",
      timestamp: "Tue",
    },
    {
      id: 2,
      title: "Saved Notes",
      preview: "Notes from the last meeting, covering key topics like deadlines and feature priorities.",
      timestamp: "Last Week",
    },
  ];

  return (
    <div className="w-80 bg-[#1E1F22] text-white fixed h-screen">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2 pt-1">
            <h1 className="text-xl font-bold">New Chat</h1>
            <BiSolidMessageSquareAdd
              onClick={onNewChat}
              size={32}
              className="text-[#3FA738] cursor-pointer"
            />
          </div>

          <Tabs>
          <TabList className="flex items-center justify-between rounded-md h-[45px] bg-[#3F424A]">
    <Tab className="flex items-center cursor-pointer px-4 py-2 text-xs font-bold text-gray-400 gap-1" selectedClassName='text-green-400 bg-black rounded-md ml-1'>
      <IoChatbubble size={15}/>
      CHATS
      <span className="ml-1 px-2 py-0.5 bg-gray-500 text-white text-xs font-semibold rounded-full" selectedClassName="bg-green-400">24</span>
    </Tab>
    <Tab className="flex items-center cursor-pointer gap-1 px-4 py-2 text-xs font-bold text-gray-400" selectedClassName='text-green-400 bg-black rounded-md mr-1'>
      <FaBookmark size={15}/>
      SAVED
      <span className="ml-1 px-2 py-0.5 bg-gray-500 text-white text-xs font-semibold rounded-full">24</span>
    </Tab>
  </TabList>

            {/* Chats Tab */}
            <TabPanel>
              <div className="pt-4">
                <div className="mb-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-[#383b3f] px-4 py-2 text-sm text-white rounded-md"
                  />
                  <button className="ml-1 rounded-md">
                    <IoFilterOutline
                      size={22}
                      className="text-green-400 hover:text-green-300 font-bold"
                    />
                  </button>
                </div>
                <div>
                  {chatHistory.map((chat) => (
                    <div
                      key={chat.id}
                      className="py-3 px-4 hover:bg-[#2A2B2E] cursor-pointer rounded transition-colors"
                    >
                      <h3 className="text-md font-semibold text-purple-500">
                        {chat.title}
                      </h3>
                      <p className="text-sm text-white truncate">
                        {chat.preview}
                      </p>
                      <span className="text-xs text-gray-400">{chat.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>

            {/* Saved Tab */}
            <TabPanel>
              <div className="pt-4">
                <div className="mb-4 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-[#383b3f] px-4 py-2 text-sm text-white rounded-md"
                  />
                  <button className="ml-1 rounded-md">
                    <IoFilterOutline
                      size={22}
                      className="text-green-400 hover:text-green-300 font-bold"
                    />
                  </button>
                </div>
                <div>
                  {savedHistory.map((saved) => (
                    <div
                      key={saved.id}
                      className="py-3 px-4 hover:bg-[#2A2B2E] cursor-pointer rounded transition-colors"
                    >
                      <h3 className="text-md font-semibold text-purple-500">
                        {saved.title}
                      </h3>
                      <p className="text-sm text-white truncate">
                        {saved.preview}
                      </p>
                      <span className="text-xs text-gray-400">{saved.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
          </Tabs>
          {/* {history.map((item, index) => (
              <div key={index} className="py-2 hover:bg-white/10 cursor-pointer rounded px-2 transition-colors">
                {item}
              </div>
            ))} */}
        </div>
       {
         !isLoggedIn && <button
         onClick={onLogin}
         className="bg-white text-[#9F60B9] px-4 py-2 rounded hover:bg-gray-200 transition-colors"
       >
         Login
       </button>
       }
      </div>
    </div>
  );
};

export default Sidebar;
