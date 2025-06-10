"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import { ShoppingBagIcon } from "lucide-react"
import { getProducts } from "@/lib/products"
import HeroSection from "@/components/hero-section"
import ChatbotButton from "@/components/chatbot-button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useChatbot } from "@/hooks/use-chatbot"

export default async function Home() {
  const products = await getProducts()
  const featuredProducts = products.slice(0, 4)
  // const { openChatbot } = useChatbot()

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection />

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Perfumes</h2>
              <p className="text-muted-foreground mt-2 text-base sm:text-lg">
                Discover our handpicked selection of luxury fragrances
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/products">
                  View All <ShoppingBagIcon className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/products?sort=new">New Arrivals</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground mt-2 text-base sm:text-lg">Find the perfect scent for every occasion</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link href="/products?category=floral" className="group">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center transition-all hover:shadow-md">
                <div className="h-24 w-24 bg-pink-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <span className="text-pink-500 text-2xl">🌸</span>
                </div>
                <h3 className="font-medium text-lg">Floral</h3>
                <p className="text-muted-foreground text-sm mt-2">Elegant and timeless floral scents</p>
              </div>
            </Link>
            <Link href="/products?category=woody" className="group">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center transition-all hover:shadow-md">
                <div className="h-24 w-24 bg-amber-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <span className="text-amber-700 text-2xl">🪵</span>
                </div>
                <h3 className="font-medium text-lg">Woody</h3>
                <p className="text-muted-foreground text-sm mt-2">Rich and warm woody fragrances</p>
              </div>
            </Link>
            <Link href="/products?category=fresh" className="group">
              <div className="bg-white rounded-lg shadow-sm p-6 text-center transition-all hover:shadow-md">
                <div className="h-24 w-24 bg-blue-100 rounded-full mx-auto flex items-center justify-center mb-4">
                  <span className="text-blue-500 text-2xl">🌊</span>
                </div>
                <h3 className="font-medium text-lg">Fresh</h3>
                <p className="text-muted-foreground text-sm mt-2">Light and refreshing scents</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 sm:p-8 lg:p-12">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                Need help finding your perfect scent?
              </h2>
              <p className="text-base sm:text-lg mb-6">
                Our AI assistant can help you discover the perfect fragrance based on your preferences.
              </p>
              <Button size="lg" className="text-base px-8 py-3">
                Chat with our AI Assistant
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ChatbotButton />
    </main>
  )
}
