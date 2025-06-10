"use client"

import { Button } from "@/components/ui/button"
import { MessageSquare, X, Bot } from "lucide-react"
import Chatbot from "@/components/chatbot"
import { cn } from "@/lib/utils"
import { useChatbot } from "@/hooks/use-chatbot"

export default function ChatbotButton() {
  const { isOpen, openChatbot, closeChatbot } = useChatbot()

  return (
    <>
      {isOpen ? (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-background rounded-lg shadow-lg flex flex-col z-50 border animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-medium">V-Scent Aura Assistant</h3>
            </div>
            <Button
              onClick={closeChatbot}
              className="hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Chatbot />
          </div>
        </div>
      ) : (
        <Button
          className={cn(
            "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg",
            "bg-primary hover:bg-primary/90 text-primary-foreground",
            "transition-all duration-200 ease-in-out",
            "hover:scale-105 active:scale-95"
          )}
          onClick={openChatbot}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
    </>
  )
}
