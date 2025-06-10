import { GoogleGenerativeAI } from "@google/generative-ai"
import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai"
import { getProducts } from "@/lib/products"
import { CHATBOT_CONFIG, generateSystemPrompt } from "@/lib/chatbot-config"
import type { Message } from "ai"

// Create a Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "")

// IMPORTANT! Set the runtime to edge
export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    
    // Get all products for context
    const products = await getProducts()
    
    // Create a system message with product context
    const systemPrompt = generateSystemPrompt(products)

    // Initialize the model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: CHATBOT_CONFIG.temperature,
        maxOutputTokens: CHATBOT_CONFIG.maxTokens,
      }
    })

    // Convert messages to Gemini format and incorporate system prompt
    const geminiMessages = messages.map((msg: Message, index: number) => {
      // For the first message, include the system prompt
      if (index === 0) {
        return {
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ 
            text: `${systemPrompt}\n\nUser: ${msg.content}` 
          }]
        }
      }
      return {
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      }
    })

    // Create the chat completion
    const response = await model.generateContentStream({
      contents: geminiMessages,
    })

    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(response)

    // Return a StreamingTextResponse, which can be consumed by the client
    return new StreamingTextResponse(stream)
  } catch (error: any) {
    console.error("Error in chat API:", error)
    
    // Handle specific error cases
    if (error.message?.includes("quota")) {
      return new Response(
        JSON.stringify({
          error: "We're currently experiencing high demand. Please try again later or contact our support team.",
          type: "quota_exceeded"
        }),
        { status: 429 }
      )
    }

    // Handle other API errors
    if (error.message?.includes("API")) {
      return new Response(
        JSON.stringify({
          error: "We're having trouble connecting to our AI service. Please try again later.",
          type: "api_error"
        }),
        { status: 500 }
      )
    }

    // Handle general errors
    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again later.",
        type: "general_error"
      }),
      { status: 500 }
    )
  }
}
