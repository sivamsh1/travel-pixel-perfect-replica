
import React from 'react';
import SelectField from './SelectField';
import InputField from './InputField';

interface PersonalDetailsSectionProps {
  index: number;
  salutation: string;
  forename: string;
  lastname: string;
  passportNumber: string;
  gender: string;
  dob: string;
  handleForenameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLastnameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePassportChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSalutationChange: (value: string) => void;
  handleGenderChange: (value: string) => void;
  errors: { [key: string]: string };
}

const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  index,
  salutation,
  forename,
  lastname,
  passportNumber,
  gender,
  dob,
  handleForenameChange,
  handleLastnameChange,
  handlePassportChange,
  handleSalutationChange,
  handleGenderChange,
  errors
}) => {
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
    <>
      <SelectField
        label="Salutation"
        value={salutation}
        onChange={handleSalutationChange}
        options={salutationOptions}
        placeholder="Select salutation"
        required
        error={errors[`traveller${index}Salutation`]}
      />

      <InputField
        label="Forename"
        value={forename}
        onChange={handleForenameChange}
        required
        error={errors[`traveller${index}Forename`]}
      />

      <InputField
        label="Lastname"
        value={lastname}
        onChange={handleLastnameChange}
        required
        error={errors[`traveller${index}Lastname`]}
      />

      <InputField
        label="Passport Number"
        value={passportNumber}
        onChange={handlePassportChange}
        required
        maxLength={10}
        error={errors[`traveller${index}Passport`]}
      />

      <SelectField
        label="Gender"
        value={gender}
        onChange={handleGenderChange}
        options={genderOptions}
        placeholder="Select gender"
        required
        error={errors[`traveller${index}Gender`]}
      />

      <InputField
        label="Date of Birth"
        value={dob}
        onChange={() => {}}
        readOnly
        disabled
      />
    </>
  );
};

export default PersonalDetailsSection;
