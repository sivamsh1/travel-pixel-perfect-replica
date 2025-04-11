
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import RegionSelector from '@/components/RegionSelector';
import CountrySearch from '@/components/CountrySearch';
import { formSteps } from '@/constants/formSteps';

const LocationStep = () => {
  const navigate = useNavigate();
  const { region, setRegion, destination, setDestination } = useTravelForm();

  const handleNext = () => {
    navigate('/dates');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={formSteps} currentStep={1} completedSteps={[]} />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-4">Where are you travelling to?</h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl">
          Overseas Travel Insurance is only valid for Indian passport holders, commencing their journey from India.*
        </p>
        
        <div className="w-full max-w-md space-y-4">
          <RegionSelector 
            value={region} 
            onChange={setRegion}
          />
          
          <CountrySearch 
            initialValue={destination}
            onSelect={setDestination}
          />
          
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

export default LocationStep;
