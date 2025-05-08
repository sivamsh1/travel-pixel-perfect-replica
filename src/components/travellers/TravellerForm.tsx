import React, { useState, useCallback } from 'react';
import { TravellerDetails } from '@/context/TravelFormContext';
import { usePincodeSearch } from '@/hooks/usePincodeSearch';
import PersonalInfoFields from './PersonalInfoFields';
import ContactInfoFields from './ContactInfoFields';
import { useIsMobile } from '@/hooks/use-mobile';

interface TravellerFormProps {
  traveller: TravellerDetails;
  index: number;
  updateTraveller: (index: number, details: Partial<TravellerDetails>) => void;
  errors: { [key: string]: string };
  handleDateChange: (index: number, date: Date | undefined) => void;
}

const TravellerForm: React.FC<TravellerFormProps> = React.memo(({
  traveller,
  index,
  updateTraveller,
  errors,
  handleDateChange
}) => {
  const { searchCityByPincode, isLoading } = usePincodeSearch();
  const [autoFilled, setAutoFilled] = useState(false);
  const [lastFetchedPincode, setLastFetchedPincode] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handlePincodeChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 6);
    updateTraveller(index, { pincode: value });

    if (
      value.length === 6 &&
      value !== lastFetchedPincode
    ) {
      setLastFetchedPincode(value);
      const locationData = await searchCityByPincode(value);

      if (locationData) {
        updateTraveller(index, {
          city: locationData.cityName,
          locationData: {
            stateId: locationData.stateId,
            districtId: locationData.districtId,
            cityId: locationData.cityId,
            cityName: locationData.cityName,
            _id: locationData._id // Store the _id in traveller's locationData
          }
        });
        setAutoFilled(true);
        setTimeout(() => setAutoFilled(false), 3000);
      }
    }
  }, [index, lastFetchedPincode, searchCityByPincode, updateTraveller]);

  // Updated input handlers with validation
  const handleForenameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    updateTraveller(index, { forename: value });
  }, [index, updateTraveller]);

  const handleLastnameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    updateTraveller(index, { lastname: value });
  }, [index, updateTraveller]);

  const handlePassportChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTraveller(index, { passportNumber: e.target.value.slice(0, 10) });
  }, [index, updateTraveller]);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTraveller(index, { address: e.target.value });
  }, [index, updateTraveller]);

  const handleMobileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 10);
    updateTraveller(index, { mobileNo: value });
  }, [index, updateTraveller]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    updateTraveller(index, { email: e.target.value });
  }, [index, updateTraveller]);

  const handleSalutationChange = useCallback((value: string) => {
    // Set the gender based on salutation
    let gender = traveller.gender;
    if (value === "Mr") {
      gender = "Male";
    } else if (value === "Mrs" || value === "Ms") {
      gender = "Female";
    }
    
    // Update both salutation and gender
    updateTraveller(index, { 
      salutation: value,
      gender: gender
    });
  }, [index, updateTraveller, traveller.gender]);

  const handleGenderChange = useCallback((value: string) => {
    updateTraveller(index, { gender: value });
  }, [index, updateTraveller]);

  return (
    <div className="mb-8 md:mb-12">
      <h3 className="text-lg md:text-xl font-medium mb-4 md:mb-6">Traveller {index + 1} Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6" onClick={(e) => e.stopPropagation()}>
        <PersonalInfoFields
          index={index}
          traveller={traveller}
          errors={errors}
          onSalutationChange={handleSalutationChange}
          onForenameChange={handleForenameChange}
          onLastnameChange={handleLastnameChange}
          onGenderChange={handleGenderChange}
          onPassportChange={handlePassportChange}
        />
        
        <ContactInfoFields
          index={index}
          traveller={traveller}
          errors={errors}
          onAddressChange={handleAddressChange}
          onPincodeChange={handlePincodeChange}
          onMobileChange={handleMobileChange}
          onEmailChange={handleEmailChange}
          isLoadingPincode={isLoading}
        />
      </div>
    </div>
  );
});

TravellerForm.displayName = 'TravellerForm';

export default TravellerForm;
