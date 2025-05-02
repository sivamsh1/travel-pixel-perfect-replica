
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { format, parse } from 'date-fns';

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
  } = useTravelForm();

  const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';
  const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';

  // Currently, no add-ons available
  const addonsAvailable = false;

  useEffect(() => {
    // If no add-ons are available, redirect to the next step
    if (!addonsAvailable) {
      navigate('/traveller-details', { replace: true });
    }
  }, [addonsAvailable, navigate]);

  const handleNext = () => {
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
        
        {/* Temporary No Add-ons Message */}
        <div className="w-full border border-gray-200 rounded-lg p-6 mb-8 text-center">
          <p className="text-gray-600 font-medium">No add-ons available right now.</p>
        </div>
        
        <div className="flex gap-4 w-full justify-center">
          <ActionButton 
            onClick={handleNext} 
            className="w-full max-w-xs"
          >
            NEXT
          </ActionButton>
        </div>
      </div>
    </Layout>
  );
};

export default AddonsStep;
