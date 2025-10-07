
import React, { useState } from 'react';
import { CHARACTER_GROUPS } from '../constants';
import type { BiblicalCharacter } from '../types';

interface SidebarProps {
  activeCharacter: BiblicalCharacter;
  onSelectCharacter: (character: BiblicalCharacter) => void;
  onSendPreset: (question: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCharacter, onSelectCharacter, onSendPreset, isOpen, onClose }) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['General Bible Questions', 'Jesus & His Disciples']));

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupName)) {
        newSet.delete(groupName);
      } else {
        newSet.add(groupName);
      }
      return newSet;
    });
  };
  const sidebarContent = (
    <div className="flex flex-col h-full bg-stone-800 text-stone-200">
      <div className="p-5 border-b border-stone-700">
        <h2 className="text-2xl font-serif font-bold text-amber-100">The Bible Chat</h2>
        <p className="text-sm text-stone-400 mt-1">Talk with figures from the Bible</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h3 className="p-5 text-lg font-serif font-semibold text-stone-300">Choose a Personage</h3>
        <div className="px-2 space-y-2">
          {CHARACTER_GROUPS.map((group) => (
            <div key={group.name} className="mb-2">
              <button
                onClick={() => toggleGroup(group.name)}
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-stone-700 transition-colors duration-200"
              >
                <span className="font-semibold text-amber-200">{group.name}</span>
                <svg
                  className={`w-5 h-5 transform transition-transform duration-200 ${
                    expandedGroups.has(group.name) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedGroups.has(group.name) && (
                <div className="pl-2 space-y-1 mt-1">
                  {group.characters.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => onSelectCharacter(char)}
                      className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 ${
                        activeCharacter.id === char.id ? 'bg-amber-800/50 text-white' : 'hover:bg-stone-700'
                      }`}
                    >
                      <img src={char.avatarUrl} alt={char.name} className="w-10 h-10 rounded-full mr-3 object-cover border-2 border-stone-500" />
                      <div>
                        <p className="font-bold font-sans text-sm">{char.name}</p>
                        <p className="text-xs text-stone-400">{char.title}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-stone-700 pt-4">
           <h3 className="px-5 pb-3 text-lg font-serif font-semibold text-stone-300">Example Questions</h3>
           <div className="px-5 space-y-2">
            {activeCharacter.presetQuestions.map((q, i) => (
                <button 
                    key={i}
                    onClick={() => onSendPreset(q)}
                    className="w-full text-left text-sm text-stone-300 p-2 rounded-md hover:bg-stone-700 transition-colors duration-200"
                >
                    "{q}"
                </button>
            ))}
           </div>
        </div>
      </div>

      <footer className="p-5 text-xs text-center text-stone-500 border-t border-stone-700">
        <p>Powered by Google Gemini. Responses are AI-generated.</p>
      </footer>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-30 transition-opacity duration-300 ease-in-out md:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
        <div className={`relative w-72 h-full transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {sidebarContent}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-80 flex-shrink-0 h-screen">
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
