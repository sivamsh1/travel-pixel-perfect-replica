
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelForm } from '@/context/TravelFormContext';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import CountrySearch from '@/components/CountrySearch';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button'; // Replaced ProgressButton with Button

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const LocationStep = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { destination, setDestination } = useTravelForm();

  const validateForm = () => {
    if (!destination) {
      toast({
        title: "Validation Error",
        description: "Please select a country", 
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      navigate('/dates');
    }
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={steps} currentStep={1} completedSteps={[]} />
      </div>

      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-4">Where are you going?</h2>
        <p className="text-gray-600 mb-6 text-center">
          Let us know where you're headed so we can customize your travel
          insurance options.
        </p>

        <div className="w-full max-w-md">
          <CountrySearch 
            initialValue=""
            onSelect={(countryName, countryId) => setDestination(countryName)} 
          />
        </div>

        <div className="mt-8 w-full max-w-md">
          <Button onClick={handleNext} className="w-full">
            NEXT
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default LocationStep;

