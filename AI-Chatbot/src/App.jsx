import React, { useState , useEffect, useRef } from "react";
import Chatboticon from "./components/Chatboticon";
import BotForm from "./components/BotForm";
import ChatMessage from "./components/ChatMessage";
import {companyInfo} from "./components/companyInfo"

const App = () => {
  const [chatHistory, setchatHistory] = useState([
    {
      hideInChat: true,
      role: "model",
      text: companyInfo
    }
  ]);
  const [showChatbot, setShowChatbot] = useState(false);
  const chatBodyref = useRef();
  const generateBotResponse = async (history) => {
    //Helper function to update chat  history
    const updateHistory = (text,isError) => {
      setchatHistory((prev) => {
        const newHistory = [...prev];
        const lastMessageIndex = newHistory.length - 1;
  
        // Check if the last message is "Thinking..."
        if (newHistory[lastMessageIndex]?.text === "Thinking....") {
          // Replace the last message with the new bot response
          newHistory[lastMessageIndex] = { role: "model", text ,isError};
        } else {
          // Otherwise, add a new message
          newHistory.push({ role: "model", text , isError});
        }
  
        return newHistory;
      });
    };

    // Format chat history for API request
    history = history.map(({ role, text }) => ({ role, parts: [{ text }] }));

    const requestOptions = {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: history }),
    };

    // Make the API call to get the bot's response
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL,
        requestOptions
      );
      console.log("Response Status:", response.status);
    
      const data = await response.json();

      if (!response.ok)
        throw new Error(data?.error.message || "Something went wrong!");

      // Clean and update chat history with bot's response
      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      updateHistory(apiResponseText);
    } catch (error) {
      console.log(error )
      updateHistory(error.message,true);
     
    }
  };

  //for auto-scroll ing
useEffect(()=>{
  if(chatBodyref.current){
    chatBodyref.current.scrollTo({top:chatBodyref.current.scrollHeight,behavior:"smooth"});
  }
},[chatHistory])
  return (
    <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
    <button onClick={() => setShowChatbot((prev) => !prev)} id="chatbot-toggler">
      <span className="material-symbols-rounded">mode_comment</span>
      <span className="material-symbols-rounded">close</span>
    </button>
      <div className="pop-up">
        {/* pop */}

        {/* /////header */}
        <div className="bot-header">
          <div className="header-info">
            <Chatboticon /> <p className="title">Hemroo Chatbot</p>
          </div>
          <button
            onClick={() => setShowChatbot((prev) => !prev)}
            className=" header-arrow material-symbols-rounded"
          >
            keyboard_arrow_down
          </button>
        </div>
        {/* ///////////body */}
        <div className="bot-body" ref={chatBodyref}>
          {/* //////bot msg */}
          <div className="bot-msg msg">
            <Chatboticon />
            <p className="bot-text"> Hello there! how can i help you?</p>
          </div>
          {/* ///////user msg     Render chathistory*/}
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat} />
          ))}
        </div>
        <div className="user-input">
          <BotForm
            chatHistory={chatHistory}
            setchatHistory={setchatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
