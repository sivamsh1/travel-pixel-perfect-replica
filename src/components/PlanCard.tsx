
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTravelForm } from '@/context/TravelFormContext';
import { format, parse } from 'date-fns';
import PlanCardLogo from './plans/PlanCardLogo';
import PlanCardHeader from './plans/PlanCardHeader';
import PlanCardBenefits from './plans/PlanCardBenefits';
import PlanCardCoveragePoints from './plans/PlanCardCoveragePoints';
import PlanCardActions from './plans/PlanCardActions';

interface Benefit {
  icon: string;
  text: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  logo: string;
  description: string;
  details: string;
  price: string;
  benefits: Benefit[];
  coveragePoints: string[];
  travellersCount?: number;
}

interface PlanCardProps {
  plan: InsurancePlan;
  isSelectedForComparison: boolean;
  onBuyNow: (planName: string) => void;
  onToggleCompare: (plan: InsurancePlan) => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isSelectedForComparison,
  onBuyNow,
  onToggleCompare
}) => {
  const navigate = useNavigate();
  const { destination, startDate, endDate, travellers } = useTravelForm();
  
  // Use the consistent Reliance logo for all plans
  const relianceLogo = "/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png";
  
  const handleBuyNow = () => {
    // Collect data from previous pages
    const dob = travellers.map(traveller => {
      return traveller.dob ? format(parse(traveller.dob, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
    }).filter(Boolean);
    
    const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
    const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
    
    // Create the data object to log
    const purchaseData = {
      destination: destination || "679e707834ecd414eb0004de", // Fallback to the requested value
      dob: dob.length ? dob : ["17/08/1997"], // Fallback to the requested value
      startDate: formattedStartDate || "19/06/2025", // Fallback to the requested value
      returnDate: formattedEndDate || "29/07/2025", // Fallback to the requested value
    };
    
    // Log the data as JSON
    console.log('Purchase data:', JSON.stringify(purchaseData, null, 2));
    
    // Call the original onBuyNow function
    onBuyNow(plan.name);
    
    // Navigate to the next page
    navigate('/addons');
  };
  
  return (
    <div className="border border-gray-200 rounded-md p-4 relative">
      <div className="flex">
        <PlanCardLogo logo={relianceLogo} provider={plan.provider} />
        
        <div className="flex-1">
          <PlanCardHeader 
            name={plan.name}
            details={plan.details}
            travellersCount={plan.travellersCount}
            price={plan.price}
          />
          
          <PlanCardBenefits benefits={plan.benefits} />
          
          <PlanCardCoveragePoints coveragePoints={plan.coveragePoints} />
        </div>
        
        <PlanCardActions
          plan={plan}
          isSelectedForComparison={isSelectedForComparison}
          onBuyNow={handleBuyNow}
          onToggleCompare={onToggleCompare}
        />
      </div>
    </div>
  );
};

export default PlanCard;
