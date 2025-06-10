"use client"

import { useChat } from "ai/react"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SendIcon, Loader2, Bot, User, AlertCircle } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Message } from "ai"

export default function Chatbot() {
  const [error, setError] = useState<string | null>(null)
  
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: "Hello! I'm your V-Scent Aura assistant. I can help you find your perfect fragrance, answer questions about our products, or assist with your order. What would you like to know?",
      },
    ],
    onError: (error) => {
      const errorData = error as { type?: string; error?: string }
      if (errorData.type === 'quota_exceeded') {
        setError("We're currently experiencing high demand. Please try again later or contact our support team.")
      } else if (errorData.type === 'api_error') {
        setError("We're having trouble connecting to our AI service. Please try again later.")
      } else {
        setError("Something went wrong. Please try again later.")
      }
    },
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Clear error when user starts typing
  useEffect(() => {
    if (input) {
      setError(null)
    }
  }, [input])

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div
              className={cn(
                "flex max-w-[80%]",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              {message.role === "assistant" && (
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "rounded-lg p-3 text-sm",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <Avatar className="h-8 w-8 ml-2">
                  <AvatarFallback className="bg-muted">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%]">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-3 bg-muted flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        {error && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%]">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-destructive text-destructive-foreground">
                  <AlertCircle className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-3 bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about perfumes, scents, or recommendations..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="shrink-0"
          >
            <SendIcon className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
