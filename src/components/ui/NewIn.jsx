'use client';

import Link from 'next/link';

export default function FeaturedCollection() {
  return (
    <section className="bg-white">
      <div className="grid md:grid-cols-2 min-h-150">
        {/* Left - Image */}
        <div className="relative h-100 md:h-auto order-2 md:order-1">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('/Images/6.jpeg')`,
            }}
          >
            {/* Optional overlay for better text readability if needed */}
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>

        {/* Right - Content */}
        <div className="flex items-center justify-center px-8 md:px-16 py-16 md:py-20 order-1 md:order-2">
          <div className="max-w-xl">
            {/* Subtitle */}
            <p className="text-xs md:text-sm uppercase tracking-widest text-gray-600 mb-4">
              OUR NEWEST COLLECTION
            </p>

            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight text-slate-900">
              MIDNIGHT BLOOM
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
              Our Spring 2026 collection has arrived. Midnight Bloom draws inspiration from 
              moonlit gardens, where elegance meets mystique, and every detail whispers timeless 
              sophistication. Expect flowing silhouettes, rich textures, and intricate embellishments 
              designed for life's most enchanting moments.
            </p>

            <p className="text-base md:text-lg text-gray-700 mb-8 leading-relaxed">
              From evening soirées to intimate gatherings, these are the pieces you'll treasure 
              season after season.
            </p>

            {/* CTA Button */}
            <Link
              href="/products/type/new-arrivals"
              className="inline-block px-8 py-3 border-2 border-black text-black text-sm uppercase tracking-wider font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              Discover Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}