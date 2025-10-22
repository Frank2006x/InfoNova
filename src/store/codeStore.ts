import { create } from "zustand";

export const useCodeStore = create<{
  code: string;
  language: string;
  setCode: (code: string) => void;
  setLanguage: (language: string) => void;
}>((set) => ({
  code: "",
  language: "",
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
}));

