import { create } from 'zustand';

export interface IChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface IChatState {
  messages: IChatMessage[];
  input: string;
  setInput: (value: string) => void;
  addMessage: (message: IChatMessage) => void;
  clearChat: () => void;
}

export const useChatStore = create<IChatState>((set) => ({
  messages: [],
  input: '',
  setInput: (value) => set({ input: value }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearChat: () => set({ messages: [] }),
}));
