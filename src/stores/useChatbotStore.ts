import { create } from 'zustand';

export type Role = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  isStreaming?: boolean;
}

interface ChatState {
  messages: ChatMessage[];
  addMessage: (msg: ChatMessage) => void;
  updateMessage: (id: string, content: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [
    {
      id: 'init',
      role: 'assistant',
      content:
        '안녕! 나는 여가 생활 추천 AI 큐큐야! 서울에 있는 컨텐츠나 모임을 지금 너가 원하는 상태에 따라 추천해줄게. 모임, 컨텐츠(행사,장소) 둘 중 하나 선택해줘.',
    },
  ],

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  updateMessage: (id, content) =>
    set((state) => ({
      messages: state.messages.map((m) => (m.id === id ? { ...m, content } : m)),
    })),
}));
