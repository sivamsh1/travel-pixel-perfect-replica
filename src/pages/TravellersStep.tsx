
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import TravellerCount from '@/components/travellers/TravellerCount';
import TravellerDateOfBirth from '@/components/travellers/TravellerDateOfBirth';
import { saveToLocalStorage, getFromLocalStorage } from '@/utils/localStorageUtils';

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
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = getFromLocalStorage();
    if (savedData?.travellers?.details) {
      savedData.travellers.details.forEach((traveller, index) => {
        if (index < travellers.length) {
          updateTraveller(index, traveller);
        }
      });
    }
  }, []);

  const handleDecrease = () => {
    if (travellersCount > 1) {
      setTravellersCount(travellersCount - 1);
    }
  };

  const handleIncrease = () => {
    if (travellersCount < 10) {
      setTravellersCount(travellersCount + 1);
    }
  };

  const handleNext = () => {
    const newErrors: { [key: string]: string } = {};
    let hasErrors = false;
    
    travellers.forEach((traveller, index) => {
      if (!traveller.name) {
        newErrors[`traveller${index}`] = "Name is required";
        hasErrors = true;
      }
      if (!traveller.dob) {
        newErrors[`traveller${index}`] = (newErrors[`traveller${index}`] || "") + " Date of birth is required";
        hasErrors = true;
      }
    });
    
    setErrors(newErrors);
    
    if (!hasErrors) {
      // Save to localStorage before navigating
      saveToLocalStorage('travellers', {
        count: travellersCount,
        details: travellers.map(traveller => ({
          ...traveller,
          dob: traveller.dob ? format(new Date(traveller.dob), 'yyyy-MM-dd') : undefined
        }))
      });
      
      navigate('/contact');
    }
  };

  const handleDateChange = (index: number, date: Date | undefined) => {
    if (date) {
      updateTraveller(index, { dob: date.toISOString() });
      
      const today = new Date();
      let age = today.getFullYear() - date.getFullYear();
      const monthDiff = today.getMonth() - date.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
      }
      updateTraveller(index, { age: age.toString() });
      
      // Clear error if exists
      if (errors[`traveller${index}`]) {
        const newErrors = { ...errors };
        delete newErrors[`traveller${index}`];
        setErrors(newErrors);
      }
    }
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={steps} currentStep={1} completedSteps={[]} />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-4">Number of travellers travelling?</h2>
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
              name={traveller.name}
              age={traveller.age}
              handleDateChange={handleDateChange}
              updateTraveller={updateTraveller}
              error={errors[`traveller${index}`]}
            />
          ))}
          
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

export default TravellersStep;
