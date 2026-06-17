'use client';

import Link from 'next/link';

const editorialCards = [
  {
    id: 1,
    image: '/Images/1.jpeg',
    title: 'LOOKBOOK',
    description: 'Discover our latest Spring \'26 collection in the heart of Santorini, where timeless elegance meets modern sophistication.',
    link: '/lookbook',
  },
  {
    id: 2,
    image: '/Images/6.jpeg',
    title: 'JOURNAL',
    description: 'Take a look behind the scenes at Isabella. From concept to creation and everything in between.',
    link: '/Journal',
  },
  {
    id: 3,
    image: '/Images/5.jpeg',
    title: 'WHO WE ARE',
    description: 'Learn more about our journey, our dreams and aspirations.',
    link: '/about',
  },
];

export default function EditorialSection() {
 return (
    <section className="pt-16 pb-2 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {editorialCards.map((card) => (
            <Link
              key={card.id}
              href={card.link}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-4/5 mb-6 overflow-hidden rounded-2xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
              </div>

              {/* Title */}
              <h3
                className="text-[clamp(1.1rem,2vw,1.4rem)] font-bold text-black tracking-wide text-center mb-3"
                style={{ fontFamily: "'The Seasons', serif" }}
              >
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-[0.82rem] font-light text-[#2B2B2B] text-center leading-relaxed tracking-wide px-2">
                {card.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}