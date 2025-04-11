
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PlanFiltersProps {
  travellersCount: number;
  formattedStartDate: string;
  formattedEndDate: string;
}

const PlanFilters: React.FC<PlanFiltersProps> = ({ 
  travellersCount, 
  formattedStartDate, 
  formattedEndDate 
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full mb-4">
      <div className="text-sm text-gray-700 mb-4">
        Summary: {travellersCount} Traveller(s) | {formattedStartDate} - {formattedEndDate} <span className="text-primary">Edit &gt;</span>
      </div>
      
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 mb-6`}>
        <div className={isMobile ? 'w-full' : 'w-1/3'}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Insurers</label>
          <div className="relative">
            <select className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10 focus:outline-none">
              <option>All</option>
            </select>
            <ChevronDown className="absolute right-2 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className={isMobile ? 'w-full' : 'w-1/3'}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sum Insured</label>
          <div className="relative">
            <select className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10 focus:outline-none">
              <option>USD 50000</option>
            </select>
            <ChevronDown className="absolute right-2 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
        
        <div className={isMobile ? 'w-full' : 'w-1/3'}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <div className="relative">
            <select className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10 focus:outline-none">
              <option>All</option>
            </select>
            <ChevronDown className="absolute right-2 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanFilters;
