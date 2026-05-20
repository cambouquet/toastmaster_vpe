import { useState } from 'react';
import { Message } from '../models/Message';
import { AiService } from '../services/ai/AiService';

export const useChat = (aiService: AiService) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), text, 
      sender: 'user', timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);

    const response = await aiService.sendMessage(text);
    const botMsg: Message = { id: (Date.now() + 1).toString(), 
      text: response, sender: 'bot', timestamp: new Date() };
    setMessages((prev) => [...prev, botMsg]);
  };

  return { messages, sendMessage };
};
