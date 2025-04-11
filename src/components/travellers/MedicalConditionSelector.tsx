
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { TravellerDetails } from '@/context/TravelFormContext';

interface MedicalConditionSelectorProps {
  traveller: TravellerDetails;
  updateTraveller: (index: number, details: Partial<TravellerDetails>) => void;
  travellerIndex: number;
}

const MedicalConditionSelector: React.FC<MedicalConditionSelectorProps> = ({
  traveller,
  updateTraveller,
  travellerIndex
}) => {
  return (
    <div className="mb-8">
      <div className="text-base font-medium mb-2">Does the traveller have a pre-existing medical condition?</div>
      <div className="flex space-x-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="medical-yes" 
            checked={traveller?.hasPreExistingCondition === true}
            onCheckedChange={() => updateTraveller(travellerIndex, { hasPreExistingCondition: true })}
          />
          <label htmlFor="medical-yes" className="text-sm text-gray-700">Yes</label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="medical-no" 
            checked={traveller?.hasPreExistingCondition === false}
            onCheckedChange={() => updateTraveller(travellerIndex, { hasPreExistingCondition: false })}
          />
          <label htmlFor="medical-no" className="text-sm text-gray-700">No</label>
        </div>
      </div>
    </div>
  );
};

export default MedicalConditionSelector;
