import React, { useState } from "react";
import ChatBot from "./chatBot";

const ChatBotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);

  const toggleChat = () => {
    setIsOpen(true);
    if (isOpen && isFirstOpen) {
      setIsFirstOpen(false);
    }
    setIsFirstOpen(true);
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-8 right-5 z-40">
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-transparent shadow-lg rounded-lg relative">
          <ChatBot closeChat={toggleChat} showWelcomeMessage={isFirstOpen} />
        </div>
      )}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="flex items-center justify-center w-14 h-14 bg-blue-500 rounded-full shadow-lg text-white"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBotButton;
