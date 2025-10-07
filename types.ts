
export interface BiblicalCharacter {
  id: string;
  name: string;
  title: string;
  intro: string;
  avatarUrl: string;
  systemPrompt: string;
  presetQuestions: string[];
}

export interface CharacterGroup {
  name: string;
  characters: BiblicalCharacter[];
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
}
