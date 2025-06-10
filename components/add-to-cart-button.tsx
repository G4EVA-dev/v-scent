"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/lib/store"
import type { Product } from "@/types"
import { toast } from "sonner"
import { useState } from "react"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  className?: string
}

export default function AddToCartButton({
  product,
  variant = "default",
  size = "default",
  className,
}: AddToCartButtonProps) {
  const { addItem, items, updateQuantity } = useCartStore()
  const [isAdding, setIsAdding] = useState(false)

  const existingItem = items.find((item) => item.productId === product.id)
  const quantity = existingItem?.quantity || 0

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    addItem(product)
    toast.success(`${product.name} added to cart!`, {
      description: `You now have ${quantity + 1} item${quantity + 1 > 1 ? "s" : ""} in your cart.`,
      action: {
        label: "View Cart",
        onClick: () => {
          // This would open cart sidebar
          console.log("Open cart")
        },
      },
    })

    setIsAdding(false)
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity)

    if (newQuantity === 0) {
      toast.success(`${product.name} removed from cart`)
    } else {
      toast.success(`Cart updated`, {
        description: `${product.name} quantity: ${newQuantity}`,
      })
    }
  }

  if (quantity > 0) {
    return (
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(quantity - 1)} className="h-8 w-8">
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center font-medium">{quantity}</span>
        <Button variant="outline" size="icon" onClick={() => handleUpdateQuantity(quantity + 1)} className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={className}
      disabled={isAdding || product.stock === 0}
    >
      {isAdding ? (
        <>
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          Adding...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </>
      )}
    </Button>
  )
}
