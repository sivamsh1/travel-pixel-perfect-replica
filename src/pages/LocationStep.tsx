
import React, { useState, useEffect } from 'react';
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
import { saveToLocalStorage } from '@/utils/localStorageUtils';

const EXCLUDE_COUNTRIES_FOR_REGION: Record<string, string[]> = {
  "Student Overseas | Excluding USA and CANADA": ["United States", "Canada"],
  // You can extend for other region rules if required...
};

const LocationStep = () => {
  const navigate = useNavigate();
  const { region, setRegion, destination, setDestination } = useTravelForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [destinationId, setDestinationId] = useState<string>('');

  // Determine excluded countries list
  const excludedCountries: string[] = region && EXCLUDE_COUNTRIES_FOR_REGION[region] ? EXCLUDE_COUNTRIES_FOR_REGION[region] : [];

  // If region changes, and the destination is no longer allowed, clear it
  useEffect(() => {
    if (
      destination &&
      excludedCountries.some(
        ec => ec.trim().toLowerCase() === destination.trim().toLowerCase()
      )
    ) {
      setDestination('');
      setDestinationId('');
      setFormError('');
    }
    // eslint-disable-next-line
  }, [region]);

  const validateForm = () => {
    if (!region) {
      setFormError('Please select a travel region');
      return false;
    }

    if (!destination) {
      setFormError('Please select a destination');
      return false;
    }

    // Also check that destination is not in the exclusion list
    if (
      excludedCountries.some(
        ec => ec.trim().toLowerCase() === destination.trim().toLowerCase()
      )
    ) {
      setFormError('This country is not allowed for the selected region.');
      return false;
    }

    setFormError('');
    return true;
  };

  const handleNext = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Save to localStorage
      saveToLocalStorage('location', {
        region,
        destination,
        destinationId: destinationId || '679e707834ecd414eb0004de' // Use fallback if not available
      });
      
      // Navigate to next page
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
              // Optionally, if you want to immediately clear destination on region change:
              // if (destination) setDestination('');
              // setDestinationId('');
            }}
          />
          
          <CountrySearch 
            initialValue={destination}
            onSelect={(value, id) => {
              setDestination(value);
              setDestinationId(id);
              setFormError('');
            }}
            excludeCountries={excludedCountries}
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
