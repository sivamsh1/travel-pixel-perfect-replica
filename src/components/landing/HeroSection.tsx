import React from 'react';
import { Button } from '@/components/ui/button';
import { Plane } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../ActionButton';
const HeroSection = () => {
  const navigate = useNavigate();
  const handleGetQuote = () => {
    navigate('/quote');
  };
  return <section className="bg-white py-10 md:py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[90px] text-[#2C2C2C] font-medium leading-[150%] text-center" style={{
        fontFamily: 'Jost, sans-serif'
      }}>
          Wherever you go<br />
          our coverage follows
        </h1>
        <p className="text-base text-gray-600 mb-6 md:mb-10 py-[20px] md:text-xl mt-[10px]">Instant setup. Global protection. Always by your side.</p>
        <div className="flex flex-col items-center relative z-10">
          <ActionButton onClick={handleGetQuote} className="bg-primary text-white px-6 py-4 md:px-8 md:py-6 rounded-md text-base md:text-lg font-medium hover:bg-primary/90 transition-colors w-full sm:w-auto">
            Get a Quote
          </ActionButton>
          <div className="flex items-center mt-4 md:mt-6 text-xs md:text-sm text-gray-700">
            <Plane className="h-3 w-3 md:h-4 md:w-4 text-primary mr-1 md:mr-2" />
            <span>Save 10% on your perfect travel plan!</span>
          </div>
        </div>
      </div>
      
      <div className="relative -mt-[40px]">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end">
          <div className="w-full md:w-1/3 px-0 mb-6 md:mb-0 my-[76px]">
            <img alt="Students with luggage" style={{
            maxHeight: "250px",
            marginLeft: "0",
            marginRight: "0"
          }} src="/lovable-uploads/e7261a77-698a-4ed6-9f14-9e1fcf87e111.png" className="h-auto w-auto object-contain" />
          </div>
          
          <div className="w-full md:w-1/3 text-center py-4 mb-6 md:mb-0">
            <p className="text-primary text-xl md:text-2xl font-semibold">Trusted by thousands of students</p>
            <p className="text-gray-600 text-sm md:text-base">We've got your academic journey covered</p>
          </div>
          
          <div className="w-full md:w-1/3 flex justify-center md:justify-end px-0">
            <img alt="Control tower and plane" style={{
            maxHeight: "250px",
            marginLeft: "0",
            marginRight: "0",
            marginBottom: "-12px"
          }} src="/lovable-uploads/dad2c164-0b3a-480e-8ae0-8f92d9e6e912.png" className="h-auto w-auto object-contain" />
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;