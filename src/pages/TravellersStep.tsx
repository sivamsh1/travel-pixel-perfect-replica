
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import TravellerCount from '@/components/travellers/TravellerCount';
import TravellerDateOfBirth from '@/components/travellers/TravellerDateOfBirth';
import { saveToLocalStorage } from '@/utils/localStorageUtils';

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
  
  const [errors, setErrors] = useState<{ [key: number]: { dob?: string; name?: string; age?: string } }>({});

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
    const newErrors: { [key: number]: { dob?: string; name?: string; age?: string } } = {};
    let hasErrors = false;
    
    travellers.forEach((traveller, index) => {
      const travellerErrors: { dob?: string; name?: string; age?: string } = {};
      
      if (!traveller.name || traveller.name.trim() === "") {
        travellerErrors.name = "Name is required";
        hasErrors = true;
      }
      if (!traveller.dob) {
        travellerErrors.dob = "Date of birth is required";
        hasErrors = true;
      }
      
      if (Object.keys(travellerErrors).length > 0) {
        newErrors[index] = travellerErrors;
      }
    });
    
    setErrors(newErrors);
    
    if (!hasErrors) {
      // Format DOB as dd/MM/yyyy for storage
      const formattedTravellers = travellers.map(traveller => ({
        ...traveller,
        dob: traveller.dob ? format(new Date(traveller.dob), 'dd/MM/yyyy') : undefined
      }));
      
      saveToLocalStorage('travellers', {
        count: travellersCount,
        details: formattedTravellers
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

      if (errors[index]?.dob || errors[index]?.age) {
        const newErrors = { ...errors };
        if (newErrors[index]) {
          delete newErrors[index].dob;
          delete newErrors[index].age;
          if (Object.keys(newErrors[index]).length === 0) {
            delete newErrors[index];
          }
        }
        setErrors(newErrors);
      }
    }
  };

  const handleNameChange = (index: number, value: string) => {
    updateTraveller(index, { name: value });
    if (errors[index]?.name) {
      const newErrors = { ...errors };
      if (newErrors[index]) {
        delete newErrors[index].name;
        if (Object.keys(newErrors[index]).length === 0) {
          delete newErrors[index];
        }
      }
      setErrors(newErrors);
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
              updateTraveller={(i, details) => {
                if ("name" in details) handleNameChange(i, details.name!);
                else updateTraveller(i, details);
              }}
              error={errors[index]?.dob}
              nameError={errors[index]?.name}
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
