
import { useState, useCallback, useEffect } from 'react';
import { TravellerDetails } from '@/context/TravelFormContext';
import { usePincodeSearch } from '@/hooks/usePincodeSearch';

export const useTravellerForm = (
  traveller: TravellerDetails,
  index: number,
  updateTraveller: (index: number, details: Partial<TravellerDetails>) => void
) => {
  const { searchCityByPincode, isLoading } = usePincodeSearch();
  const [autoFilled, setAutoFilled] = useState(false);
  const [lastFetchedPincode, setLastFetchedPincode] = useState<string | null>(null);

  // Handle pincode change and fetch city data
  const handlePincodeChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pincode = e.target.value.slice(0, 6);
    updateTraveller(index, { pincode });

    if (
      pincode.length === 6 &&
      pincode !== lastFetchedPincode
    ) {
      setLastFetchedPincode(pincode);
      const locationData = await searchCityByPincode(pincode);

      if (locationData) {
        updateTraveller(index, {
          city: locationData.cityName,
          locationData: {
            stateId: locationData.stateId,
            districtId: locationData.districtId,
            cityId: locationData.cityId,
            cityName: locationData.cityName
          }
        });
        setAutoFilled(true);
        setTimeout(() => setAutoFilled(false), 3000);
      }
    }
  }, [index, lastFetchedPincode, searchCityByPincode, updateTraveller]);

  // Auto-fill gender based on salutation
  useEffect(() => {
    if (traveller.salutation) {
      let gender = "";
      if (traveller.salutation === "Mr") {
        gender = "Male";
      } else if (traveller.salutation === "Mrs" || traveller.salutation === "Ms") {
        gender = "Female";
      }
      
      if (gender) {
        updateTraveller(index, { gender });
      }
    }
  }, [traveller.salutation, index, updateTraveller]);

  // Input change handlers
  const handleForenameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTraveller(index, { forename: e.target.value });
  }, [index, updateTraveller]);

  const handleLastnameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTraveller(index, { lastname: e.target.value });
  }, [index, updateTraveller]);

  const handlePassportChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTraveller(index, { passportNumber: e.target.value.slice(0, 10) });
  }, [index, updateTraveller]);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTraveller(index, { address: e.target.value });
  }, [index, updateTraveller]);

  const handleMobileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTraveller(index, { mobileNo: e.target.value });
  }, [index, updateTraveller]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTraveller(index, { email: e.target.value });
  }, [index, updateTraveller]);

  const handleSalutationChange = useCallback((value: string) => {
    updateTraveller(index, { salutation: value });
  }, [index, updateTraveller]);

  const handleGenderChange = useCallback((value: string) => {
    updateTraveller(index, { gender: value });
  }, [index, updateTraveller]);

  return {
    isLoadingPincode: isLoading,
    handlePincodeChange,
    handleForenameChange,
    handleLastnameChange,
    handlePassportChange,
    handleAddressChange,
    handleMobileChange,
    handleEmailChange,
    handleSalutationChange,
    handleGenderChange
  };
};
