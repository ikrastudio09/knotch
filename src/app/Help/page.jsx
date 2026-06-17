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
        Why keptalive makes one of everything, and never again.
      </p>

      <div className="mb-10">
        <img
          src="https://images.unsplash.com/photo-1751903051548-9fa34fbcfd89?fm=jpg&q=80&w=1600&auto=format&fit=crop"
          alt="Garments hanging on a rack"
          className="w-full h-64 md:h-96 object-cover grayscale"
        />
      </div>

      <hr className="border-[#2B2B2B] mb-8" />

      <div className="space-y-6 max-w-2xl mb-10">
        <p className="font-inter font-light text-sm text-[#2B2B2B] leading-relaxed">
          keptalive started with a simple frustration: too many clothes, made
          too fast, kept by no one. We wanted to make the opposite — fewer
          pieces, made once, kept for good.
        </p>
        <p className="font-inter font-light text-sm text-[#2B2B2B] leading-relaxed">
          Every collection we release is finite. Each piece is numbered at the
          moment it's made, recorded on a certificate of authenticity, and sewn
          into the garment itself. When a collection closes, it closes for good
          — no reprints, no restocks, no second batch.
        </p>
        <p className="font-inter font-light text-sm text-[#2B2B2B] leading-relaxed">
          We're a small team. We design, produce, and pack every piece
          ourselves, which is part of why we can promise that what you receive
          is exactly what we said it would be — numbered, limited, and
          permanent.
        </p>
      </div>

      <hr className="border-[#BFC3C7] mb-8" />

      <div className="grid grid-cols-3 gap-px bg-[#BFC3C7] mb-10">
        {[
          ["150", "Pieces per collection"],
          ["1", "Made once, ever"],
          ["0", "Restocks"],
        ].map(([num, label], i) => (
          <div key={i} className="bg-white px-4 py-6 text-center">
            <p className="font-nunito text-3xl mb-1">{num}</p>
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
          "Scarcity should be honest — once it's gone, it's actually gone",
          "A number on a garment is a promise, not a marketing gimmick",
          "Fewer, better pieces beat constant new drops",
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
          keptalive is small on purpose. Every piece, every number, every
          certificate is decided by a small team who believe in fewer things,
          made well, and kept.
        </p>
      </div>
    </div>
  );
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
const faqItems = [
  {
    q: "How are pieces numbered?",
    a: "Each piece in our collection is assigned a unique number at the time of production. This number is printed on your certificate of authenticity and sewn into the garment. No two pieces share the same number.",
  },
  {
    q: "Are the pieces limited?",
    a: "Yes. Every piece is made once and never restocked. When an collection closes, those pieces are permanently unavailable. This is intentional — scarcity is part of the collection's value.",
  },
  {
    q: "Can I return a piece?",
    a: "We do not accept returns for change of mind. Each piece is a permanent record. Returns are accepted only if the piece arrives damaged, defective, or is not the piece you ordered. Contact us within 48 hours of delivery.",
  },
  {
    q: "Will sold out pieces be restocked?",
    a: "No. Once a piece sells out, it is gone. This is by design — keptalive does not restock, reproduce, or reissue any piece from any collection.",
  },
  {
    q: "When will collection II be available?",
    a: "collection II is currently in development. We do not have an exact date yet. Follow us or sign up to be notified when it opens.",
  },
  {
    q: "What comes with my order?",
    a: "Every order includes the piece, a numbered certificate of authenticity, and our standard packaging. The certificate is the permanent record of your piece and its collection number — keep it safe.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes. International shipping is available and calculated at checkout. Delivery takes 7–14 business days. International orders are subject to local customs and import duties, which are the responsibility of the buyer.",
  },
  {
    q: "How do I know my size?",
    a: "Refer to our Sizing Guide in the Help section. Each product page also includes specific measurements for that piece. When in doubt, contact us at hello@keptalive.com.",
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
            href="mailto:hello@keptalive.com"
            className="font-nunito text-2xl md:text-3xl border-b border-black pb-1 inline-block"
          >
            hello@keptalive.com
          </a>
          <p className="font-inter font-light text-sm text-[#2B2B2B] mt-2">
            For questions about orders, pieces, or anything else.
          </p>
        </div>

        <hr className="border-[#BFC3C7]" />

        <div>
          <p className="font-inter text-xs text-[#8A8A8A] uppercase tracking-widest mb-2">
            Press &amp; editorial
          </p>
          <a
            href="mailto:press@keptalive.com"
            className="font-nunito text-2xl md:text-3xl border-b border-black pb-1 inline-block"
          >
            press@keptalive.com
          </a>
          <p className="font-inter font-light text-sm text-[#2B2B2B] mt-2">
            For media requests, editorial features, and collaborations.
          </p>
        </div>

        <hr className="border-[#BFC3C7]" />

        <div>
          <p className="font-inter text-xs text-[#8A8A8A] uppercase tracking-widest mb-2">
            Stockist &amp; trade
          </p>
          <a
            href="mailto:trade@keptalive.com"
            className="font-nunito text-2xl md:text-3xl border-b border-black pb-1 inline-block"
          >
            trade@keptalive.com
          </a>
          <p className="font-inter font-light text-sm text-[#2B2B2B] mt-2">
            For wholesale, stockist, or trade enquiries.
          </p>
        </div>
      </div>

      <hr className="border-[#BFC3C7] mt-10 mb-6" />

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5">
        <p className="font-inter text-sm mb-1">
          We respond within 2 business days.
        </p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          keptalive is a small label. There is a real person on the other end of
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
        Everything you need to know before and after your order.
      </p>

      {/* Shipping */}
      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-3">
        Shipping
      </p>
      <hr className="border-[#2B2B2B] mb-0" />
      <table className="w-full font-inter text-sm">
        <tbody>
          {[
            ["Standard delivery", "5–7 business days · ₹ 299"],
            ["Express delivery", "2–3 business days · ₹ 599"],
            ["International", "7–14 business days · Calculated at checkout"],
            ["Free shipping", "On all orders over ₹ 5,000"],
          ].map(([label, value], i) => (
            <tr key={i} className="border-b border-[#BFC3C7]">
              <td className="py-4 pr-4 font-inter">{label}</td>
              <td className="py-4 text-[#2B2B2B] font-light">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5 mt-4 mb-10">
        <p className="font-inter text-sm mb-1">
          Orders are dispatched within 2–3 business days.
        </p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          You will receive a tracking number once your order has been shipped.
        </p>
      </div>

      {/* Returns */}
      <hr className="border-[#2B2B2B] mb-6" />
      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-6">
        Returns
      </p>

      <p className="font-inter text-sm mb-3">
        Because each piece is numbered and final, we have a strict returns
        policy.
      </p>
      <p className="font-inter font-light text-sm text-[#2B2B2B] mb-8">
        We do not accept returns for change of mind. Each piece is a permanent
        record — once it leaves our hands and enters yours, it is yours.
      </p>

      <hr className="border-[#BFC3C7] mb-6" />

      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-4">
        We will accept a return if:
      </p>
      <ul className="space-y-3 mb-6">
        {[
          "The piece arrives damaged or defective",
          "You received the wrong piece",
          "The piece does not match its description",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-3 h-3 bg-black flex-shrink-0 mt-0.5" />
            <span className="font-inter font-light text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <p className="font-inter font-light text-sm text-[#2B2B2B] mb-8">
        Contact us within 48 hours of delivery with your order number and
        photos.
      </p>

      <hr className="border-[#BFC3C7] mb-6" />

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5 mb-8">
        <p className="font-inter text-sm mb-1">
          Your certificate of authenticity.
        </p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          Every piece comes with a numbered certificate. Keep it safe — it is
          the permanent record of your piece and its collection number.
        </p>
      </div>

      <hr className="border-[#BFC3C7] mb-6" />

      <p className="font-inter text-sm">
        To initiate a return:{" "}
        <a
          href="mailto:hello@keptalive.com"
          className="border-b border-black pb-0.5"
        >
          hello@keptalive.com
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
        How to keep your piece in its original condition for years.
      </p>

      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-3">
        Washing
      </p>
      <hr className="border-[#2B2B2B] mb-0" />
      <table className="w-full font-inter text-sm">
        <tbody>
          {[
            ["Wash", "Cold, gentle cycle · inside out"],
            ["Detergent", "Mild, no bleach or fabric softener"],
            ["Drying", "Lay flat to dry · avoid direct sun"],
            ["Ironing", "Low heat · steam only, no direct contact"],
          ].map(([label, value], i) => (
            <tr key={i} className="border-b border-[#BFC3C7]">
              <td className="py-4 pr-4 font-inter">{label}</td>
              <td className="py-4 text-[#2B2B2B] font-light">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5 mt-4 mb-10">
        <p className="font-inter text-sm mb-1">Every piece is made once.</p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          There is no reprint. Treat it accordingly.
        </p>
      </div>

      <hr className="border-[#2B2B2B] mb-6" />
      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-6">
        Storage
      </p>
      <ul className="space-y-3 mb-8">
        {[
          "Store on a wide hanger to keep the shoulder shape",
          "Keep away from direct sunlight to prevent fading",
          "Use breathable garment bags, not plastic",
          "Avoid folding for long periods — creases can set permanently",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="w-3 h-3 bg-black flex-shrink-0 mt-0.5" />
            <span className="font-inter font-light text-sm">{item}</span>
          </li>
        ))}
      </ul>

      <hr className="border-[#BFC3C7] mb-6" />

      <p className="font-inter text-xs uppercase tracking-widest text-[#8A8A8A] mb-4">
        Repairs &amp; alterations
      </p>
      <p className="font-inter font-light text-sm text-[#2B2B2B] mb-8">
        For minor repairs, we recommend a trusted local tailor. For anything
        affecting the piece's numbered authenticity, contact us first.
      </p>

      <hr className="border-[#BFC3C7] mb-6" />

      <div className="bg-[#F5F5F3] border border-[#BFC3C7] px-6 py-5 mb-8">
        <p className="font-inter text-sm mb-1">Stains and spills.</p>
        <p className="font-inter font-light text-sm text-[#8A8A8A]">
          Blot, don't rub. Treat fresh stains as soon as possible and avoid
          harsh spot removers on delicate fabrics.
        </p>
      </div>

      <hr className="border-[#BFC3C7] mb-6" />

      <p className="font-inter text-sm">
        Questions about caring for your piece:{" "}
        <a
          href="mailto:hello@keptalive.com"
          className="border-b border-black pb-0.5"
        >
          hello@keptalive.com
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
