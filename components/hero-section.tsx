import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/products";

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await getProducts();
      // Filter out undefined images and get unique product images
      const uniqueImages = Array.from(
        new Set(
          products
            .map((product) => product.image)
            .filter((img): img is string => img !== undefined)
        )
      );
      setProductImages(uniqueImages);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (productImages.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) =>
          prevIndex === productImages.length - 1 ? 0 : prevIndex + 1
        );
        setIsTransitioning(false);
      }, 500); // Half second fade out
    }, 10000); // Change image every 35 seconds

    return () => clearInterval(interval);
  }, [productImages]);

  return (
    <section className="relative bg-gradient-to-r from-purple-50 to-pink-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center py-12 sm:py-16 lg:py-24 min-h-[600px]">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left max-w-xl lg:max-w-none">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight">
            Discover Your <span className="text-purple-600">Signature</span>{" "}
            Scent
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
            Explore our collection of luxury perfumes and find the perfect
            fragrance that tells your story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button size="lg" className="text-base px-8 py-3" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-3"
              asChild
            >
              <Link href="/products">Find Your Scent</Link>
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 relative flex justify-center lg:justify-end">
          <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
            {productImages.length > 0 ? (
              <Image
                src={productImages[currentImageIndex]}
                alt="Luxury perfume bottles"
                fill
                className={`object-contain transition-all duration-1000 ease-in-out ${
                  isTransitioning
                    ? "opacity-0 scale-95"
                    : "opacity-100 scale-100"
                }`}
                priority
              />
            ) : (
              <Image
                src="./products/product20.jpg"
                alt="Luxury perfume bottles"
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
