import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PianoScrollAnimation from '@/components/PianoScrollAnimation';
import AdvancedGuitarAnimation from '@/components/AdvancedGuitarAnimation';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import AboutSection from '@/components/AboutSection';
import WhyUsSection from '@/components/WhyUsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import { useState } from 'react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}
      <main className={`min-h-screen bg-background overflow-x-hidden ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Navbar />
        <HeroSection />
        <PianoScrollAnimation />
        <AdvancedGuitarAnimation />
        <ServicesSection />
        <PortfolioSection />
        <AboutSection />
        <WhyUsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
