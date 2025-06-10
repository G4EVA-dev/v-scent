export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  rating?: number
  stock: number
  featured?: boolean
  notes?: string[]
}

export interface CartItem {
  productId: string
  quantity: number
  product: Product
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  createdAt: Date
}
