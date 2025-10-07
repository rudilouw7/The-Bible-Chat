import { GoogleGenAI, Chat } from "@google/genai";
import type { BiblicalCharacter } from "../types";

const apiKey = process.env.API_KEY;
if (!apiKey) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey });

export function createChatSession(character: BiblicalCharacter): Chat {
  const chat = ai.chats.create({
    model: 'gemini-2.0-flash-exp',
    config: {
      systemInstruction: character.systemPrompt,
    },
  });

  return chat;
}
