
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format, differenceInDays, parse } from 'date-fns';
import { formSteps } from '@/constants/formSteps';
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';

const DatesStep = () => {
  const navigate = useNavigate();
  const { startDate, setStartDate, endDate, setEndDate, setDuration, duration } = useTravelForm();
  
  // State for calendar date objects
  const [startDateObj, setStartDateObj] = useState<Date | undefined>(
    startDate ? parse(startDate, 'yyyy-MM-dd', new Date()) : undefined
  );
  const [endDateObj, setEndDateObj] = useState<Date | undefined>(
    endDate ? parse(endDate, 'yyyy-MM-dd', new Date()) : undefined
  );
  
  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDateObj(date);
    
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setStartDate(formattedDate);
      
      if (endDateObj && date > endDateObj) {
        setEndDateObj(undefined);
        setEndDate('');
        setDuration(0);
      } else if (endDateObj) {
        const days = differenceInDays(endDateObj, date);
        setDuration(days);
      }
    } else {
      setStartDate('');
      setDuration(0);
    }
  };
  
  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDateObj(date);
    
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setEndDate(formattedDate);
      
      if (startDateObj) {
        if (date < startDateObj) {
          return;
        }
        const days = differenceInDays(date, startDateObj);
        setDuration(days);
      }
    } else {
      setEndDate('');
      setDuration(0);
    }
  };

  const handleNext = () => {
    navigate('/travellers');
  };

  const today = new Date();
  const disabledDays = { before: today };

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
                    disabled={disabledDays}
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
                      !endDateObj && "text-muted-foreground"
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
                      before: startDateObj || today
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
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
              disabled={!startDate || !endDate}
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
