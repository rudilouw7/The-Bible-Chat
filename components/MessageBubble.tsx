
import React from 'react';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Basic markdown to HTML conversion for bold and italics
  const formatText = (text: string) => {
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italics
      
    // Handle numbered lists
    html = html.replace(/(\d+\.\s.*(?:\n\d+\.\s.*)*)/g, (match) => {
        const items = match.split('\n').map(item => `<li>${item.replace(/^\d+\.\s/, '')}</li>`).join('');
        return `<ol class="list-decimal list-inside pl-4">${items}</ol>`;
    });

    // Handle bulleted lists
    html = html.replace(/(\-\s.*(?:\n\-\s.*)*)/g, (match) => {
        const items = match.split('\n').map(item => `<li>${item.replace(/^\-\s/, '')}</li>`).join('');
        return `<ul class="list-disc list-inside pl-4">${items}</ul>`;
    });

    return { __html: html.replace(/\n/g, '<br />') };
  };

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="bg-amber-600 text-white font-sans p-4 rounded-lg rounded-br-none max-w-xl shadow-md">
          <p dangerouslySetInnerHTML={formatText(message.text)} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="bg-stone-100 bg-opacity-90 text-stone-900 font-serif p-4 rounded-lg rounded-bl-none max-w-xl shadow-md prose">
        <div dangerouslySetInnerHTML={formatText(message.text)} />
      </div>
    </div>
  );
};

export default MessageBubble;
