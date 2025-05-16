import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
interface PlanFiltersProps {
  travellersCount: number;
  formattedStartDate: string;
  formattedEndDate: string;
  selectedInsurer: string;
  selectedPriceSort: string;
  selectedCoverage: string;
  onInsurerChange: (value: string) => void;
  onPriceSortChange: (value: string) => void;
  onCoverageChange: (value: string) => void;
  onResetFilters: () => void;
  filteredPlansCount: number;
  isAnyFilterActive: boolean;
}
const PlanFilters: React.FC<PlanFiltersProps> = ({
  travellersCount,
  formattedStartDate,
  formattedEndDate,
  selectedInsurer,
  selectedPriceSort,
  selectedCoverage,
  onInsurerChange,
  onPriceSortChange,
  onCoverageChange,
  onResetFilters,
  filteredPlansCount,
  isAnyFilterActive
}) => {
  const isMobile = useIsMobile();
  return <div className="w-full py-0 my-0">
      <div className="border border-[#0FB1F6] rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-700">
            Summary: {travellersCount} Traveller(s) | {formattedStartDate} - {formattedEndDate} <span className="text-[#0FB1F6] cursor-pointer">Edit &gt;</span>
          </div>
          <div className="text-xs text-gray-500">
            All prices are inclusive of GST
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By Premium</label>
            <Select value={selectedPriceSort} onValueChange={onPriceSortChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Low - High" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lowToHigh">Low - High</SelectItem>
                <SelectItem value="highToLow">High - Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-[#0FB1F6] mb-1">Coverage</label>
            <Select value={selectedCoverage} onValueChange={onCoverageChange}>
              <SelectTrigger className="w-full md:w-72 border-[#0FB1F6]">
                <SelectValue placeholder="Most Popular (1 Lakh USD)" className="text-[#0FB1F6]" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="show-all" className="font-semibold">Show All</SelectItem>
                <SelectItem value="most-popular" className="font-semibold">Most Popular (1 Lakh USD)</SelectItem>
                <SelectItem value="30k-50k">30,000 USD to 50,000 USD</SelectItem>
                <SelectItem value="50k-75k">50,000 USD to 75,000 USD</SelectItem>
                <SelectItem value="75k-1L">75,000 USD to 1 Lakh USD</SelectItem>
                <SelectItem value="1L-2L">1 Lakh USD to 2 Lakhs USD</SelectItem>
                <SelectItem value="2L+">Above 2 Lakhs USD</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto">
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurer</label>
            <Select value={selectedInsurer} onValueChange={onInsurerChange}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select Insurer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Select Insurer</SelectItem>
                <SelectItem value="Reliance">Reliance</SelectItem>
                <SelectItem value="GoDigit">Go Digit</SelectItem>
                <SelectItem value="Bajaj">Bajaj</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full md:w-auto mt-auto">
            <Button variant="outline" onClick={onResetFilters} disabled={!isAnyFilterActive} className="w-full md:w-auto bg-[#F5F5F5] hover:bg-gray-200 border-gray-200">
              <RotateCcw className="mr-2 h-4 w-4" /> 
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
      
      
    </div>;
};
export default PlanFilters;