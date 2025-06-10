"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import { useCartStore } from "@/lib/store"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"

export default function CartDropdown() {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCartStore()
  const totalItems = getTotalItems()
  const totalPrice = getTotalPrice()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {totalItems > 99 ? "99+" : totalItems}
            </Badge>
          )}
          <span className="sr-only">Cart</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="p-4 border-b">
          <h3 className="font-medium">Shopping Cart</h3>
          <p className="text-sm text-muted-foreground">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="p-6 text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button asChild className="w-full">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="p-4 border-b last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="relative h-12 w-12 bg-gray-50 rounded">
                      <Image
                        src={item.product.image || "/placeholder.svg?height=48&width=48"}
                        alt={item.product.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">{formatPrice(item.product.price)}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total: {formatPrice(totalPrice)}</span>
              </div>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/cart">View Cart</Link>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
