
import React from 'react';
import { NomineeDetails } from '@/context/TravelFormContext';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { DatePicker } from "@/components/DatePicker";
import { differenceInYears } from 'date-fns';
import { toast } from "@/components/ui/use-toast";

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
  const [dobError, setDobError] = React.useState<string>("");

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      // Check if nominee is at least 18 years old
      const age = differenceInYears(new Date(), date);
      
      if (age < 18) {
        setDobError("Nominee must be at least 18 years old.");
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

  const parseDOB = (dateString?: string): Date | undefined => {
    if (!dateString) return undefined;
    
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
    
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date : undefined;
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
            <SelectContent>
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
          />
        </div>
      </div>
    </div>
  );
};

export default NomineeForm;
