
import React from 'react';
import { ChevronDown } from 'lucide-react';

interface RegionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const RegionSelector = ({ value, onChange }: RegionSelectorProps) => {
  return (
    <div className="relative">
      <select
        className="w-full p-3 border border-primary rounded-md appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled>Travel Region</option>
        <option value="Student Overseas | Excluding USA and CANADA">Student Overseas | Excluding USA and CANADA</option>
        <option value="Student Overseas | Including USA and CANADA (Worldwide)">Student Overseas | Including USA and CANADA (Worldwide)</option>
      </select>
      <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default RegionSelector;
