
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { saveToLocalStorage } from '@/utils/localStorageUtils';

const DatesStep = () => {
  const navigate = useNavigate();
  const { startDate, setStartDate, endDate, setEndDate, setDuration, duration } = useTravelForm();
  const [dateError, setDateError] = useState<string>('');
  
  // State for calendar date objects
  const [startDateObj, setStartDateObj] = useState<Date | undefined>(
    startDate ? new Date(startDate) : undefined
  );
  const [endDateObj, setEndDateObj] = useState<Date | undefined>(
    endDate ? new Date(endDate) : undefined
  );
  
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
          if (days > 730) {
            setEndDateObj(undefined);
            setEndDate('');
            setDuration(0);
            setDateError('Trip duration cannot exceed 730 days');
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
      
      if (days > 730) {
        setDateError('Trip duration cannot exceed 730 days');
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

    // Save dates to localStorage
    saveToLocalStorage('dates', {
      startDate,
      endDate,
      duration
    });
    
    navigate('/travellers');
  };

  const today = new Date();
  const maxEndDate = startDateObj ? addDays(startDateObj, 730) : undefined;

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
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Start Date</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "flex h-12 items-center justify-between rounded-md border border-primary bg-background px-3 py-2 text-sm w-full",
                      !startDateObj && "text-muted-foreground"
                    )}
                  >
                    {startDateObj ? (
                      format(startDateObj, "dd MMM yyyy")
                    ) : (
                      <span className="text-muted-foreground">Select date</span>
                    )}
                    <CalendarIcon className="h-5 w-5 ml-2 text-gray-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDateObj}
                    onSelect={handleStartDateSelect}
                    disabled={{ before: today }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            {/* End Date Picker */}
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">End Date</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className={cn(
                      "flex h-12 items-center justify-between rounded-md border border-primary bg-background px-3 py-2 text-sm w-full",
                      !endDateObj && "text-muted-foreground",
                      dateError && "border-destructive"
                    )}
                  >
                    {endDateObj ? (
                      format(endDateObj, "dd MMM yyyy")
                    ) : (
                      <span className="text-muted-foreground">Select date</span>
                    )}
                    <CalendarIcon className="h-5 w-5 ml-2 text-gray-400" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDateObj}
                    onSelect={handleEndDateSelect}
                    disabled={{
                      before: startDateObj || today,
                      after: maxEndDate
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              {dateError && (
                <span className="text-sm text-destructive mt-1">{dateError}</span>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-center text-center p-4 bg-blue-50 rounded-md">
            <span className="text-gray-600">
              Trip Duration: <span className="text-primary font-medium">{duration} days</span>
            </span>
          </div>
          
          <div className="pt-4">
            <ActionButton
              onClick={handleNext}
              className="w-full"
              disabled={!startDate || !endDate || !!dateError}
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
