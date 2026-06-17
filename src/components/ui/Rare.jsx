import { Plane } from "lucide-react";

export default function WeekInRareSection() {
  return (
    <section className="w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
        {/* LEFT HALF — copy + two product shots */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-16">
          {/* Heading, intentionally bleeding past the left edge like the reference */}
          <div className="overflow-hidden -ml-10 sm:-ml-16 lg:-ml-20">
            <h2 className="whitespace-nowrap font-light tracking-tight text-neutral-800 text-[42px] sm:text-[56px] lg:text-[64px] leading-none">
              <span className="text-neutral-300">T</span>HE{" "}
              <span className="font-extrabold text-neutral-900">DETAILS</span> 
            </h2>
          </div>

          <p className="mt-3 ml-0 text-sm sm:text-base tracking-[0.25em] text-neutral-500 font-medium">
            #The difference is in what you don't notice.
          </p>

          {/* Two product images */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 max-w-xl">
            <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
              <img
                src="/Images/6.jpeg"
                alt="Model seated in an airport lounge wearing a casual shirt, beside a travel suitcase"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] overflow-hidden bg-neutral-100">
              <img
                src="/Images/8.png"
                alt="Model standing in an airport lounge wearing a polo shirt, holding a duffel bag"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* RIGHT HALF — full-bleed editorial shot */}
        <div className="relative min-h-[420px] lg:min-h-full bg-neutral-200">
          <img
            src="/Images/7.png"
            alt="Man in dark outfit walking through an airport terminal, shot in black and white"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}