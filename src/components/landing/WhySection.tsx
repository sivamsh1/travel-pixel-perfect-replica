import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
const WhySection = () => {
  const navigate = useNavigate();
  const handleGetQuote = () => {
    navigate('/quote');
  };
  return <section className="relative">
      <img alt="Student with luggage" src="/lovable-uploads/96d47b4c-2f12-45d9-8469-9a27169311bc.png" className="w-full max-w-lg mx-auto mb-8 relative top-6 object-fill" />
      <div className="bg-[#EFF0F0] py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium mb-6 md:mb-8">
            Why Student Travel Insurance Is a Must-Have
          </h2>
          <p className="text-gray-600 text-lg md:text-xl mb-8 md:mb-10 leading-relaxed">
            Travel insurance protects you from medical emergencies, lost baggage, flight delays, and unexpected interruptions during your studies. It's required for visas in 30+ countries and even covers repatriation in case of fatalities. Simple, smart, and essential for your journey abroad.
          </p>
          <Button onClick={handleGetQuote} className="bg-[#00B2FF] hover:bg-[#00B2FF]/90 text-white text-lg md:text-xl px-8 py-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            Get a Quote
          </Button>
        </div>
      </div>
    </section>;
};
export default WhySection;