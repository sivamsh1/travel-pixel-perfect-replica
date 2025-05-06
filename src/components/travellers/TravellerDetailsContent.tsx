
import React, { useCallback } from 'react';
import TravellerForm from './TravellerForm';
import NomineeForm from './NomineeForm';
import MedicalConditionSelector from './MedicalConditionSelector';
import ProposerForm from './ProposerForm';
import TripSummary from './TripSummary';
import ActionButton from '@/components/ActionButton';
import { useTravellerDetails } from '@/hooks/useTravellerDetails';
import { useIsMobile } from '@/hooks/use-mobile';

interface TravellerDetailsContentProps {
  onContinue: () => void;
}

const TravellerDetailsContent: React.FC<TravellerDetailsContentProps> = React.memo(({
  onContinue
}) => {
  const isMobile = useIsMobile();
  
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

  const handleContinueClick = useCallback(() => {
    onContinue();
  }, [onContinue]);

  return (
    <div 
      className="flex flex-1 flex-col items-center px-3 md:px-6 max-w-4xl mx-auto w-full" 
      onClick={e => e.stopPropagation()}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Travellers Details</h2>
      
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
        
        <NomineeForm nominee={nominee} updateNominee={updateNominee} errors={errors} />
        
        <MedicalConditionSelector 
          traveller={travellers[0]} 
          updateTraveller={updateTraveller} 
          travellerIndex={0} 
        />
        
        <ProposerForm proposer={proposer} updateProposer={updateProposer} errors={errors} />
        
        <div className="flex justify-center mt-8 md:mt-12 pb-6 md:pb-0">
          <ActionButton 
            onClick={handleContinueClick}
            className={isMobile ? "w-full" : ""}
          >
            Continue
          </ActionButton>
        </div>
      </div>
    </div>
  );
});

TravellerDetailsContent.displayName = 'TravellerDetailsContent';

export default TravellerDetailsContent;
