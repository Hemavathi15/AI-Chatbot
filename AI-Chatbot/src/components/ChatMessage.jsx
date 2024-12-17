import React from 'react'
import Chatboticon from './Chatboticon'

const ChatMessage = ({chat}) => {
  return (
    !chat.hideInChat &&
    <div className={`msg ${chat.role === "model" ? "bot" : "user" }-msg ${chat.isError ? "error" : ""}` }>
        
        {chat.role === "model" &&  <Chatboticon/>}
            <p className={`msg-text ${chat.role === "model" ? "bot" : "user" }-text` }>{chat.text}</p>
          </div>
  )
}

export default ChatMessage