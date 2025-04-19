
import React from 'react';
import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import CoverageSection from '@/components/landing/CoverageSection';
import PolicyCoverageSection from '@/components/landing/PolicyCoverageSection';
import CoverageLimitsSection from '@/components/landing/CoverageLimitsSection';
import WhySection from '@/components/landing/WhySection';
import Footer from '@/components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <CoverageSection />
      <PolicyCoverageSection />
      <CoverageLimitsSection />
      <WhySection />
      <Footer />
    </div>
  );
};

export default LandingPage;
