
import React, { useState, useEffect } from 'react';
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
import { getFromLocalStorage } from '@/utils/localStorageUtils';
import { isValidEmail, isValidPhone } from '@/utils/validationUtils';
import { toast } from "@/components/ui/use-toast";

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

  // Effect to populate fields from localStorage on mount
  useEffect(() => {
    const storageData = getFromLocalStorage();
    
    // Auto-fill traveller fields if we have contact data
    if (storageData?.contact) {
      // We'll only populate the first traveller with contact data
      if (travellers.length > 0) {
        const updatedTraveller = { ...travellers[0] };
        
        // Only update if the field is empty
        if (!updatedTraveller.email && storageData.contact.email) {
          updatedTraveller.email = storageData.contact.email;
        }
        
        if (!updatedTraveller.mobileNo && storageData.contact.phone) {
          updatedTraveller.mobileNo = storageData.contact.phone;
        }
        
        // Update the first traveller with the contact data
        updateTraveller(0, updatedTraveller);
      }
    }
  }, []);

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

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    
    travellers.forEach((traveller, index) => {
      // Required fields validation
      if (!traveller.passportNumber) {
        newErrors[`traveller${index}Passport`] = "Passport number is required";
      } else if (traveller.passportNumber.length < 8) {
        newErrors[`traveller${index}Passport`] = "Passport number should be at least 8 characters";
      }
      
      if (!traveller.name) {
        newErrors[`traveller${index}Name`] = "Name is required";
      } else if (traveller.name.length < 3) {
        newErrors[`traveller${index}Name`] = "Name should be at least 3 characters";
      }
      
      if (!traveller.dob) {
        newErrors[`traveller${index}Dob`] = "Date of birth is required";
      }
      
      // Optional fields format validation
      if (traveller.mobileNo && !isValidPhone(traveller.mobileNo)) {
        newErrors[`traveller${index}Mobile`] = "Please enter a valid 10-digit phone number";
      }
      
      if (traveller.email && !isValidEmail(traveller.email)) {
        newErrors[`traveller${index}Email`] = "Please enter a valid email address";
      }
      
      if (traveller.pincode && !/^\d{6}$/.test(traveller.pincode)) {
        newErrors[`traveller${index}Pincode`] = "Pincode should be 6 digits";
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    // Validate required fields
    if (validateForm()) {
      toast({
        title: "Success",
        description: "Traveller details saved successfully",
      });
      navigate('/review');
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive"
      });
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
