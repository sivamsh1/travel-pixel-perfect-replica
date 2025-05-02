
import React from 'react';
import InputField from './InputField';
import PincodeField from './PincodeField';

interface ContactInfoFieldsProps {
  index: number;
  traveller: {
    address?: string;
    pincode?: string;
    city?: string;
    mobileNo?: string;
    email?: string;
  };
  errors: { [key: string]: string };
  onAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPincodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMobileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoadingPincode: boolean;
}

const ContactInfoFields: React.FC<ContactInfoFieldsProps> = ({
  index,
  traveller,
  errors,
  onAddressChange,
  onPincodeChange,
  onMobileChange,
  onEmailChange,
  isLoadingPincode
}) => {
  return (
    <>
      <InputField
        id={`traveller${index}Address`}
        label="Address"
        value={traveller.address || ''}
        onChange={onAddressChange}
      />

      <PincodeField
        id={`traveller${index}Pincode`}
        value={traveller.pincode || ''}
        onChange={onPincodeChange}
        isLoading={isLoadingPincode}
        error={errors[`traveller${index}Pincode`]}
      />

      <InputField
        id={`traveller${index}City`}
        label="City"
        value={traveller.city || ''}
        onChange={() => {}}
        readOnly
        disabled
      />

      <InputField
        id={`traveller${index}Mobile`}
        label="Mobile No."
        type="tel"
        value={traveller.mobileNo || ''}
        onChange={onMobileChange}
        maxLength={10}
        error={errors[`traveller${index}Mobile`]}
      />

      <InputField
        id={`traveller${index}Email`}
        label="Email"
        type="email"
        value={traveller.email || ''}
        onChange={onEmailChange}
        error={errors[`traveller${index}Email`]}
      />
    </>
  );
};

export default ContactInfoFields;
