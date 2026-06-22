import { Geist, Geist_Mono } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Knotch | Premium Fashion for Men",
  description:
    "Discover premium fashion at Knotch. Shop trendy clothing, stylish essentials, and curated collections for men and women with seamless online shopping.",
  keywords: [
    "Knotch",
    "fashion",
    "online clothing store",
    "men fashion",
    "streetwear",
    "premium clothing",
    "fashion ecommerce",
    "trendy outfits",
  ],
  metadataBase: new URL("https://www.knotch.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Knotch | Premium Fashion for Men",
    description:
      "Explore the latest fashion collections at Knotch. Shop premium clothing and elevate your style.",
    url: "https://www.knotch.in",
    siteName: "Knotch",
    images: [
      {
        url: "/Images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Knotch Fashion",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Knotch | Premium Fashion for Men",
    description:
      "Explore the latest fashion collections at Knotch.",
    images: ["/Images/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="top-right" />
        <CartProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            {children}
          </GoogleOAuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
