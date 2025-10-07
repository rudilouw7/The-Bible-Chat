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
          model: 'gemini-2.0-flash-exp',
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Parse SSE (Server-Sent Events) stream
      async function* streamResponse() {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error('No reader available');
        }

        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
                if (text) {
                  yield { text };
                }
              } catch (e) {
                // Skip invalid JSON
                console.warn('Failed to parse SSE data:', e);
              }
            }
          }
        }
      }

      return streamResponse();
    },
  };
}

