import { useState, useEffect } from 'react';
import { useTravelForm } from '@/context/TravelFormContext';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorageUtils';
import { isValidEmail, isValidPhone } from '@/utils/validationUtils';
import { format } from 'date-fns';

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
    updateNominee
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
    
    travellers.forEach((traveller, index) => {
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

  const saveTravellersToLocalStorage = () => {
    saveToLocalStorage('travellers', {
      count: travellers.length,
      details: travellers,
      nominee: nominee
    });
  };

  return {
    travellers,
    nominee,
    updateTraveller,
    updateNominee,
    formattedStartDate,
    formattedEndDate,
    errors,
    handleDateChange,
    validateForm,
    saveTravellersToLocalStorage
  };
};
