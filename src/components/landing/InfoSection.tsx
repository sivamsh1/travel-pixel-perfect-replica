
import React from 'react';
import { Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const InfoSection = () => {
  const trustPoints = [
    "24/7 Emergency Assistance",
    "Global Network of Hospitals",
    "Fast Claims Processing",
    "Multi-lingual Support",
    "Digital Policy Management",
    "Instant Coverage Verification"
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-medium mb-4">Why Choose Student Trip Insurance</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We specialize in providing comprehensive travel insurance solutions designed 
            specifically for students studying abroad, with packages tailored to your academic needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png" 
              alt="Students traveling with insurance" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-medium mb-6">Our Promise</h3>
            
            <div className="space-y-4">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-lg">{point}</p>
                </div>
              ))}
            </div>
            
            <Separator className="my-8" />
            
            <p className="text-gray-600">
              Our student-focused policies have helped thousands of students
              navigate their international education journey with complete peace of mind.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
