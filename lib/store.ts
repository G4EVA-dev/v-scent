import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Product, CartItem, User } from "@/types"

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product, quantity = 1) => {
        const items = get().items
        const existingItem = items.find((item) => item.productId === product.id)

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item,
            ),
          })
        } else {
          set({
            items: [...items, { productId: product.id, quantity, product }],
          })
        }
      },
      removeItem: (productId: string) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        })
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + item.product.price * item.quantity, 0),
    }),
    {
      name: "cart-storage",
    },
  ),
)

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user: User) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    },
  ),
)
