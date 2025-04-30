import React, { useState, useEffect, useCallback } from 'react';
import { TravellerDetails } from '@/context/TravelFormContext';
import { usePincodeSearch } from '@/hooks/usePincodeSearch';
import SelectField from './SelectField';
import InputField from './InputField';
import PincodeField from './PincodeField';

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

  // Use a stable function for input change handlers
  const createInputChangeHandler = useCallback((field: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      updateTraveller(index, { [field]: e.target.value });
    };
  }, [index, updateTraveller]);

  // Use a stable function for select change handlers
  const createSelectChangeHandler = useCallback((field: string) => {
    return (value: string) => {
      updateTraveller(index, { [field]: value });
    };
  }, [index, updateTraveller]);

  // Auto-update gender based on salutation - always update when salutation changes
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

  const salutationOptions = [
    { value: "Mr", label: "Mr" },
    { value: "Mrs", label: "Mrs" },
    { value: "Ms", label: "Ms" },
    { value: "Dr", label: "Dr" }
  ];

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" }
  ];

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

  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium mb-6">Traveller {index + 1} Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onClick={(e) => e.stopPropagation()}>
        <SelectField
          label="Salutation"
          value={traveller.salutation || ''}
          onChange={handleSalutationChange}
          options={salutationOptions}
          placeholder="Select salutation"
          required
          error={errors[`traveller${index}Salutation`]}
        />

        <InputField
          label="Forename"
          value={traveller.forename || ''}
          onChange={handleForenameChange}
          required
          error={errors[`traveller${index}Forename`]}
        />

        <InputField
          label="Lastname"
          value={traveller.lastname || ''}
          onChange={handleLastnameChange}
          required
          error={errors[`traveller${index}Lastname`]}
        />

        <InputField
          label="Passport Number"
          value={traveller.passportNumber || ''}
          onChange={handlePassportChange}
          required
          maxLength={10}
          error={errors[`traveller${index}Passport`]}
        />

        <SelectField
          label="Gender"
          value={traveller.gender || ''}
          onChange={handleGenderChange}
          options={genderOptions}
          placeholder="Select gender"
          required
          error={errors[`traveller${index}Gender`]}
        />

        <InputField
          label="Date of Birth"
          value={traveller.dob || ''}
          onChange={() => {}}
          readOnly
          disabled
        />

        <InputField
          label="Address"
          value={traveller.address || ''}
          onChange={handleAddressChange}
        />

        <PincodeField
          value={traveller.pincode || ''}
          onChange={handlePincodeChange}
          isLoading={isLoading}
          error={errors[`traveller${index}Pincode`]}
        />

        <InputField
          label="City"
          value={traveller.city || ''}
          onChange={() => {}}
          readOnly
          disabled
        />

        <InputField
          label="Mobile No."
          type="tel"
          value={traveller.mobileNo || ''}
          onChange={handleMobileChange}
          maxLength={10}
          error={errors[`traveller${index}Mobile`]}
        />

        <InputField
          label="Email"
          type="email"
          value={traveller.email || ''}
          onChange={handleEmailChange}
          error={errors[`traveller${index}Email`]}
        />
      </div>
    </div>
  );
});

TravellerForm.displayName = 'TravellerForm';

export default TravellerForm;
