"use client"
import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");
    const [collection_name, setCollectionName] = useState('');
    const [audioForserver, setAudioForServer] = useState('');
    const [transcript, setTranscript] = useState('');
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]); // Store messages
    const [currentMessage, setCurrentMessage] = useState(""); // Stream messages
    
    const [isRecording, setIsRecording] = useState(false);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <DataContext.Provider value={{ 
            theme,
            setCollectionName,
            collection_name,
            toggleTheme,
            setAudioForServer,
            audioForserver,
            transcript,
            setTranscript,
            inputText,
            setInputText,
            messages,
            setMessages,
            isRecording, 
            setIsRecording,currentMessage, setCurrentMessage
        }}>
            {children}
        </DataContext.Provider>
    );
};