"use client"
import type { Metadata } from "next"
import Image from "next/image"
import Text3DAnimation from "@/components/3d-text-animation"

// export const metadata: Metadata = {
//   title: "About Us",
//   description: "Learn about V-Scent Aura and our passion for luxury perfumes.",
// }

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Our Story</h1>
            <p className="text-lg text-muted-foreground">
              Discover the passion and craftsmanship behind V-Scent Aura's luxury perfumes.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Our Journey</h2>
            <p className="text-muted-foreground mb-4">
              V-Scent Aura was founded in 2020 with a simple mission: to create exceptional fragrances that tell a story
              and evoke emotions. Our founder, a perfume enthusiast with a background in chemistry, started
              experimenting with scent combinations in a small studio.
            </p>
            <p className="text-muted-foreground mb-4">
              What began as a passion project quickly grew into a beloved brand known for its unique and captivating
              fragrances. Today, V-Scent Aura offers a curated collection of perfumes that blend traditional
              craftsmanship with modern innovation.
            </p>
            <p className="text-muted-foreground">
              Each V-Scent Aura perfume is carefully crafted using the finest ingredients sourced from around the world,
              ensuring a luxurious experience that lasts throughout the day.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Text3DAnimation />
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              At V-Scent Aura, we're guided by our commitment to quality, sustainability, and the art of perfumery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">✨</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Quality</h3>
              <p className="text-muted-foreground">
                We use only the finest ingredients and maintain strict quality control throughout our production
                process.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">🌱</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Sustainability</h3>
              <p className="text-muted-foreground">
                We're committed to sustainable practices and ethical sourcing of our ingredients.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">🎨</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Artistry</h3>
              <p className="text-muted-foreground">
                Each fragrance is a work of art, carefully composed to create a unique olfactory experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">Meet Our Team</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our passionate team of perfumers, designers, and customer service specialists work together to bring you the
            best fragrance experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative h-32 w-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=128&width=128" alt="Sarah Johnson" fill className="object-cover" />
              </div>
              <h3 className="text-lg font-medium">Sarah Johnson</h3>
              <p className="text-muted-foreground">Founder & Master Perfumer</p>
            </div>
            <div className="text-center">
              <div className="relative h-32 w-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=128&width=128" alt="Michael Chen" fill className="object-cover" />
              </div>
              <h3 className="text-lg font-medium">Michael Chen</h3>
              <p className="text-muted-foreground">Creative Director</p>
            </div>
            <div className="text-center">
              <div className="relative h-32 w-32 mx-auto mb-4 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=128&width=128" alt="Emma Rodriguez" fill className="object-cover" />
              </div>
              <h3 className="text-lg font-medium">Emma Rodriguez</h3>
              <p className="text-muted-foreground">Head of Customer Experience</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
