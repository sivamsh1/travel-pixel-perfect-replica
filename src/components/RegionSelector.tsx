
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RegionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const RegionSelector = ({ value, onChange }: RegionSelectorProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <select
        className={cn(
          "w-full h-12 px-3 py-3 border rounded-md appearance-none pr-10 focus:outline-none focus:ring-2 text-base md:text-sm font-jost",
          value ? "border-primary focus:ring-primary" : "border-red-300 focus:ring-red-500"
        )}
        value={value}
        onChange={handleChange}
        aria-required="true"
      >
        <option value="" disabled>Travel Region</option>
        <option value="Student Overseas | Excluding USA and CANADA">Student Overseas | Excluding USA and CANADA</option>
        <option value="Student Overseas | Including USA and CANADA (Worldwide)">Student Overseas | Including USA and CANADA (Worldwide)</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default RegionSelector;
