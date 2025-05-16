import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, differenceInDays, addDays, isBefore, isAfter } from 'date-fns';
import { toast } from "@/hooks/use-toast";
import { saveToLocalStorage } from '@/utils/localStorageUtils';
import { useTravelForm } from '@/context/TravelFormContext';
import { formSteps } from '@/constants/formSteps';

// Layout components
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';

// Date step specific components
import TravelDatePicker from '@/components/dates/TravelDatePicker';
import TripDurationDisplay from '@/components/dates/TripDurationDisplay';
import CitizenshipConfirmation from '@/components/dates/CitizenshipConfirmation';

const DatesStep = () => {
  const navigate = useNavigate();
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    setDuration,
    duration
  } = useTravelForm();
  
  const [dateError, setDateError] = useState<string>('');
  const [isIndianCitizen, setIsIndianCitizen] = useState<boolean>(true);
  const [eligibilityError, setEligibilityError] = useState<string>('');

  // State for calendar date objects
  const [startDateObj, setStartDateObj] = useState<Date | undefined>(startDate ? new Date(startDate) : undefined);
  const [endDateObj, setEndDateObj] = useState<Date | undefined>(endDate ? new Date(endDate) : undefined);
  
  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDateObj(date);
    setDateError('');
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setStartDate(formattedDate);
      if (endDateObj) {
        if (isAfter(date, endDateObj)) {
          setEndDateObj(undefined);
          setEndDate('');
          setDuration(0);
        } else {
          const days = differenceInDays(endDateObj, date) + 1;
          if (days > 365) {
            setDateError('Trip duration cannot exceed 365 days');
            setDuration(days);
          } else {
            setDuration(days);
          }
        }
      }
    } else {
      setStartDate('');
      setDuration(0);
    }
  };
  
  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDateObj(date);
    setDateError('');
    if (date && startDateObj) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const days = differenceInDays(date, startDateObj) + 1;
      if (days > 365) {
        setDateError('Trip duration cannot exceed 365 days');
        setEndDate(formattedDate);
        setDuration(days);
        return;
      }
      if (days < 1) {
        setDateError('End date must be on or after start date');
        setEndDateObj(undefined);
        setEndDate('');
        setDuration(0);
        return;
      }
      setEndDate(formattedDate);
      setDuration(days);
    } else {
      setEndDate('');
      setDuration(0);
    }
  };
  
  const handleCitizenshipChange = (value: string) => {
    const isCitizen = value === 'yes';
    setIsIndianCitizen(isCitizen);
    setEligibilityError('');
    
    if (!isCitizen) {
      setEligibilityError('This travel insurance policy is only available to Indian citizens currently in India. NRI, OCI or non-OCI individuals are not eligible.');
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
    if (isIndianCitizen === undefined) {
      toast({
        title: "Citizenship Confirmation Required",
        description: "Please confirm your citizenship status",
        variant: "destructive"
      });
      return;
    }
    if (!isIndianCitizen) {
      toast({
        title: "Eligibility Restriction",
        description: "This travel insurance policy is only available to Indian citizens currently in India. NRI, OCI or non-OCI individuals are not eligible.",
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
  
  const today = new Date();
  
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
          <div className="grid grid-cols-2 gap-6">
            {/* Start Date Picker */}
            <TravelDatePicker
              label="Start Date"
              selectedDate={startDateObj}
              onDateSelect={handleStartDateSelect}
              minDate={today}
              error=""
            />
            
            {/* End Date Picker - Adding disabled prop and ascendingYears */}
            <TravelDatePicker
              label="End Date"
              selectedDate={endDateObj}
              onDateSelect={handleEndDateSelect}
              minDate={startDateObj || today}
              error=""
              disabled={!startDateObj}
              ascendingYears={true}
            />
          </div>
          
          <TripDurationDisplay duration={duration} />
          
          <CitizenshipConfirmation
            isIndianCitizen={isIndianCitizen}
            onCitizenshipChange={handleCitizenshipChange}
            eligibilityError={eligibilityError}
          />
          
          <div className="pt-4">
            <ActionButton 
              onClick={handleNext} 
              className="w-full" 
              disabled={!startDate || !endDate || !!dateError || isIndianCitizen === false || isIndianCitizen === undefined}
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
