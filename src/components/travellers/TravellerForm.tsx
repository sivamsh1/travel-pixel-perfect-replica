
import React from 'react';
import { TravellerDetails } from '@/context/TravelFormContext';
import { useTravellerForm } from '@/hooks/useTravellerForm';
import PersonalDetailsSection from './PersonalDetailsSection';
import ContactSection from './ContactSection';

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
  errors
}) => {
  const {
    isLoadingPincode,
    handlePincodeChange,
    handleForenameChange,
    handleLastnameChange,
    handlePassportChange,
    handleAddressChange,
    handleMobileChange,
    handleEmailChange,
    handleSalutationChange,
    handleGenderChange
  } = useTravellerForm(traveller, index, updateTraveller);

  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium mb-6">Traveller {index + 1} Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onClick={(e) => e.stopPropagation()}>
        <PersonalDetailsSection
          index={index}
          salutation={traveller.salutation || ''}
          forename={traveller.forename || ''}
          lastname={traveller.lastname || ''}
          passportNumber={traveller.passportNumber || ''}
          gender={traveller.gender || ''}
          dob={traveller.dob || ''}
          handleForenameChange={handleForenameChange}
          handleLastnameChange={handleLastnameChange}
          handlePassportChange={handlePassportChange}
          handleSalutationChange={handleSalutationChange}
          handleGenderChange={handleGenderChange}
          errors={errors}
        />

        <ContactSection
          index={index}
          address={traveller.address || ''}
          pincode={traveller.pincode || ''}
          city={traveller.city || ''}
          mobileNo={traveller.mobileNo || ''}
          email={traveller.email || ''}
          handleAddressChange={handleAddressChange}
          handlePincodeChange={handlePincodeChange}
          handleMobileChange={handleMobileChange}
          handleEmailChange={handleEmailChange}
          isLoadingPincode={isLoadingPincode}
          errors={errors}
        />
      </div>
    </div>
  );
});

TravellerForm.displayName = 'TravellerForm';

export default TravellerForm;
