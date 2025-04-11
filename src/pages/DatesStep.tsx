
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { Calendar } from 'lucide-react';
import { format, differenceInDays, parse } from 'date-fns';
import { formSteps } from '@/constants/formSteps';

const DatesStep = () => {
  const navigate = useNavigate();
  const { startDate, setStartDate, endDate, setEndDate, setDuration, duration } = useTravelForm();
  
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    
    if (endDate && newStartDate) {
      try {
        const startDateObj = parse(newStartDate, 'yyyy-MM-dd', new Date());
        const endDateObj = parse(endDate, 'yyyy-MM-dd', new Date());
        
        if (startDateObj > endDateObj) {
          setEndDate('');
          setDuration(0);
        } else {
          const days = differenceInDays(endDateObj, startDateObj);
          setDuration(days);
        }
      } catch (error) {
        console.error('Date parsing error', error);
      }
    } else {
      setDuration(0);
    }
  };
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    
    if (startDate && newEndDate) {
      try {
        const startDateObj = parse(startDate, 'yyyy-MM-dd', new Date());
        const endDateObj = parse(newEndDate, 'yyyy-MM-dd', new Date());
        
        if (endDateObj < startDateObj) {
          setEndDate('');
          setDuration(0);
          return;
        }
        
        const days = differenceInDays(endDateObj, startDateObj);
        setDuration(days);
      } catch (error) {
        console.error('Date parsing error', error);
      }
    } else {
      setDuration(0);
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
        
        <div className="w-full max-w-md space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <input
                type="date"
                className="w-full h-12 px-3 py-3 border border-primary rounded-md appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-sm"
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Start Date"
              />
              <label className="absolute left-3 top-1 text-xs text-gray-500">Start Date</label>
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
            
            <div className="flex-1 relative">
              <input
                type="date"
                className="w-full h-12 px-3 py-3 border border-primary rounded-md appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-primary text-base md:text-sm"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="End Date"
              />
              <label className="absolute left-3 top-1 text-xs text-gray-500">End Date</label>
              <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          <div className="text-center text-gray-600">
            Trip Duration: <span className="text-primary font-medium">{duration} days</span>
          </div>
          
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

export default DatesStep;
