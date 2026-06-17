"use client";

const categories = [
  {
    name: "SHIRTS",
    image:
      "/Images/9.png",
  },
  {
    name: "TEES",
    image:
      "/Images/10.png",
  },
  {
    name: "BOTTOMS",
    image:
      "/Images/11.png",
  },
  {
    name: "WARDROBE",
    image:
      "/Images/12.png",
  },
  // {
  //   name: "T-SHIRTS",
  //   href: "/collections/t-shirts",
  //   image:
  //     "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  // },
  // {
  //   name: "CO-ORDS",
  //   href: "/collections/co-ords",
  //   image:
  //     "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
  // },
];

// ── Hero image — swap this for your own brand shot ──────────────────────────
const HERO_IMAGE =
  "/Images/4.jpeg";

export default function CategorySection() {
  return (
    <section className="w-full bg-white">
      {/* ── Hero Banner — full-bleed image only ── */}
      <div className="relative w-full h-[90vh] min-h-[420px] max-h-[700px] overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="New collection"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      </div>

      {/* ── Category Grid ── */}
      <div className="w-full">
        {/* Row 1 — 4 cols desktop / 2 cols mobile */}
        <div className="grid grid-cols-2 md:grid-cols-4">
          {categories.slice(0, 4).map((cat) => (
            <CategoryCard key={cat.name} cat={cat} />
          ))}
        </div>

        {/* Row 2 — 2 cols full width */}
        <div className="grid grid-cols-2">
          {categories.slice(4).map((cat) => (
            <CategoryCard key={cat.name} cat={cat} tall />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, tall = false }) {
  return (
    <div
      className={`relative group overflow-hidden block ${
        tall
          ? "h-[55vw] md:h-[42vw] max-h-[560px]"
          : "h-[44vw] md:h-[28vw] max-h-[380px]"
      }`}
    >
      <img
        src={cat.image}
        alt={cat.name}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Label */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
        <span
          className="text-white text-sm md:text-base lg:text-lg font-semibold uppercase tracking-widest"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {cat.name}
        </span>
      </div>

      {/* Bottom hover line */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
    </div>
  );
}