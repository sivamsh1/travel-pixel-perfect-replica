
import { useState, useEffect } from 'react';
import { useTravelForm } from '@/context/TravelFormContext';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorageUtils';
import { format } from 'date-fns';
import { toast } from "@/components/ui/use-toast";
import { validateForm, ValidationErrors } from '@/utils/travellerValidator';
import { useTravellerDateHandling } from '@/hooks/useTravellerDateHandling';

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

  const [errors, setErrors] = useState<ValidationErrors>({});

  const formattedStartDate = startDate ? 
    format(new Date(startDate), 'do MMM') : 
    '1st Jan';
  
  const formattedEndDate = endDate ? 
    format(new Date(endDate), 'do MMM') : 
    '10th Jan';

  const { handleDateChange } = useTravellerDateHandling(updateTraveller, errors, setErrors);

  // Load data from local storage on initial render
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

    // Populate contact info from storage if available
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

  // Update name field when forename or lastname changes
  useEffect(() => {
    travellers.forEach((traveller, index) => {
      if (traveller.forename && traveller.lastname) {
        const fullName = `${traveller.forename} ${traveller.lastname}`;
        if (fullName !== traveller.name) {
          updateTraveller(index, { name: fullName });
        }
      }
    });
  }, [travellers]);

  // Validate form
  const validateTravellerForm = (): boolean => {
    const newErrors = validateForm(travellers, nominee, proposer);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Save travellers to localStorage
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
    validateForm: validateTravellerForm,
    saveTravellersToLocalStorage
  };
};
