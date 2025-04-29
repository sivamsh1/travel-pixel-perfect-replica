
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { formSteps } from '@/constants/formSteps';
import { toast } from "@/hooks/use-toast";
import { saveToLocalStorage } from '@/utils/localStorageUtils';

// Import the new components
import DateRangePicker from '@/components/dates/DateRangePicker';
import TripDurationDisplay from '@/components/dates/TripDurationDisplay';
import CitizenshipCheckbox from '@/components/dates/CitizenshipCheckbox';

const DatesStep = () => {
  const navigate = useNavigate();
  const { startDate, setStartDate, endDate, setEndDate, setDuration, duration } = useTravelForm();
  const [dateError, setDateError] = useState<string>('');
  
  // State for the citizenship checkbox
  const [isIndianCitizen, setIsIndianCitizen] = useState<boolean>(false);
  const [citizenError, setCitizenError] = useState<string>('');

  const handleCitizenshipChange = (checked: boolean) => {
    setIsIndianCitizen(checked);
    if (checked) {
      setCitizenError('');
    }
  };

  const handleNext = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Required Dates",
        description: "Please select both start and end dates",
        variant: "destructive"
      });
      return;
    }

    if (dateError) {
      toast({
        title: "Invalid Duration",
        description: dateError,
        variant: "destructive"
      });
      return;
    }

    // Check citizenship requirement
    if (!isIndianCitizen) {
      setCitizenError("This travel insurance policy is only available to Indian citizens currently in India. NRI, OCI or non-OCI individuals are not eligible.");
      toast({
        title: "Citizenship Requirement",
        description: "This travel insurance policy is only available to Indian citizens currently in India.",
        variant: "destructive"
      });
      return;
    }

    // Save dates to localStorage
    saveToLocalStorage('dates', {
      startDate,
      endDate,
      duration
    });
    
    navigate('/travellers');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={formSteps} currentStep={1} completedSteps={[]} />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-4">When are you travelling to?</h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl">
          Overseas Travel Insurance is only valid for Indian passport holders, commencing their journey from India.*
        </p>
        
        <div className="w-full max-w-md space-y-6">
          {/* Date Range Picker */}
          <DateRangePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setDuration={setDuration}
            onError={setDateError}
          />
          
          {/* Trip Duration Display */}
          <TripDurationDisplay duration={duration} />
          
          {/* Citizenship Checkbox */}
          <CitizenshipCheckbox
            isChecked={isIndianCitizen}
            onCheckedChange={handleCitizenshipChange}
            errorMessage={citizenError}
          />
          
          <div className="pt-4">
            <ActionButton
              onClick={handleNext}
              className="w-full"
              disabled={!startDate || !endDate || !!dateError || !isIndianCitizen}
            >
              NEXT
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DatesStep;
