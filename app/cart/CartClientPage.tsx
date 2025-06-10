"use client"
import { Button } from "@/components/ui/button"
import { Trash2, ShoppingBag, ArrowRight, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function CartClientPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()
  const subtotal = getTotalPrice()
  const shipping = subtotal >= 100000 ? 0 : 10000
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          <p className="text-muted-foreground mt-1">Review your selected fragrances</p>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Your Selection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.productId} className="py-6 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-6">
                        <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium text-lg">{item.product.name}</h3>
                              <p className="text-sm text-muted-foreground">50ml</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive"
                              onClick={() => removeItem(item.productId)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              >
                                -
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              >
                                +
                              </Button>
                            </div>
                            <span className="font-medium text-lg">{formatPrice(item.product.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  <div className="pt-4 border-t flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-lg">{formatPrice(total)}</span>
                  </div>
                </div>

                  <Link href="/checkout" >
                  <Button className="w-full" size="lg">
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                  </Link>
                

                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Free Shipping</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Free shipping on orders over 100,000 FCFA
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <Card className="max-w-md mx-auto">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added any fragrances to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
