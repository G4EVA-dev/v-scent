import { getProductById, getProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Heart, Share2 } from "lucide-react"
import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import AddToCartButton from "@/components/add-to-cart-button"
import { formatPrice } from "@/lib/utils"

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: product.name,
    description: product.description,
  }
}

export async function generateStaticParams() {
  const products = await getProducts()

  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.image || "/placeholder.svg?height=600&width=600"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-muted-foreground mt-2">{product.category}</p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-lg ${i < Math.floor(product.rating || 0) ? "text-yellow-500" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>
            {product.rating && (
              <span className="text-sm text-muted-foreground">
                {product.rating} ({Math.floor(Math.random() * 100) + 10} reviews)
              </span>
            )}
          </div>

          <div className="text-2xl font-bold">{formatPrice(product.price)}</div>

          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">Availability</h3>
            <p className={`${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <AddToCartButton product={product} size="lg" className="flex-1" />
            <Button size="lg" variant="outline" className="flex-1">
              <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
            </Button>
          </div>

          <div className="flex items-center space-x-4 pt-4 border-t">
            <Button variant="ghost" size="sm">
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
