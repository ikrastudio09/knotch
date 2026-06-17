import "./globals.css";
import NavbarComponent from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/ui/HeroSection";
import CollectionsSection from "@/components/ui/Collection";
import FeaturedCollection from "@/components/ui/NewIn";
import EditorialSection from "@/components/ui/EditorialSection";
import ProductShowcaseSection from "@/components/ui/SingleCarousel";
import FeaturesSection from "@/components/ui/Styles";
import CategorySection from "@/components/ui/Caregories";
import ProductGrid from "@/components/ui/Product";
import ProductGrid1 from "@/components/ui/Product1";
import WeekInRareSection from "@/components/ui/Rare";

export const metadata = {
  title: "Knotch",
  description: "Premium Fashion",
};

export default function RootLayout({ children }) {
  return (
      <> 
        <NavbarComponent />
        <HeroCarousel/>
        <WeekInRareSection/>
        <ProductGrid1/>
        <CategorySection/>
        <ProductGrid/>  
        <FeaturesSection/>
        <Footer/>
        {children} 
      </> 
  );
}
