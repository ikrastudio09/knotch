"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    image: "/Images/1.jpeg",
    mobileImage: "/Images/1_m.png",
    title: "New Collection",
    subtitle: "Spring/Summer 2024",
    description: "Discover the latest trends in fashion",
    buttonText: "Shop Now",
    buttonLink: "/products/type/new-arrivals",
  },
  {
    id: 2,
    mobileImage: "/Images/2_m.jpeg",
    image: "/Images/2.jpeg",
    title: "Exclusive Designs",
    subtitle: "Limited Edition",
    description: "Elevate your style with our curated pieces",
    buttonText: "Explore",
    buttonLink: "/products/type/trending",
  },
  {
    id: 3,
    mobileImage: "/Images/3_m.png",
    image: "/Images/3.jpeg",
    title: "Timeless Elegance",
    subtitle: "Classic Collection",
    description: "Where sophistication meets comfort",
    buttonText: "View Collection",
    buttonLink: "/products",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 1000);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <Link
          href={slide.buttonLink}
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide
              ? "opacity-100"
              : "opacity-0 pointer-events-none z-0"
          }`}
        >
          <div className="absolute inset-0">
            {/* Desktop Image */}
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover hidden md:block"
              sizes="100vw"
            />

            {/* Mobile Image */}
            <Image
              src={slide.mobileImage}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover md:hidden"
              sizes="100vw"
            />
          </div>{" "}
        </Link>
      ))}

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
