
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import TravellerForm from '@/components/travellers/TravellerForm';
import NomineeForm from '@/components/travellers/NomineeForm';
import MedicalConditionSelector from '@/components/travellers/MedicalConditionSelector';
import TripSummary from '@/components/travellers/TripSummary';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const TravellersDetailsStep = () => {
  const navigate = useNavigate();
  const { 
    startDate, 
    endDate, 
    travellers,
    updateTraveller,
    nominee,
    updateNominee
  } = useTravelForm();

  const formattedStartDate = startDate ? 
    format(parse(startDate, 'yyyy-MM-dd', new Date()), 'do MMM') : 
    '1st Jan';
  
  const formattedEndDate = endDate ? 
    format(parse(endDate, 'yyyy-MM-dd', new Date()), 'do MMM') : 
    '10th Jan';

  // Validation state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleDateChange = (index: number, date: Date | undefined) => {
    if (date) {
      updateTraveller(index, { dob: date.toISOString() });
      
      // Clear error if exists
      if (errors[`traveller${index}Dob`]) {
        const newErrors = { ...errors };
        delete newErrors[`traveller${index}Dob`];
        setErrors(newErrors);
      }
    }
  };

  const handleContinue = () => {
    // Validate required fields
    const newErrors: { [key: string]: string } = {};
    
    travellers.forEach((traveller, index) => {
      if (!traveller.passportNumber) {
        newErrors[`traveller${index}Passport`] = "Passport number is required";
      }
      if (!traveller.name) {
        newErrors[`traveller${index}Name`] = "Name is required";
      }
      if (!traveller.dob) {
        newErrors[`traveller${index}Dob`] = "Date of birth is required";
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      navigate('/review');
    }
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator 
          steps={steps} 
          currentStep={4} 
          completedSteps={[1, 2, 3]}
        />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Travellers Details</h2>
        
        <TripSummary 
          travellerCount={travellers.length}
          startDateFormatted={formattedStartDate}
          endDateFormatted={formattedEndDate}
        />
        
        <div className="w-full">
          {travellers.map((traveller, index) => (
            <TravellerForm
              key={index}
              traveller={traveller}
              index={index}
              updateTraveller={updateTraveller}
              errors={errors}
              handleDateChange={handleDateChange}
            />
          ))}
          
          <NomineeForm nominee={nominee} updateNominee={updateNominee} />
          
          <MedicalConditionSelector
            traveller={travellers[0]}
            updateTraveller={updateTraveller}
            travellerIndex={0}
          />
          
          <div className="flex justify-center mt-12">
            <ActionButton onClick={handleContinue}>
              Continue to KYC Verification
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TravellersDetailsStep;
