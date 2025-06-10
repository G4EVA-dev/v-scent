"use client"
import { useState } from 'react'
import Link from 'next/link'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0  w-full bg-white shadow-md">
          <div className="flex flex-col p-4 my-5 ">
            <Link href="/" className="text-gray-700 hover:text-gray-900 py-2">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-900 py-2">
              About
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-gray-900 py-2">
              Products
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-gray-900 py-2">
              Contact
            </Link>
          </div>
        </div>
      )}
    </div>
  )
} 