"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { useState, useEffect } from "react";

const tabs = [
  { id: "about", label: "About Us" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
  { id: "shipping", label: "Shipping & Returns" },
  { id: "care", label: "Care Guide" },
];

// ─── About Us ───────────────────────────────────────────────────────────────

function AboutSection() {
  return (
    <div id="about">
      <h1 className="font-nunito text-4xl md:text-5xl mb-2">About Us</h1>
      <p className="font-inter text-sm text-[#8A8A8A] mb-8">
        Modern essentials designed for everyday confidence.
      </p>

      <div className="mb-10">
        <img
          src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?fm=jpg&q=80&w=1600&auto=format&fit=crop"
          alt="Knotch clothing"
          className="w-full h-64 md:h-96 object-cover grayscale"
        />
      </div>

      <hr className="border-[#2B2B2B] mb-8" />

      <div className="space-y-6 max-w-2xl mb-10">
        <p className="font-inter font-light text-sm text-[#2B2B2B] leading-relaxed">
          Knotch was created with a simple vision — to make clothing that feels
          timeless, refined, and effortless to wear.
        </p>

        <p className="font-inter font-light text-sm text-[#2B2B2B] leading-relaxed">
          We focus on clean silhouettes, quality fabrics, and thoughtful
          detailing to create pieces that move seamlessly between everyday wear
          and elevated occasions.
        </p>

        <p className="font-inter font-light text-sm text-[#2B2B2B] leading-relaxed">
          Every garment is designed with comfort and versatility in mind,
          ensuring you feel confident whether you're dressing for work, casual
          outings, or special moments.
        </p>
      </div>

      <hr className="border-[#BFC3C7] mb-8" />

      <div className="grid grid-cols-3 gap-px bg-[#BFC3C7] mb-10">
        {[
          ["Premium", "Fabrics"],
          ["Modern", "Fits"],
          ["Timeless", "Design"],
        ].map(([num, label], i) => (
          <div key={i} className="bg-white px-4 py-6 text-center">
            <p className="font-nunito text-2xl md:text-3xl mb-1">{num}</p>
            <p className="font-inter text-xs text-[#8A8A8A] uppercase tracking-widest">
              {label}
            </p>
          </div>
        ))}
      </div>

      <hr className="border-[#BFC3C7] mb-8" />

      <p className="font-nunito text-xl mb-4">What we believe</p>
      <ul className="space-y-3 mb-10">
        {[
          "Good style begins with well-made essentials",
          "Comfort should never compromise sophistication",
          "Quality over excess, always",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-3 h-3 bg-black flex-shrink-0 mt-0.5" />
            <span className="font-inter font-light text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5">
        <p className="font-inter text-sm mb-1">A note from the team.</p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          Knotch is built by a small team passionate about creating elevated
          wardrobe staples that are made to be worn, loved, and lived in.
        </p>
      </div>
    </div>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    q: "How do I choose the right size?",
    a: "Each product page includes detailed measurements in our size chart. We recommend comparing them with a garment you already own for the best fit. If you're between sizes, size up for a more relaxed fit.",
  },
  {
    q: "Do you restock sold out products?",
    a: "Some styles may be restocked based on demand, while limited drops may not return. If a product is sold out, keep an eye on our website or follow us for restock updates.",
  },
  {
    q: "Can I exchange or return my order?",
    a: "We accept exchanges for size issues and returns only for damaged, defective, or incorrect items. The product must be unused, with tags intact, and reported within the eligible return window after delivery.",
  },
  {
    q: "How long will my order take to arrive?",
    a: "Orders are usually processed within 1–3 business days. Domestic delivery typically takes 3–7 business days depending on your location.",
  },
  {
    q: "Can I cancel my order after placing it?",
    a: "Orders can only be cancelled before they are shipped. Once dispatched, cancellations are not possible. Contact our support team as soon as possible if you need assistance.",
  },
  {
    q: "How can I track my order?",
    a: "Once your order is shipped, you will receive a tracking link via email or SMS. You can use it to monitor your shipment in real time.",
  },
  {
    q: "What if I receive a damaged product?",
    a: "If your order arrives damaged, defective, or incorrect, please contact us within 48 hours of delivery. An unedited, unpaused, continuous video of the complete unboxing—from opening the sealed package to fully showing the product—is mandatory for any damage or missing item claim. Claims submitted without a valid unboxing video may not be accepted. Please also share clear photos of the product and packaging so our team can assist you with a replacement or resolution.",
  },
  {
    q: "How should I care for my garments?",
    a: "Care instructions are mentioned on each product label. For best longevity, we recommend gentle washing, avoiding harsh detergents, and storing garments properly.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <div id="faq">
      <h1 className="font-nunito text-4xl md:text-5xl mb-2">FAQ</h1>
      <p className="font-inter text-sm text-[#8A8A8A] mb-8">
        Questions about keptalive, Collection I, and how it works.
      </p>
      <div className="border-t border-[#2B2B2B]">
        {faqItems.map((item, i) => (
          <div key={i} className="border-b border-[#2B2B2B]">
            <button
              className="w-full flex justify-between items-center py-5 text-left gap-4"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="font-inter text-sm">{item.q}</span>
              <span className="font-inter text-xl leading-none text-[#8A8A8A] flex-shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="pb-5">
                <p className="font-inter font-light text-sm text-[#2B2B2B] leading-relaxed max-w-2xl">
                  {item.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────
function ContactSection() {
  return (
    <div id="contact">
      <h1 className="font-nunito text-4xl md:text-5xl mb-2">Contact</h1>
      <p className="font-inter text-sm text-[#8A8A8A] mb-8">
        We read every message. We respond within 2 business days.
      </p>

      <hr className="border-[#2B2B2B] mb-8" />

      <div className="space-y-10">
        <div>
          <p className="font-inter text-xs text-[#8A8A8A] uppercase tracking-widest mb-2">
            General enquiries
          </p>
          <a
            href="mailto:knotch99@gmail.com"
            className="font-nunito text-2xl md:text-3xl border-b border-black pb-1 inline-block"
          >
            knotch99@gmail.com
          </a>
          <p className="font-inter font-light text-sm text-[#2B2B2B] mt-2">
            For orders, support, or general questions.
          </p>
        </div>

        <hr className="border-[#BFC3C7]" />

        <div>
          <p className="font-inter text-xs text-[#8A8A8A] uppercase tracking-widest mb-2">
            Call &amp; Whatsapp
          </p>
          <a
            href="https://wa.me/8983985787"
            className="font-nunito text-2xl md:text-3xl border-b border-black pb-1 inline-block"
          >
            +91 89839 85787
          </a>
          <p className="font-inter font-light text-sm text-[#2B2B2B] mt-2">
            Available Monday to Saturday, 10 AM – 7 PM.
          </p>
        </div>

        <hr className="border-[#BFC3C7]" />

        <div>
          <p className="font-inter text-xs text-[#8A8A8A] uppercase tracking-widest mb-2">
            Instagram 
          </p>
          <a
            href="https://instagram.com/knotch.co"
            className="font-nunito text-2xl md:text-3xl border-b border-black pb-1 inline-block"
          >
            knotch.co
          </a>
          <p className="font-inter font-light text-sm text-[#2B2B2B] mt-2">
            DM us for quick updates and assistance.
          </p>
        </div>
      </div>

      <hr className="border-[#BFC3C7] mt-10 mb-6" />

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5">
        <p className="font-inter text-sm mb-1">
          We respond within 2 business days.
        </p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          knotch is a small label. There is a real person on the other end of
          every email.
        </p>
      </div>
    </div>
  );
}

// ─── Shipping & Returns ───────────────────────────────────────────────────────

function ShippingSection() {
  return (
    <div id="shipping">
      <h1 className="font-nunito text-4xl md:text-5xl mb-2">
        Shipping &amp; Returns
      </h1>
      <p className="font-inter text-sm text-[#8A8A8A] mb-8">
        Everything you need to know about delivery, exchanges, and returns.
      </p>

      {/* Shipping */}
      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-3">
        Shipping
      </p>
      <hr className="border-[#2B2B2B] mb-0" />

      <table className="w-full font-inter text-sm">
        <tbody>
          {[
            ["Order processing", "1–3 business days"],
            ["Standard delivery", "3–7 business days"],
            ["Express delivery", "1–3 business days (where available)"],
            ["Shipping charges", "Calculated at checkout"],
          ].map(([label, value], i) => (
            <tr key={i} className="border-b border-[#BFC3C7]">
              <td className="py-4 pr-4">{label}</td>
              <td className="py-4 text-[#2B2B2B] font-light">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5 mt-4 mb-10">
        <p className="font-inter text-sm mb-1">
          Orders are dispatched after successful confirmation and payment.
        </p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          Tracking details will be shared once your order has been shipped.
        </p>
      </div>

      {/* Returns */}
      <hr className="border-[#2B2B2B] mb-6" />
      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-6">
        Returns & Exchanges
      </p>

      <p className="font-inter text-sm mb-3">
        We do not accept returns for change of mind.
      </p>
      <p className="font-inter font-light text-sm text-[#2B2B2B] mb-8">
        Exchanges are accepted only for size issues or if the product arrives
        damaged, defective, or incorrect. Items must be unused and returned with
        original tags and packaging intact.
      </p>

      <hr className="border-[#BFC3C7] mb-6" />

      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-4">
        We accept claims if:
      </p>

      <ul className="space-y-3 mb-6">
        {[
          "The product arrives damaged or defective",
          "You received the wrong item",
          "There is a genuine size issue (subject to availability)",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-3 h-3 bg-black flex-shrink-0 mt-0.5" />
            <span className="font-inter font-light text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <p className="font-inter font-light text-sm text-[#2B2B2B] mb-8">
        Claims must be raised within 48 hours of delivery.
      </p>

      <hr className="border-[#BFC3C7] mb-6" />

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5 mb-8">
        <p className="font-inter text-sm mb-1">
          Important for damage claims
        </p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          An unedited, unpaused continuous unboxing video from opening the sealed
          package to showing the product is mandatory for damaged, missing, or
          incorrect item claims.
        </p>
      </div>

      <hr className="border-[#BFC3C7] mb-6" />

      <p className="font-inter text-sm">
        For support:{" "}
        <a
          href="mailto:knotch99@gmail.com"
          className="border-b border-black pb-0.5"
        >
          knotch99@gmail.com
        </a>
      </p>
    </div>
  );
}

// ─── Care Guide ───────────────────────────────────────────────────────────────

function CareGuideSection() {
  return (
    <div id="care">
      <h1 className="font-nunito text-4xl md:text-5xl mb-2">Care Guide</h1>
      <p className="font-inter text-sm text-[#8A8A8A] mb-8">
        Simple care instructions to help your garments last longer.
      </p>

      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-3">
        Wash & Care
      </p>
      <hr className="border-[#2B2B2B] mb-0" />

      <table className="w-full font-inter text-sm">
        <tbody>
          {[
            ["Wash", "Machine wash cold with similar colours"],
            ["Bleach", "Do not bleach"],
            ["Drying", "Tumble dry low or line dry in shade"],
            ["Ironing", "Iron on low heat inside out"],
          ].map(([label, value], i) => (
            <tr key={i} className="border-b border-[#BFC3C7]">
              <td className="py-4 pr-4">{label}</td>
              <td className="py-4 text-[#2B2B2B] font-light">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5 mt-4 mb-10">
        <p className="font-inter text-sm mb-1">
          Care for your clothes, and they’ll care for your style.
        </p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          Proper washing and storage help preserve fit, colour, and fabric quality.
        </p>
      </div>

      <hr className="border-[#2B2B2B] mb-6" />

      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-6">
        Storage
      </p>

      <ul className="space-y-3 mb-8">
        {[
          "Store on hangers to maintain garment shape",
          "Keep away from direct sunlight to prevent fading",
          "Store in a cool, dry place",
          "Avoid overcrowding in wardrobes to prevent wrinkles",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-3 h-3 bg-black flex-shrink-0 mt-0.5" />
            <span className="font-inter font-light text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <hr className="border-[#BFC3C7] mb-6" />

      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-4">
        Stains & Spills
      </p>
      <p className="font-inter font-light text-sm text-[#2B2B2B] mb-8">
        Blot gently — do not rub. Treat stains as soon as possible and avoid
        harsh chemicals that may damage fabric or colour.
      </p>

      <hr className="border-[#BFC3C7] mb-6" />

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5 mb-8">
        <p className="font-inter text-sm mb-1">Still unsure?</p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          Our team is happy to help you with fabric care and garment maintenance.
        </p>
      </div>

      <hr className="border-[#BFC3C7] mb-6" />

      <p className="font-inter text-sm">
        Need help?{" "}
        <a
          href="mailto:knotch99@gmail.com"
          className="border-b border-black pb-0.5"
        >
          knotch99@gmail.com
        </a>
      </p>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HelpPage() {
  const [active, setActive] = useState("about");

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");

    if (
      hash &&
      ["about", "faq", "contact", "shipping", "care"].includes(hash)
    ) {
      setActive(hash);
    }
  }, []);

  const renderContent = () => {
    switch (active) {
      case "about":
        return <AboutSection />;
      case "faq":
        return <FAQSection />;
      case "contact":
        return <ContactSection />;
      case "shipping":
        return <ShippingSection />;
      case "care":
        return <CareGuideSection />;
      default:
        return <AboutSection />;
    }
  };

  const activeLabel = tabs.find((t) => t.id === active)?.label;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white text-black">
        {/* Breadcrumb */}
        <div className="border-b border-[#BFC3C7] px-6 md:px-12 py-3">
          <p className="font-inter text-xs text-[#8A8A8A]">
            Help <span className="mx-1 text-[#BFC3C7]">/</span>
            <span className="text-black">{activeLabel}</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row px-6 md:px-12 py-10 gap-10 max-w-[1440px] mx-auto">
          {/* Sidebar */}
          <aside className="w-full md:w-52 flex-shrink-0">
            <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-3">
              Help
            </p>
            <hr className="border-[#BFC3C7] mb-3" />
            <nav className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  id={`tab-${tab.id}`}
                  onClick={() => {
                    setActive(tab.id);
                    window.history.replaceState(null, "", `/Help#${tab.id}`);
                  }}
                  className={`font-inter text-sm text-left transition-all w-full ${
                    active === tab.id
                      ? "text-black border border-black md:border-0 md:border-l-2 px-3 py-2 md:px-0 md:pl-3 md:py-1.5"
                      : "text-[#8A8A8A] border border-[#D9D9D9] md:border-0 hover:text-black px-3 py-2 md:px-0 md:pl-3 md:py-1.5"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main id="help-content" className="flex-1 max-w-3xl">
            {renderContent()}
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
