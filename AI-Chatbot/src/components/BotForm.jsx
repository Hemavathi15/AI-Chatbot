import React from "react";
import { useRef } from "react";

const BotForm = ({ chatHistory, setchatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value;
    console.log(userMessage);

    if (!userMessage) return;
    inputRef.current.value = "";

    // Create a new chat history with the user message
    const updatedChatHistory = [
      ...chatHistory,
      { role: "user", text: ` ${userMessage}` },
    ];

    // Append user text to chat history
    setchatHistory(updatedChatHistory);

    // Display bot thinking
  setchatHistory((history) => [
    ...history,
    { role: "model", text: "Thinking...." },
  ]);

  // Call function to generate response with the updated chat history
  generateBotResponse(updatedChatHistory);
  };

  return (
    <>
      <form action="#" className="forms" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className="ip"
          placeholder="Type a message"
          required
        />
        <button type="submit" className="material-symbols-rounded">
          arrow_upward_alt
        </button>
      </form>
    </>
  );
};

export default BotForm;
