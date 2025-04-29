import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
interface CitizenshipCheckboxProps {
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
  errorMessage?: string;
}
const CitizenshipCheckbox: React.FC<CitizenshipCheckboxProps> = ({
  isChecked,
  onCheckedChange,
  errorMessage
}) => {
  return <div className="flex items-start space-x-3 pt-4 pb-4">
      <Checkbox id="indian-citizen" checked={isChecked} onCheckedChange={onCheckedChange} className="mt-0.5" />
      <div className="flex flex-col">
        <label htmlFor="indian-citizen" className="text-sm font-medium leading-none cursor-pointer px-[4px] my-0 py-[7px]">Is the Traveller an Indian Citizen and currently in India whilst taking the policy?  ( Note: NRI, OCI/non-OCI customers should not be allowed.)</label>
        {errorMessage && <span className="text-sm text-destructive mt-1">{errorMessage}</span>}
      </div>
    </div>;
};
export default CitizenshipCheckbox;