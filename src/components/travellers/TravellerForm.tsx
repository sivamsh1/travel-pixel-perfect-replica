
import React, { useState, useEffect } from 'react';
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

const TravellerForm: React.FC<TravellerFormProps> = ({
  traveller,
  index,
  updateTraveller,
  errors,
  handleDateChange
}) => {
  const { searchCityByPincode, isLoading } = usePincodeSearch();
  const [autoFilled, setAutoFilled] = useState(false);
  const [lastFetchedPincode, setLastFetchedPincode] = useState<string | null>(null);

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

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

  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium mb-6">Traveller {index + 1} Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SelectField
          label="Salutation"
          value={traveller.salutation || ''}
          onChange={(value) => updateTraveller(index, { salutation: value })}
          options={salutationOptions}
          placeholder="Select salutation"
          required
          error={errors[`traveller${index}Salutation`]}
        />

        <InputField
          label="Forename"
          value={traveller.forename || ''}
          onChange={(e) => updateTraveller(index, { forename: e.target.value })}
          required
          error={errors[`traveller${index}Forename`]}
        />

        <InputField
          label="Lastname"
          value={traveller.lastname || ''}
          onChange={(e) => updateTraveller(index, { lastname: e.target.value })}
          required
          error={errors[`traveller${index}Lastname`]}
        />

        <InputField
          label="Passport Number"
          value={traveller.passportNumber || ''}
          onChange={(e) => updateTraveller(index, { passportNumber: e.target.value.slice(0, 10) })}
          required
          maxLength={10}
          error={errors[`traveller${index}Passport`]}
        />

        <SelectField
          label="Gender"
          value={traveller.gender || ''}
          onChange={(value) => updateTraveller(index, { gender: value })}
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
          onChange={(e) => updateTraveller(index, { address: e.target.value })}
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
          onChange={(e) => updateTraveller(index, { mobileNo: e.target.value })}
          maxLength={10}
          error={errors[`traveller${index}Mobile`]}
        />

        <InputField
          label="Email"
          type="email"
          value={traveller.email || ''}
          onChange={(e) => updateTraveller(index, { email: e.target.value })}
          error={errors[`traveller${index}Email`]}
        />
      </div>
    </div>
  );
};

export default TravellerForm;
