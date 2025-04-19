
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { PlanToCompare } from '@/components/ComparePopup';
import { useTravelForm } from '@/context/TravelFormContext';
import { saveToLocalStorage } from '@/utils/localStorageUtils';
import { formatDateForAPI } from '@/utils/dateFormatUtils';
import { toast } from '@/hooks/use-toast';

interface PlanActionsProps {
  plans: PlanToCompare[];
}

const PlanActions: React.FC<PlanActionsProps> = ({ plans }) => {
  const navigate = useNavigate();
  const { destination, startDate, endDate, travellers } = useTravelForm();

  const handleBuyNow = (planName: string, index: number) => {
    try {
      // Save selected plan data
      const plan = plans[index];
      const planData = {
        name: plan.name,
        provider: index === 0 ? 'AIG' : 'HDFC',
        price: index === 0 ? '₹ 3998' : '₹ 2500',
        details: index === 0 ? 'Multi Trip with Add-On' : 'Single Trip (Standard)',
        insurer: index === 0 ? 'AIG Multi Trip with Add-On' : 'HDFC Single Trip (Standard)',
        sumInsured: 'USD 50000'
      };
      
      // Save to localStorage
      saveToLocalStorage('selectedPlan', planData);
      
      // Safely format dates using formatDateForAPI utility
      const dob = travellers.map(traveller => {
        return traveller.dob ? formatDateForAPI(traveller.dob) : '';
      }).filter(Boolean);
      
      // Use formatDateForAPI for start and end dates
      const formattedStartDate = formatDateForAPI(startDate);
      const formattedEndDate = formatDateForAPI(endDate);
      
      // Create the data object to log
      const purchaseData = {
        destination: destination || "679e707834ecd414eb0004de",
        dob: dob.length ? dob : ["17/08/1997"],
        startDate: formattedStartDate || "19/06/2025",
        returnDate: formattedEndDate || "29/07/2025",
      };
      
      // Log the data as JSON
      console.log('Purchase data:', JSON.stringify(purchaseData, null, 2));
      
      // Navigate to the next page
      navigate('/addons');
      
    } catch (error) {
      console.error('Error processing plan selection:', error);
      toast({
        title: "Error",
        description: "There was a problem processing your selection. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <TableRow>
      <TableCell className="border-r">
        <div className="text-blue-600 font-bold">Pick this plan that best fits for you</div>
      </TableCell>
      {plans.map((plan, index) => (
        <TableCell key={index} className={`text-center ${index === 0 ? 'bg-[#f5faff]' : 'bg-[#fff9f5]'}`}>
          <div className="text-xs mb-2 text-gray-500">
            Have any query about this policy? Contact us
          </div>
          <Button 
            className={`${index === 0 ? 'bg-[#143d7a] hover:bg-[#143d7a]/80' : 'bg-[#FF6B35] hover:bg-[#FF6B35]/80'} cursor-pointer transition-colors`}
            size="sm"
            onClick={() => handleBuyNow(plan.name, index)}
          >
            Buy Now
          </Button>
        </TableCell>
      ))}
    </TableRow>
  );
};

export default PlanActions;
