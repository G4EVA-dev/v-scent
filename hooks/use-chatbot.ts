import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ChatbotStore {
  isOpen: boolean
  openChatbot: () => void
  closeChatbot: () => void
}

export const useChatbot = create<ChatbotStore>()(
  persist(
    (set) => ({
      isOpen: false,
      openChatbot: () => set({ isOpen: true }),
      closeChatbot: () => set({ isOpen: false }),
    }),
    {
      name: 'chatbot-storage',
    }
  )
) 