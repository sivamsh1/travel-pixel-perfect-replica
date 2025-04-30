
import React, { useState } from 'react';
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

interface NomineeFormProps {
  nominee: NomineeDetails;
  updateNominee: (details: Partial<NomineeDetails>) => void;
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

const NomineeForm: React.FC<NomineeFormProps> = ({
  nominee,
  updateNominee
}) => {
  const [dobError, setDobError] = useState<string>("");

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      // Check if nominee is at least 18 years old
      const age = differenceInYears(new Date(), date);
      
      if (age < 18) {
        setDobError("Nominee must be at least 18 years old.");
        toast({
          title: "Age Restriction",
          description: "Nominee must be at least 18 years old.",
          variant: "destructive"
        });
        updateNominee({ dob: undefined });
        return;
      } else {
        setDobError("");
        const formattedDate = date.toLocaleDateString('en-GB'); // Format as DD/MM/YYYY
        updateNominee({ dob: formattedDate });
      }
    } else {
      updateNominee({ dob: undefined });
      setDobError("");
    }
  };

  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium mb-6">Nominee Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-12"
            value={nominee.name || ''}
            onChange={(e) => updateNominee({ name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Relationship</label>
          <Select
            value={nominee.relationship || ""}
            onValueChange={(val) => updateNominee({ relationship: val })}
          >
            <SelectTrigger className="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-base">
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent position="popper" className="max-h-[300px] z-50">
              {RELATIONSHIP_OPTIONS.map((relation) => (
                <SelectItem key={relation} value={relation}>
                     {relation.charAt(0).toUpperCase() + relation.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Date of Birth</label>
          <DatePicker
            value={parseDOB(nominee.dob)}
            onChange={handleDateChange}
            placeholder="Select date"
            error={dobError}
            className="w-full h-12"
            minDate={subYears(new Date(), 100)} // 100 years ago
            maxDate={subYears(new Date(), 18)}  // 18 years ago
            disableFuture
          />
        </div>
      </div>
    </div>
  );
};

export default NomineeForm;
