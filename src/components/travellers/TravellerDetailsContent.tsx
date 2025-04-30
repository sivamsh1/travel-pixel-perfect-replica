
import React, { useEffect } from 'react';
import TravellerForm from './TravellerForm';
import NomineeForm from './NomineeForm';
import MedicalConditionSelector from './MedicalConditionSelector';
import ProposerForm from './ProposerForm';
import TripSummary from './TripSummary';
import ActionButton from '@/components/ActionButton';
import { useTravellerDetails } from '@/hooks/useTravellerDetails';

interface TravellerDetailsContentProps {
  onContinue: () => void;
}

const TravellerDetailsContent: React.FC<TravellerDetailsContentProps> = ({ onContinue }) => {
  const {
    travellers,
    nominee,
    proposer,
    updateTraveller,
    updateNominee,
    updateProposer,
    formattedStartDate,
    formattedEndDate,
    errors,
    handleDateChange
  } = useTravellerDetails();

  // Update name field when forename or lastname changes
  useEffect(() => {
    travellers.forEach((traveller, index) => {
      if (traveller.forename && traveller.lastname) {
        const fullName = `${traveller.forename} ${traveller.lastname}`;
        if (fullName !== traveller.name) {
          updateTraveller(index, { name: fullName });
        }
      }
    });
  }, [travellers]);

  return (
    <div className="flex flex-1 flex-col items-center px-6 max-w-4xl mx-auto w-full">
      <h2 className="text-3xl font-bold mb-6">Travellers Details</h2>
      
      <TripSummary 
        travellerCount={travellers.length}
        startDateFormatted={formattedStartDate}
        endDateFormatted={formattedEndDate}
      />
      
      <div className="w-full">
        {travellers.map((traveller, index) => (
          <TravellerForm
            key={index}
            traveller={traveller}
            index={index}
            updateTraveller={updateTraveller}
            errors={errors}
            handleDateChange={handleDateChange}
          />
        ))}
        
        <NomineeForm nominee={nominee} updateNominee={updateNominee} />
        
        <MedicalConditionSelector
          traveller={travellers[0]}
          updateTraveller={updateTraveller}
          travellerIndex={0}
        />
        
        <ProposerForm
          proposer={proposer}
          updateProposer={updateProposer}
          errors={errors}
        />
        
        <div className="flex justify-center mt-12">
          <ActionButton onClick={onContinue}>
            Continue to KYC Verification
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

export default TravellerDetailsContent;
