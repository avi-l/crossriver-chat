import { create } from 'zustand';
import type { ChartPayload } from '@/types/chart';

export type TRole = 'user' | 'assistant' | 'system';
export interface IChatMessage {
  id: string;
  role: TRole;
  content: string;
  chart?: ChartPayload;
}

interface IChatState {
  messages: IChatMessage[];
  input: string;
  setInput: (value: string) => void;
  addMessage: (message: IChatMessage) => void;
  clearMessages: () => void;
}

export const useChatStore = create<IChatState>((set) => ({
  messages: [],
  input: '',
  setInput: (value) => set({ input: value }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));
