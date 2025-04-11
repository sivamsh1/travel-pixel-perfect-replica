
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import RegionSelector from '@/components/RegionSelector';
import CountrySearch from '@/components/CountrySearch';
import { formSteps } from '@/constants/formSteps';
import { toast } from "@/components/ui/use-toast";

const LocationStep = () => {
  const navigate = useNavigate();
  const { region, setRegion, destination, setDestination } = useTravelForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const validateForm = () => {
    if (!region) {
      setFormError('Please select a travel region');
      return false;
    }

    if (!destination) {
      setFormError('Please select a destination');
      return false;
    }

    setFormError('');
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulating form submission - in a real app, this might be an API call
      setTimeout(() => {
        navigate('/dates');
        setIsSubmitting(false);
      }, 300);
    } else {
      // Show toast error
      toast({
        title: "Form Error",
        description: formError,
        variant: "destructive",
      });
    }
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
            onChange={(value) => {
              setRegion(value);
              setFormError('');
            }}
          />
          
          <CountrySearch 
            initialValue={destination}
            onSelect={(value) => {
              setDestination(value);
              setFormError('');
            }}
          />
          
          {formError && (
            <p className="text-red-500 text-sm">{formError}</p>
          )}
          
          <div className="pt-4">
            <ActionButton
              onClick={handleNext}
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'PROCESSING...' : 'NEXT'}
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LocationStep;
