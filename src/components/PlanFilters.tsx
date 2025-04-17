
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useIsMobile } from '@/hooks/use-mobile';

interface PlanFiltersProps {
  travellersCount: number;
  formattedStartDate: string;
  formattedEndDate: string;
  selectedInsurer: string;
  selectedPriceSort: string;
  onInsurerChange: (value: string) => void;
  onPriceSortChange: (value: string) => void;
}

const PlanFilters: React.FC<PlanFiltersProps> = ({ 
  travellersCount, 
  formattedStartDate, 
  formattedEndDate,
  selectedInsurer,
  selectedPriceSort,
  onInsurerChange,
  onPriceSortChange
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="w-full mb-4">
      <div className="text-sm text-gray-700 mb-4">
        Summary: {travellersCount} Traveller(s) | {formattedStartDate} - {formattedEndDate} <span className="text-primary">Edit &gt;</span>
      </div>
      
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 mb-6`}>
        <div className={isMobile ? 'w-full' : 'w-1/2'}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Insurers</label>
          <Select value={selectedInsurer} onValueChange={onInsurerChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="GoDigit">GoDigit</SelectItem>
              <SelectItem value="Reliance">Reliance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className={isMobile ? 'w-full' : 'w-1/2'}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <Select value={selectedPriceSort} onValueChange={onPriceSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="lowToHigh">Low to High</SelectItem>
              <SelectItem value="highToLow">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PlanFilters;
