import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import GuitarScrollAnimation from '@/components/GuitarScrollAnimation';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import AboutSection from '@/components/AboutSection';
import WhyUsSection from '@/components/WhyUsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <GuitarScrollAnimation />
      <ServicesSection />
      <PortfolioSection />
      <AboutSection />
      <WhyUsSection />
      <ContactSection />
      <Footer />
    </main>
  );
};

export default Index;
