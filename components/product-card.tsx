import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import AddToCartButton from "@/components/add-to-cart-button"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md group">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative bg-gray-50">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4 sm:p-5 md:p-6">
        <div className="space-y-1.5">
          <h3 className="font-medium text-base sm:text-lg truncate">{product.name}</h3>
          <p className="text-sm sm:text-base text-muted-foreground">{product.category}</p>
        </div>
        <div className="mt-3 sm:mt-4 flex items-center justify-between">
          <span className="font-medium text-base sm:text-lg">{formatPrice(product.price)}</span>
          {product.rating && (
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm sm:text-base">{product.rating}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 sm:p-5 md:p-6 pt-0">
        <AddToCartButton product={product} className="w-full" size="sm" />
      </CardFooter>
    </Card>
  )
}
