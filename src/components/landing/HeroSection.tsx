
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetQuote = () => {
    navigate('/quote');
  };

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 
          className="text-[90px] text-[#2C2C2C] font-medium leading-[120%] text-center"
          style={{ fontFamily: 'Jost, sans-serif' }}
        >
          Wherever you go<br />
          our coverage follows
        </h1>
        <p className="text-xl text-gray-600 mb-10">Instant setup. Global protection. Always by your side.</p>
        <div className="flex flex-col items-center">
          <Button 
            onClick={handleGetQuote}
            className="bg-primary text-white px-8 py-6 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Get a Quote
          </Button>
          <div className="flex items-center mt-6 text-sm text-gray-700">
            <Plane className="h-4 w-4 text-primary mr-2" />
            <span>Save 10% on your perfect travel plan!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

