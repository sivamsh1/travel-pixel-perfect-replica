
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { format, differenceInDays, addDays, parse } from 'date-fns';
import { formSteps } from '@/constants/formSteps';
import DateRangeSelector from '@/components/DateRangeSelector';

const DatesStep = () => {
  const navigate = useNavigate();
  const { startDate, setStartDate, endDate, setEndDate, setDuration, duration } = useTravelForm();
  
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    if (endDate) {
      try {
        const startDateObj = parse(newStartDate, 'yyyy-MM-dd', new Date());
        const endDateObj = parse(endDate, 'yyyy-MM-dd', new Date());
        
        if (startDateObj > endDateObj) {
          const newEndDateObj = addDays(startDateObj, 10);
          setEndDate(format(newEndDateObj, 'yyyy-MM-dd'));
          setDuration(10);
        } else {
          const days = differenceInDays(endDateObj, startDateObj);
          setDuration(days);
        }
      } catch (error) {
        console.error('Date parsing error', error);
      }
    }
  };
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    
    if (startDate) {
      try {
        const startDateObj = parse(startDate, 'yyyy-MM-dd', new Date());
        const endDateObj = parse(newEndDate, 'yyyy-MM-dd', new Date());
        
        if (endDateObj < startDateObj) {
          setEndDate('');
          return;
        }
        
        const days = differenceInDays(endDateObj, startDateObj);
        setDuration(days);
      } catch (error) {
        console.error('Date parsing error', error);
      }
    }
  };

  const handleNext = () => {
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
        
        <DateRangeSelector
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          duration={duration}
        />
        
        <div className="pt-4 w-full max-w-md">
          <ActionButton
            onClick={handleNext}
            className="w-full"
          >
            NEXT
          </ActionButton>
        </div>
      </div>
    </Layout>
  );
};

export default DatesStep;
