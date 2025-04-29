
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, differenceInDays, addDays, isBefore, isAfter } from 'date-fns';
import { formSteps } from '@/constants/formSteps';
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { saveToLocalStorage } from '@/utils/localStorageUtils';
import { Checkbox } from "@/components/ui/checkbox";

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
  const [isIndianCitizen, setIsIndianCitizen] = useState<boolean | undefined>(undefined);
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
            setEndDateObj(undefined);
            setEndDate('');
            setDuration(0);
            setDateError('Trip duration cannot exceed 365 days');
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
        setEndDateObj(undefined);
        setEndDate('');
        setDuration(0);
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

  const handleCitizenshipChange = (checked: boolean | "indeterminate") => {
    if (checked === "indeterminate") return;
    setIsIndianCitizen(checked);
    setEligibilityError('');
    if (!checked) {
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
  // Update this to 365 days instead of 730
  const maxEndDate = startDateObj ? addDays(startDateObj, 365) : undefined;

  return <Layout>
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
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Start Date</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn("flex h-12 items-center justify-between rounded-md border border-primary bg-background px-3 py-2 text-sm w-full", !startDateObj && "text-muted-foreground")}>
                    {startDateObj ? format(startDateObj, "dd MMM yyyy") : <span className="text-muted-foreground">Select date</span>}
                    <CalendarIcon className="h-5 w-5 ml-2 text-gray-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={startDateObj} onSelect={handleStartDateSelect} disabled={{
                  before: today
                }} initialFocus className={cn("p-3 pointer-events-auto")} />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* End Date Picker */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">End Date</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className={cn("flex h-12 items-center justify-between rounded-md border border-primary bg-background px-3 py-2 text-sm w-full", !endDateObj && "text-muted-foreground", dateError && "border-destructive")}>
                    {endDateObj ? format(endDateObj, "dd MMM yyyy") : <span className="text-muted-foreground">Select date</span>}
                    <CalendarIcon className="h-5 w-5 ml-2 text-gray-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={endDateObj} onSelect={handleEndDateSelect} disabled={{
                  before: startDateObj || today,
                  after: maxEndDate
                }} initialFocus className={cn("p-3 pointer-events-auto")} />
                </PopoverContent>
              </Popover>
              {dateError && <span className="text-sm text-destructive mt-1">{dateError}</span>}
            </div>
          </div>
          
          <div className="flex items-center justify-center text-center p-4 bg-blue-50 rounded-md">
            <span className="text-gray-600">
              Trip Duration: <span className="text-primary font-medium">{duration} days</span>
            </span>
          </div>
          
          {/* Citizenship Confirmation Checkbox */}
          <div className="flex items-start space-x-3 p-4 rounded-md border border-gray-200 shadow-sm bg-white">
            <Checkbox id="citizenship" className="mt-1" checked={isIndianCitizen || false} onCheckedChange={handleCitizenshipChange} />
            <div className="space-y-1">
              <label htmlFor="citizenship" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Is the Traveller an Indian Citizen and currently in India whilst taking the policy?
              </label>
              {eligibilityError && <p className="text-sm text-destructive">{eligibilityError}</p>}
            </div>
          </div>
          
          <div className="pt-4">
            <ActionButton onClick={handleNext} className="w-full" disabled={!startDate || !endDate || !!dateError || isIndianCitizen === false || isIndianCitizen === undefined}>
              NEXT
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>;
};
export default DatesStep;
