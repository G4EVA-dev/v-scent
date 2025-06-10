"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/sonner"
import ChatbotButton from "@/components/chatbot-button"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <CartProvider>
        {children}
        <Toaster />
        <ChatbotButton />
      </CartProvider>
    </ThemeProvider>
  )
} 