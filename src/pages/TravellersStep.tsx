import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, differenceInYears } from 'date-fns';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import TravellerCount from '@/components/travellers/TravellerCount';
import TravellerDateOfBirth from '@/components/travellers/TravellerDateOfBirth';
import { saveToLocalStorage } from '@/utils/localStorageUtils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const TravellersStep = () => {
  const navigate = useNavigate();
  const { 
    travellersCount, 
    setTravellersCount, 
    travellers,
    updateTraveller
  } = useTravelForm();
  
  const [errors, setErrors] = useState<{ [key: number]: { dob?: string, age?: string } }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDecrease = () => {
    if (travellersCount > 1) {
      setTravellersCount(travellersCount - 1);
    }
  };

  const handleIncrease = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => setIsDialogOpen(false);

  const handleDateChange = (index: number, date: Date | undefined) => {
    if (date) {
      const formattedDOB = format(date, 'dd/MM/yyyy');
      
      const today = new Date();
      const age = differenceInYears(today, date);

      // Update traveller with DOB and age - add "Years" to the age string
      updateTraveller(index, { 
        dob: formattedDOB,
        age: `${age} Years`
      });

      // Validate age range
      if (age < 16) {
        setErrors(prev => ({
          ...prev,
          [index]: {
            ...prev[index],
            age: "Proposer must be at least 16 years old",
            dob: "Age requirement not met"
          }
        }));
        
        toast({
          title: "Age Restriction",
          description: "Proposer must be at least 16 years old",
          variant: "destructive"
        });
      } 
      else if (age > 35) {
        setErrors(prev => ({
          ...prev,
          [index]: {
            ...prev[index],
            age: "Proposer cannot be more than 35 years old",
            dob: "Age requirement not met"
          }
        }));
        
        toast({
          title: "Age Restriction",
          description: "Proposer cannot be more than 35 years old",
          variant: "destructive"
        });
      }
      else {
        // Clear any existing errors if age is valid
        if (errors[index]?.dob || errors[index]?.age) {
          const newErrors = { ...errors };
          delete newErrors[index];
          setErrors(newErrors);
        }
      }
    }
  };

  const handleNext = () => {
    const newErrors: { [key: number]: { dob?: string, age?: string } } = {};
    let hasErrors = false;
    
    travellers.forEach((traveller, index) => {
      const travellerErrors: { dob?: string, age?: string } = {};

      if (!traveller.dob) {
        travellerErrors.dob = "Date of birth is required";
        hasErrors = true;
      } else {
        try {
          const [day, month, year] = traveller.dob.split('/').map(Number);
          const dobDate = new Date(year, month - 1, day);
          const age = differenceInYears(new Date(), dobDate);
          
          if (age < 16) {
            travellerErrors.age = "Proposer must be at least 16 years old";
            travellerErrors.dob = "Age requirement not met";
            hasErrors = true;
          } else if (age > 35) {
            travellerErrors.age = "Proposer cannot be more than 35 years old";
            travellerErrors.dob = "Age requirement not met";
            hasErrors = true;
          }
        } catch (error) {
          travellerErrors.dob = "Invalid date format";
          hasErrors = true;
        }
      }

      if (Object.keys(travellerErrors).length > 0) {
        newErrors[index] = travellerErrors;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      saveToLocalStorage('travellers', {
        count: travellersCount,
        details: travellers
      });
      navigate('/contact');
    }
  };

  // Check if any traveller has errors to determine if Next button should be disabled
  const hasAnyErrors = Object.keys(errors).length > 0;

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={steps} currentStep={1} completedSteps={[]} />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-4">Number of travellers ?</h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl">
          Overseas Travel Insurance is only valid for Indian passport holders, commencing their journey from India.*
        </p>
        
        <div className="w-full max-w-md space-y-6">
          <TravellerCount 
            travellersCount={travellersCount}
            handleDecrease={handleDecrease}
            handleIncrease={handleIncrease}
          />
          
          {travellers.map((traveller, index) => (
            <TravellerDateOfBirth
              key={index}
              index={index}
              dob={traveller.dob}
              age={traveller.age}
              handleDateChange={handleDateChange}
              updateTraveller={updateTraveller}
              error={errors[index]?.dob}
            />
          ))}
          
          <div className="pt-4">
            <ActionButton
              onClick={handleNext}
              className="w-full"
              disabled={hasAnyErrors || travellers.some(t => !t.dob)}
            >
              NEXT
            </ActionButton>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xs p-4">
          <DialogHeader>
            <DialogTitle className="text-center text-base font-semibold text-blue-500">
              Hey there!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center text-black font-medium">
            For student travellers, only 1 passenger is allowed at the moment.
          </div>
          <button
            onClick={handleDialogClose}
            className="w-full mt-2 bg-blue-500 text-white rounded-md py-2 font-medium hover:bg-blue-600 transition-colors"
          >
            OK
          </button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default TravellersStep;
