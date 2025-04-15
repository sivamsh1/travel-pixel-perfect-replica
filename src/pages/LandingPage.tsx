
import React from 'react';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import CoverageSection from '@/components/landing/CoverageSection';
import ExclusionsSection from '@/components/landing/ExclusionsSection';
import InfoSection from '@/components/landing/InfoSection';
import TypesSection from '@/components/landing/TypesSection';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <CoverageSection />
      <ExclusionsSection />
      <InfoSection />
      <TypesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
