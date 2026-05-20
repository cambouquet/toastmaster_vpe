import { useState } from 'react';

export const useChat = (aiService) => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (text) => {
    const userMsg = { 
      id: Date.now().toString(), 
      text, 
      sender: 'user', 
      timestamp: new Date() 
    };
    setMessages((prev) => [...prev, userMsg]);

    const response = await aiService.sendMessage(text);
    const botMsg = { 
      id: (Date.now() + 1).toString(), 
      text: response, 
      sender: 'bot', 
      timestamp: new Date() 
    };
    setMessages((prev) => [...prev, botMsg]);
  };

  return { messages, sendMessage };
};
