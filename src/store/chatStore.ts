import { create } from "zustand";
import type { Message, ChatMode } from "../types/chat";

interface ChatStore {
  messages: Message[];
  mode: ChatMode;
  addMessage: (msg: Message) => void;
  updateLastMessage: (content: string) => void; // Nova função
  setMode: (mode: ChatMode) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  mode: "explain",

  addMessage: (msg) =>
    set((state) => ({ messages: [...state.messages, msg] })),

  updateLastMessage: (content) =>
    set((state) => {
      const newMessages = [...state.messages];
      if (newMessages.length > 0) {
        newMessages[newMessages.length - 1] = {
          ...newMessages[newMessages.length - 1],
          content: content,
        };
      }
      return { messages: newMessages };
    }),

  setMode: (mode) => set({ mode }),
  
  clearChat: () => set({ messages: [] })
}));