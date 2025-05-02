
import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [isInitialized, setIsInitialized] = useState(false);
  const firstErrorRef = useRef<string | null>(null);

  const formattedStartDate = startDate ? 
    format(new Date(startDate), 'do MMM') : 
    '1st Jan';
  
  const formattedEndDate = endDate ? 
    format(new Date(endDate), 'do MMM') : 
    '10th Jan';

  const { handleDateChange } = useTravellerDateHandling(updateTraveller, errors, setErrors);

  // Memoized update traveller function to prevent unnecessary re-renders
  const memoizedUpdateTraveller = useCallback((index: number, details: Partial<any>) => {
    updateTraveller(index, details);
    
    // Clear validation errors when field values change
    if (details) {
      Object.keys(details).forEach(key => {
        const errorKey = `traveller${index}${key.charAt(0).toUpperCase() + key.slice(1)}`;
        if (errors[errorKey]) {
          setErrors(prev => {
            const updated = { ...prev };
            delete updated[errorKey];
            return updated;
          });
        }
      });
    }
  }, [updateTraveller, errors]);

  // Memoized update nominee function with error clearing
  const memoizedUpdateNominee = useCallback((details: Partial<any>) => {
    updateNominee(details);
    
    // Clear validation errors when nominee fields change
    if (details) {
      Object.keys(details).forEach(key => {
        const errorKey = `nominee${key.charAt(0).toUpperCase() + key.slice(1)}`;
        if (errors[errorKey]) {
          setErrors(prev => {
            const updated = { ...prev };
            delete updated[errorKey];
            return updated;
          });
        }
      });
    }
  }, [updateNominee, errors]);

  // Memoized update proposer function with error clearing
  const memoizedUpdateProposer = useCallback((details: Partial<any>) => {
    updateProposer(details);
    
    // Clear validation errors when proposer fields change
    if (details) {
      Object.keys(details).forEach(key => {
        const errorKey = `proposer${key.charAt(0).toUpperCase() + key.slice(1)}`;
        if (errors[errorKey]) {
          setErrors(prev => {
            const updated = { ...prev };
            delete updated[errorKey];
            return updated;
          });
        }
      });
    }
  }, [updateProposer, errors]);

  // Load data from local storage on initial render
  useEffect(() => {
    if (isInitialized) return;

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
    
    setIsInitialized(true);
  }, [travellers.length, updateTraveller, updateNominee, updateProposer, isInitialized]);

  // Update name field when forename or lastname changes - with debounce
  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];

    travellers.forEach((traveller, index) => {
      if (traveller.forename && traveller.lastname) {
        const fullName = `${traveller.forename} ${traveller.lastname}`;
        if (fullName !== traveller.name) {
          const timeoutId = setTimeout(() => {
            updateTraveller(index, { name: fullName });
          }, 300); // 300ms debounce
          
          timeoutIds.push(timeoutId);
        }
      }
    });

    return () => {
      timeoutIds.forEach(id => clearTimeout(id));
    };
  }, [travellers, updateTraveller]);

  // Effect to scroll to and focus first error
  useEffect(() => {
    if (firstErrorRef.current) {
      const elementId = firstErrorRef.current;
      const element = document.getElementById(elementId);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
        firstErrorRef.current = null;
      }
    }
  }, [errors]);

  // Validate form - memoized to prevent unnecessary re-renders
  const validateTravellerForm = useCallback((): boolean => {
    const newErrors = validateForm(travellers, nominee, proposer);
    setErrors(newErrors);
    
    // Find the first error key for scrolling
    const errorKeys = Object.keys(newErrors);
    if (errorKeys.length > 0) {
      firstErrorRef.current = errorKeys[0];
    }
    
    return errorKeys.length === 0;
  }, [travellers, nominee, proposer]);

  // Save travellers to localStorage - memoized to prevent unnecessary re-renders
  const saveTravellersToLocalStorage = useCallback(() => {
    saveToLocalStorage('travellers', {
      count: travellers.length,
      details: travellers,
      nominee: nominee,
      proposer: proposer
    });
  }, [travellers, nominee, proposer]);

  // Clear validation errors for a specific field
  const clearError = useCallback((key: string) => {
    if (errors[key]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
    }
  }, [errors]);

  return {
    travellers,
    nominee,
    proposer,
    updateTraveller: memoizedUpdateTraveller,
    updateNominee: memoizedUpdateNominee,
    updateProposer: memoizedUpdateProposer,
    formattedStartDate,
    formattedEndDate,
    errors,
    handleDateChange,
    validateForm: validateTravellerForm,
    saveTravellersToLocalStorage,
    clearError
  };
};
