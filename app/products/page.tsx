import { getProducts, getProductsByCategory } from "@/lib/products"
import ProductCard from "@/components/product-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shop All Perfumes",
  description: "Browse our collection of luxury perfumes and find your signature scent.",
}

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    sort?: string
  }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  // Await searchParams before using its properties
  const params = await searchParams
  
  // Get products based on category filter
  const products = params.category 
    ? await getProductsByCategory(params.category) 
    : await getProducts()

  // Sort products based on sort parameter
  const sortedProducts = [...products].sort((a, b) => {
    const sortType = params.sort || "featured"
    
    switch (sortType) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      default:
        return 0 // Default sort or "featured" sort
    }
  })

  const categoryTitle = params.category 
    ? `${params.category.charAt(0).toUpperCase() + params.category.slice(1)} Perfumes` 
    : "All Perfumes"

  return (
    <main className="flex min-h-screen flex-col">
      <section className="w-full bg-gradient-to-r from-purple-50 to-pink-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">{categoryTitle}</h1>
            <p className="text-lg text-muted-foreground">
              Discover our collection of luxury fragrances
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <p className="text-muted-foreground">{sortedProducts.length} products found</p>
          </div>

          <div className="w-full lg:w-auto">
            <select 
              className="w-full lg:w-auto min-w-[200px] p-2 border rounded-md bg-white shadow-sm hover:shadow-md transition-shadow" 
              defaultValue={params.sort || "featured"}
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  )
}