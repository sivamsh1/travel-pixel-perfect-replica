import React, { useState, useCallback } from 'react';
import { NomineeDetails } from '@/context/TravelFormContext';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/DatePicker";
import { differenceInYears, subYears } from 'date-fns';
import { toast } from "@/components/ui/use-toast";
import { parseDOB } from '@/utils/travellerUtils';
import InputField from './InputField';
import FormField from './FormField';

interface NomineeFormProps {
  nominee: NomineeDetails;
  updateNominee: (details: Partial<NomineeDetails>) => void;
  errors?: { [key: string]: string };
}

const RELATIONSHIP_OPTIONS = [
  "father",
  "self",
  "mother",
  "son",
  "daughter",
  "sister",
  "brother",
  "spouse",
  "employee",
  "others",
  "Daughter in Law",
  "Grand Child",
  "Husband"
];

const NomineeForm: React.FC<NomineeFormProps> = React.memo(({
  nominee,
  updateNominee,
  errors = {}
}) => {
  const [dobError, setDobError] = useState<string>("");

  const handleDateChange = useCallback((date: Date | undefined) => {
    if (date) {
      // Check if nominee is at least 18 years old
      const age = differenceInYears(new Date(), date);
      
      if (age < 18) {
        setDobError("`");
        toast({
          title: "Age Restriction",
          description: "Nominee must be at least 18 years old.",
          variant: "destructive"
        });
        // Still update the DOB value even if under 18, to show the selection to the user
        const formattedDate = date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
        updateNominee({ dob: formattedDate });
      } else {
        setDobError("");
        const formattedDate = date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
        updateNominee({ dob: formattedDate });
      }
    } else {
      updateNominee({ dob: undefined });
      setDobError("");
    }
  }, [updateNominee]);

  // Updated name change handler
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow letters and spaces
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    updateNominee({ name: value });
  }, [updateNominee]);

  // Handle relationship change
  const handleRelationshipChange = useCallback((val: string) => {
    updateNominee({ relationship: val });
  }, [updateNominee]);

  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium mb-6">Nominee Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onClick={(e) => e.stopPropagation()}>
        <InputField
          label="Nominee Name"
          value={nominee.name || ''}
          onChange={handleNameChange}
          error={errors.nomineeName}
          id="nomineeName"
        />
        
        <div>
          <FormField label="Nominee Relationship" error={errors.nomineeRelationship}>
            <Select
              value={nominee.relationship || ""}
              onValueChange={handleRelationshipChange}
            >
              <SelectTrigger 
                id="nomineeRelationship"
                className={`w-full h-12 p-3 border ${errors.nomineeRelationship ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-base`}
                aria-invalid={!!errors.nomineeRelationship}
              >
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-[300px] z-[9999]">
                {RELATIONSHIP_OPTIONS.map((relation) => (
                  <SelectItem key={relation} value={relation}>
                       {relation.charAt(0).toUpperCase() + relation.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
        </div>
        
        <div>
          <FormField label="Nominee Date of Birth" error={errors.nomineeDob || dobError}>
            <DatePicker
              value={parseDOB(nominee.dob)}
              onChange={handleDateChange}
              placeholder="Select date"
              error={errors.nomineeDob || dobError}
              className={`w-full h-12 ${errors.nomineeDob || dobError ? 'border-red-500 ring-1 ring-red-500' : ''}`}
              minDate={subYears(new Date(), 100)} // 100 years ago
              disableFuture
              id="nomineeDob"
            />
          </FormField>
        </div>
      </div>
    </div>
  );
});

NomineeForm.displayName = 'NomineeForm';

export default NomineeForm;
