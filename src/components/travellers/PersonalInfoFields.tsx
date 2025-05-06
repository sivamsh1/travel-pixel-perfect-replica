
import React from 'react';
import SelectField from './SelectField';
import InputField from './InputField';
import { useIsMobile } from '@/hooks/use-mobile';

interface PersonalInfoFieldsProps {
  index: number;
  traveller: {
    salutation?: string;
    forename?: string;
    lastname?: string;
    gender?: string;
    passportNumber?: string;
    dob?: string;
  };
  errors: { [key: string]: string };
  onSalutationChange: (value: string) => void;
  onForenameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLastnameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGenderChange: (value: string) => void;
  onPassportChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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

const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  index,
  traveller,
  errors,
  onSalutationChange,
  onForenameChange,
  onLastnameChange,
  onGenderChange,
  onPassportChange
}) => {
  const isMobile = useIsMobile();
  
  return (
    <>
      <SelectField
        id={`traveller${index}Salutation`}
        label="Title"
        value={traveller.salutation || ''}
        onChange={onSalutationChange}
        options={salutationOptions}
        placeholder="Select Title"
        required={true}
        error={errors[`traveller${index}Salutation`]}
      />

      <InputField
        id={`traveller${index}Forename`}
        label="First Name"
        value={traveller.forename || ''}
        onChange={onForenameChange}
        required={true}
        error={errors[`traveller${index}Forename`]}
      />

      <InputField
        id={`traveller${index}Lastname`}
        label="Lastname"
        value={traveller.lastname || ''}
        onChange={onLastnameChange}
        required={true}
        error={errors[`traveller${index}Lastname`]}
      />

      <InputField
        id={`traveller${index}Passport`}
        label="Passport Number"
        value={traveller.passportNumber || ''}
        onChange={onPassportChange}
        required={true}
        maxLength={10}
        error={errors[`traveller${index}Passport`]}
      />

      <SelectField
        id={`traveller${index}Gender`}
        label="Gender"
        value={traveller.gender || ''}
        onChange={onGenderChange}
        options={genderOptions}
        placeholder="Select gender"
        required={true}
        error={errors[`traveller${index}Gender`]}
      />

      <InputField
        id={`traveller${index}Dob`}
        label="Date of Birth"
        value={traveller.dob || ''}
        onChange={() => {}}
        readOnly
        disabled
        required={true}
        error={errors[`traveller${index}Dob`]}
      />
    </>
  );
};

export default PersonalInfoFields;
