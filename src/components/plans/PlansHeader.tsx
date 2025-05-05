
import React from 'react';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';

// Define the steps array
const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const PlansHeader: React.FC = () => {
  return (
    <div className="px-6 md:px-12">
      <BackButton />
      <ProgressIndicator 
        steps={steps} 
        currentStep={2} 
        completedSteps={[1]}
      />
    </div>
  );
};

export default PlansHeader;
