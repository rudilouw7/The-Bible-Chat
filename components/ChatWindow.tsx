
import React, { useEffect, useRef } from 'react';
import type { Message } from '../types';
import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="flex items-center space-x-2 bg-stone-700 text-white p-3 rounded-lg rounded-bl-none max-w-lg shadow-md">
            <LoadingSpinner />
            <span className="italic text-stone-300">Thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
