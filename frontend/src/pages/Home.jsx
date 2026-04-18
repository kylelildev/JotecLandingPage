import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import ProductGrid from "@/components/ProductGrid";
import CompareSection from "@/components/CompareSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div data-testid="home-page" className="bg-black text-white min-h-screen">
      <Navbar />
      <Hero />
      <ProductGrid />
      <ProductShowcase />
      <CompareSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
