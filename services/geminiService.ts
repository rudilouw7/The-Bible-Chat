import type { BiblicalCharacter } from "../types";

export interface Chat {
  sendMessageStream: (params: { message: string }) => Promise<AsyncIterable<{ text: string }>>;
}

export function createChatSession(character: BiblicalCharacter): Chat {
  return {
    sendMessageStream: async (params: { message: string }) => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: params.message,
          systemPrompt: character.systemPrompt,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Simulate streaming by yielding the full response
      async function* streamResponse() {
        yield { text: data.response };
      }

      return streamResponse();
    },
  };
}

