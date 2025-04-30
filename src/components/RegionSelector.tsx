
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface RegionSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const RegionSelector = ({ value, onChange }: RegionSelectorProps) => {
  const isMobile = useIsMobile();
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative w-full">
      <select
        className={cn(
          "w-full h-12 px-3 py-3 border rounded-md appearance-none pr-10 focus:outline-none focus:ring-2",
          isMobile ? "text-base" : "text-base md:text-sm",
          "font-jost",
          value ? "border-primary focus:ring-primary" : "border-primary border-opacity-50 focus:ring-primary"
        )}
        value={value}
        onChange={handleChange}
        aria-required="true"
      >
        <option value="" disabled>Travel Region</option>
        <option value="Student Overseas | Excluding USA and CANADA">Geographical Coverage | Excluding USA and CANADA</option>
        <option value="Student Overseas | Including USA and CANADA (Worldwide)">Geographical Coverage | Including USA and CANADA (Worldwide)</option>
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default RegionSelector;
