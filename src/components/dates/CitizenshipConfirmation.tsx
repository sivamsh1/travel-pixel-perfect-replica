
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";

interface CitizenshipConfirmationProps {
  isIndianCitizen: boolean | undefined;
  onCitizenshipChange: (checked: boolean | "indeterminate") => void;
  eligibilityError: string;
}

const CitizenshipConfirmation = ({
  isIndianCitizen,
  onCitizenshipChange,
  eligibilityError
}: CitizenshipConfirmationProps) => {
  return (
    <div className="flex items-start space-x-3 p-4 rounded-md border border-gray-200 shadow-sm bg-white">
      <Checkbox 
        id="citizenship" 
        className="mt-1" 
        checked={isIndianCitizen || false} 
        onCheckedChange={onCitizenshipChange} 
      />
      <div className="space-y-1">
        <label htmlFor="citizenship" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Is the Traveller an Indian Citizen and currently in India whilst taking the policy?
        </label>
        {eligibilityError && <p className="text-sm text-destructive">{eligibilityError}</p>}
      </div>
    </div>
  );
};

export default CitizenshipConfirmation;
