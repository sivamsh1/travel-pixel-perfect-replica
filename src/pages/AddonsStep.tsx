
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { format, parse } from 'date-fns';
import { Button } from '@/components/ui/button';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const AddonsStep = () => {
  const navigate = useNavigate();
  const { 
    startDate, 
    endDate, 
    travellersCount, 
    selectedAddOns, 
    addAddOn, 
    removeAddOn 
  } = useTravelForm();

  const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';
  const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';

  const handleToggleAddon = (addon: string) => {
    if (selectedAddOns.includes(addon)) {
      removeAddOn(addon);
    } else {
      addAddOn(addon);
    }
  };

  const handleNext = () => {
    navigate('/traveller-details');
  };
  
  const handleSkip = () => {
    navigate('/traveller-details');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator 
          steps={steps} 
          currentStep={3} 
          completedSteps={[1, 2]}
        />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Add Extra Protection</h2>
        
        <div className="w-full mb-4">
          <div className="text-sm text-gray-700 mb-6">
            Summary: {travellersCount} Traveller(s) | {formattedStartDate} - {formattedEndDate} <span className="text-primary">Edit &gt;</span>
          </div>
        </div>
        
        {/* Add-ons */}
        <div className="w-full border border-gray-200 rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="mr-6">
              <img src="/lovable-uploads/4c5837a2-5a90-4288-9184-c2fea9fd8954.png" alt="Sports Cover" className="w-24 h-auto" />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg">Sports Cover</h3>
                <span className="text-lg font-bold text-orange-500">₹ 199</span>
              </div>
              
              <p className="text-sm text-gray-600 mt-1">
                Add protection for injuries and emergencies while playing sports abroad
              </p>
            </div>
            
            <div className="ml-4">
              <button 
                className={`px-4 py-1 text-sm rounded border ${
                  selectedAddOns.includes('Sports Cover') 
                    ? 'bg-primary text-white' 
                    : 'border-gray-300 text-primary'
                }`}
                onClick={() => handleToggleAddon('Sports Cover')}
              >
                {selectedAddOns.includes('Sports Cover') ? 'Selected' : 'Select'}
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 w-full justify-center">
          <Button 
            variant="outline" 
            className="px-10 border-gray-300 text-gray-600"
            onClick={handleSkip}
          >
            SKIP
          </Button>
          
          <ActionButton onClick={handleNext}>
            NEXT
          </ActionButton>
        </div>
      </div>
    </Layout>
  );
};

export default AddonsStep;
