
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { Calendar, Plus, Minus } from 'lucide-react';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const TravellersStep = () => {
  const navigate = useNavigate();
  const { 
    travellersCount, 
    setTravellersCount, 
    travellers,
    updateTraveller
  } = useTravelForm();

  const handleDecrease = () => {
    if (travellersCount > 1) {
      setTravellersCount(travellersCount - 1);
    }
  };

  const handleIncrease = () => {
    if (travellersCount < 10) {
      setTravellersCount(travellersCount + 1);
    }
  };

  const handleNext = () => {
    navigate('/contact');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={steps} currentStep={1} completedSteps={[]} />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-4">Number of travellers travelling?</h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl">
          Overseas Travel Insurance is only valid for Indian passport holders, commencing their journey from India.*
        </p>
        
        <div className="w-full max-w-md space-y-6">
          <div className="flex border border-gray-300 rounded-md overflow-hidden">
            <button 
              className="p-4 hover:bg-gray-100 flex items-center justify-center"
              onClick={handleDecrease}
            >
              <Minus className="h-4 w-4" />
            </button>
            <div className="flex-1 flex items-center justify-center text-xl">
              {travellersCount.toString().padStart(2, '0')}
            </div>
            <button 
              className="p-4 hover:bg-gray-100 flex items-center justify-center"
              onClick={handleIncrease}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          {travellers.map((traveller, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={`Traveller ${index + 1} DOB`}
                  value={traveller.dob || ''}
                  onChange={(e) => updateTraveller(index, { dob: e.target.value })}
                />
                <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="w-1/3">
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={`T ${index + 1} Age`}
                  value={traveller.age || ''}
                  onChange={(e) => updateTraveller(index, { age: e.target.value })}
                />
              </div>
            </div>
          ))}
          
          <div className="pt-4">
            <ActionButton
              onClick={handleNext}
              className="w-full"
            >
              NEXT
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TravellersStep;
