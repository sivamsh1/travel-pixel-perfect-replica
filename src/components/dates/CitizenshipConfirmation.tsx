import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CitizenshipConfirmationProps {
  isIndianCitizen: boolean | undefined;
  onCitizenshipChange: (value: string) => void;
  eligibilityError: string;
}

const CitizenshipConfirmation = ({
  isIndianCitizen,
  onCitizenshipChange,
  eligibilityError
}: CitizenshipConfirmationProps) => {
  return (
    <div className="p-4 rounded-md border border-gray-200 shadow-sm bg-white">
      <div className="space-y-3">
        <label className="text-sm font-medium leading-none">
        Is the traveller an Indian citizen and currently in India while buying this policy?
        </label>
        
        <RadioGroup 
          value={isIndianCitizen === true ? 'yes' : isIndianCitizen === false ? 'no' : ''} 
          onValueChange={onCitizenshipChange}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="citizenship-yes" />
            <label htmlFor="citizenship-yes" className="text-sm font-medium leading-none cursor-pointer">
              Yes
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="citizenship-no" />
            <label htmlFor="citizenship-no" className="text-sm font-medium leading-none cursor-pointer">
              No
            </label>
          </div>
        </RadioGroup>
        
        {eligibilityError && <p className="text-sm text-destructive mt-1">{eligibilityError}</p>}
      </div>
    </div>
  );
};

export default CitizenshipConfirmation;
