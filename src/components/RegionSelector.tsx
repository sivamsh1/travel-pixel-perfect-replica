
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RegionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const RegionSelector = ({ value, onChange }: RegionSelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full border border-gray-200 rounded-lg h-14 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white">
        <SelectValue placeholder="Travel Region" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        <SelectItem value="Student Overseas | Excluding USA and CANADA">
          Student Overseas | Excluding USA and CANADA
        </SelectItem>
        <SelectItem value="Student Overseas | Including USA and CANADA (Worldwide)">
          Student Overseas | Including USA and CANADA (Worldwide)
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default RegionSelector;
