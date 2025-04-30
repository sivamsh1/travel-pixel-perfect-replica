import { useState, useEffect } from 'react';
import { useTravelForm } from '@/context/TravelFormContext';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorageUtils';
import { isValidEmail, isValidPhone } from '@/utils/validationUtils';
import { format } from 'date-fns';
import { toast } from "@/components/ui/use-toast";

interface ValidationErrors {
  [key: string]: string;
}

const formatDOBtoDDMMYYYY = (date?: Date) => {
  if (!date) return '';
  return format(date, 'dd/MM/yyyy');
};

export const useTravellerDetails = () => {
  const { 
    startDate, 
    endDate, 
    travellers,
    updateTraveller,
    nominee,
    updateNominee,
    proposer,
    updateProposer
  } = useTravelForm();

  const formattedStartDate = startDate ? 
    format(new Date(startDate), 'do MMM') : 
    '1st Jan';
  
  const formattedEndDate = endDate ? 
    format(new Date(endDate), 'do MMM') : 
    '10th Jan';

  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    const storageData = getFromLocalStorage();
    
    if (storageData?.travellers?.details) {
      storageData.travellers.details.forEach((storedTraveller, index) => {
        if (index < travellers.length) {
          updateTraveller(index, storedTraveller);
        }
      });

      if (storageData.travellers.nominee) {
        updateNominee(storageData.travellers.nominee);
      }
      
      if (storageData.travellers.proposer) {
        updateProposer(storageData.travellers.proposer);
      }
    }

    if (storageData?.contact && travellers.length > 0 && (!travellers[0].email || !travellers[0].mobileNo)) {
      const updatedTraveller = { ...travellers[0] };
      
      if (!updatedTraveller.email && storageData.contact.email) {
        updatedTraveller.email = storageData.contact.email;
      }
      
      if (!updatedTraveller.mobileNo && storageData.contact.phone) {
        updatedTraveller.mobileNo = storageData.contact.phone;
      }
      
      updateTraveller(0, updatedTraveller);
    }
  }, []);

  const handleDateChange = (index: number, date: Date | undefined) => {
    if (date) {
      const formattedDOB = format(date, 'dd/MM/yyyy');
      updateTraveller(index, { dob: formattedDOB });

      if (errors[`traveller${index}Dob`]) {
        const newErrors = { ...errors };
        delete newErrors[`traveller${index}Dob`];
        setErrors(newErrors);
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let hasErrors = false;
    
    travellers.forEach((traveller, index) => {
      // Check for medical conditions
      if (traveller.hasPreExistingCondition && traveller.medicalCondition) {
        toast({
          title: "Medical Condition Restriction",
          description: "Sorry, travellers with selected medical conditions are not eligible to continue.",
          variant: "destructive"
        });
        hasErrors = true;
      }

      // Validate new required fields
      if (!traveller.salutation) {
        newErrors[`traveller${index}Salutation`] = "Salutation is required";
        hasErrors = true;
      }
      
      if (!traveller.forename) {
        newErrors[`traveller${index}Forename`] = "Forename is required";
        hasErrors = true;
      } else if (traveller.forename.length < 2) {
        newErrors[`traveller${index}Forename`] = "Forename should be at least 2 characters";
        hasErrors = true;
      }
      
      if (!traveller.lastname) {
        newErrors[`traveller${index}Lastname`] = "Lastname is required";
        hasErrors = true;
      } else if (traveller.lastname.length < 2) {
        newErrors[`traveller${index}Lastname`] = "Lastname should be at least 2 characters";
        hasErrors = true;
      }
      
      if (!traveller.gender) {
        newErrors[`traveller${index}Gender`] = "Gender is required";
        hasErrors = true;
      }

      // Keep existing validation
      if (!traveller.passportNumber) {
        newErrors[`traveller${index}Passport`] = "Passport number is required";
        hasErrors = true;
      } else if (traveller.passportNumber.length !== 10) {
        newErrors[`traveller${index}Passport`] = "Passport number must be exactly 10 characters";
        hasErrors = true;
      }
      
      // Update name validation to use forename and lastname if available
      if (!traveller.name && (!traveller.forename || !traveller.lastname)) {
        newErrors[`traveller${index}Name`] = "Name is required";
        hasErrors = true;
      } else if (traveller.name && traveller.name.length < 3) {
        newErrors[`traveller${index}Name`] = "Name should be at least 3 characters";
        hasErrors = true;
      }
      
      if (!traveller.dob) {
        newErrors[`traveller${index}Dob`] = "Date of birth is required";
        hasErrors = true;
      }
      
      if (traveller.mobileNo && !isValidPhone(traveller.mobileNo)) {
        newErrors[`traveller${index}Mobile`] = "Please enter a valid 10-digit phone number";
        hasErrors = true;
      }
      
      if (traveller.email && !isValidEmail(traveller.email)) {
        newErrors[`traveller${index}Email`] = "Please enter a valid email address";
        hasErrors = true;
      }
      
      if (traveller.pincode && !/^\d{6}$/.test(traveller.pincode)) {
        newErrors[`traveller${index}Pincode`] = "Pincode should be 6 digits";
        hasErrors = true;
      }
    });

    // Validate nominee DOB (if name is provided)
    if (nominee.name && !nominee.dob) {
      newErrors.nomineeDob = "Nominee date of birth is required";
      hasErrors = true;
      toast({
        title: "Form Validation",
        description: "Please provide the nominee's date of birth.",
        variant: "destructive"
      });
    }
    
    // Validate proposer fields if not "Self"
    if (proposer.type && proposer.type !== "Self") {
      if (!proposer.name) {
        newErrors.proposerName = "Name is required";
        hasErrors = true;
      }
      
      if (!proposer.gender) {
        newErrors.proposerGender = "Gender is required";
        hasErrors = true;
      }
      
      if (!proposer.salutation) {
        newErrors.proposerSalutation = "Salutation is required";
        hasErrors = true;
      }
      
      if (!proposer.maritalStatus) {
        newErrors.proposerMaritalStatus = "Marital status is required";
        hasErrors = true;
      }
      
      if (proposer.passportNumber && proposer.passportNumber.length !== 10) {
        newErrors.proposerPassport = "Passport number must be exactly 10 characters";
        hasErrors = true;
      }
    }
    
    setErrors(newErrors);
    return !hasErrors;
  };

  const saveTravellersToLocalStorage = () => {
    saveToLocalStorage('travellers', {
      count: travellers.length,
      details: travellers,
      nominee: nominee,
      proposer: proposer
    });
  };

  return {
    travellers,
    nominee,
    proposer,
    updateTraveller,
    updateNominee,
    updateProposer,
    formattedStartDate,
    formattedEndDate,
    errors,
    handleDateChange,
    validateForm,
    saveTravellersToLocalStorage
  };
};
