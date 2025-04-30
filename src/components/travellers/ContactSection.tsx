
import React from 'react';
import InputField from './InputField';
import PincodeField from './PincodeField';

interface ContactSectionProps {
  index: number;
  address: string;
  pincode: string;
  city: string;
  mobileNo: string;
  email: string;
  handleAddressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePincodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMobileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoadingPincode: boolean;
  errors: { [key: string]: string };
}

const ContactSection: React.FC<ContactSectionProps> = ({
  index,
  address,
  pincode,
  city,
  mobileNo,
  email,
  handleAddressChange,
  handlePincodeChange,
  handleMobileChange,
  handleEmailChange,
  isLoadingPincode,
  errors
}) => {
  return (
    <>
      <InputField
        label="Address"
        value={address}
        onChange={handleAddressChange}
      />

      <PincodeField
        value={pincode}
        onChange={handlePincodeChange}
        isLoading={isLoadingPincode}
        error={errors[`traveller${index}Pincode`]}
      />

      <InputField
        label="City"
        value={city}
        onChange={() => {}}
        readOnly
        disabled
      />

      <InputField
        label="Mobile No."
        type="tel"
        value={mobileNo}
        onChange={handleMobileChange}
        maxLength={10}
        error={errors[`traveller${index}Mobile`]}
      />

      <InputField
        label="Email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={errors[`traveller${index}Email`]}
      />
    </>
  );
};

export default ContactSection;
