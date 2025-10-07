
import React, { useState, useEffect, useCallback } from 'react';
import type { Chat } from '@google/genai';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import Login from './components/Login';
import { createChatSession } from './services/geminiService';
import { CHARACTERS } from './constants';
import type { BiblicalCharacter, Message } from './types';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [activeCharacter, setActiveCharacter] = useState<BiblicalCharacter>(CHARACTERS[0]);
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const authToken = localStorage.getItem('bible_chat_auth');
    if (authToken === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    try {
      const newChat = createChatSession(activeCharacter);
      setChat(newChat);
      setMessages([
        {
          id: `intro-${Date.now()}`,
          role: 'model',
          text: `Greetings. I am ${activeCharacter.name}. ${activeCharacter.intro}`,
        },
      ]);
      setError(null);
    } catch (e) {
      console.error("Failed to initialize chat:", e);
      setError("Failed to initialize chat session. Please check your API key.");
    }
  }, [activeCharacter]);

  const handleSelectCharacter = (character: BiblicalCharacter) => {
    setActiveCharacter(character);
    setIsSidebarOpen(false); // Close sidebar on selection (mobile)
  };

  const handleSendMessage = async (text: string) => {
    if (!chat || isLoading) return;

    setIsLoading(true);
    setError(null);
    const userMessage: Message = { 
      id: `user-${Date.now()}`, 
      role: 'user', 
      text 
    };
    setMessages(prev => [...prev, userMessage]);

    const streamingMessageId = `model-${Date.now()}`;
    try {
      const stream = await chat.sendMessageStream({ message: text });
      let modelResponse = '';
      
      // Create a new message for streaming
      const streamingMessage: Message = { 
        id: streamingMessageId, 
        role: 'model', 
        text: '' 
      };
      setMessages(prev => [...prev, streamingMessage]);

      for await (const chunk of stream) {
        modelResponse += chunk.text;
        setMessages(prev => 
            prev.map((msg) => 
                msg.id === streamingMessageId ? { ...msg, text: modelResponse } : msg
            )
        );
      }
    } catch (e) {
      console.error("Message sending failed:", e);
      const errorMessage = "I am unable to provide a response at this moment. Please try again later.";
      setError(errorMessage);
      setMessages(prev => [...prev, { 
        id: `error-${Date.now()}`, 
        role: 'model', 
        text: errorMessage 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendPreset = (question: string) => {
    handleSendMessage(question);
  };

  const handleLogin = (password: string) => {
    const correctPassword = import.meta.env.VITE_APP_PASSWORD || 'bible2024';
    
    if (password === correctPassword) {
      setIsAuthenticated(true);
      setLoginError(false);
      localStorage.setItem('bible_chat_auth', 'authenticated');
    } else {
      setLoginError(true);
    }
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} error={loginError} />;
  }

  return (
    <div className="font-sans bg-amber-50 text-stone-800 w-full h-screen flex overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeCharacter={activeCharacter} 
        onSelectCharacter={handleSelectCharacter}
        onSendPreset={handleSendPreset}
      />
      <main className="flex-1 flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/bible/1600/1200')"}}>
         <div className="h-full flex flex-col bg-black bg-opacity-50 backdrop-blur-sm">
            <header className="flex items-center p-4 bg-stone-800/80 text-white shadow-md z-10">
                <button 
                    className="md:hidden p-2 mr-4 rounded-md text-white hover:bg-stone-700"
                    onClick={() => setIsSidebarOpen(true)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
                <img src={activeCharacter.avatarUrl} alt={activeCharacter.name} className="w-12 h-12 rounded-full border-2 border-amber-200 object-cover" />
                <div className="ml-4">
                    <h1 className="text-xl font-serif font-bold text-amber-100">{activeCharacter.name}</h1>
                    <p className="text-sm text-stone-300">{activeCharacter.title}</p>
                </div>
            </header>
            <ChatWindow messages={messages} isLoading={isLoading} />
            <InputBar onSendMessage={handleSendMessage} isLoading={isLoading} />
            {error && <p className="text-center text-red-400 bg-stone-900 p-2">{error}</p>}
         </div>
      </main>
    </div>
  );
};

export default App;
