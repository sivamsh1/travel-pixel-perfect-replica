
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { useTravelForm } from '@/context/TravelFormContext';
import { format, parse } from 'date-fns';

interface Benefit {
  icon: string;
  text: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  logo: string; // We'll keep this property but override it with the Reliance logo
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
        <div className="mr-4 bg-blue-50 p-2 rounded-md border border-blue-100 flex items-center justify-center">
          <img 
            src={relianceLogo} 
            alt="Reliance General Insurance" 
            className="h-8 w-auto object-contain" 
          />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-lg text-[#FF6B35]">{plan.name}</h3>
              <p className="text-sm text-gray-600">{plan.details}</p>
            </div>
            
            <div className="text-right">
              <div className="text-xs text-gray-500">{plan.travellersCount} traveller(s)</div>
              <div className="text-xl font-bold text-[#FF6B35]">{plan.price}</div>
            </div>
          </div>
          
          <div className="flex mt-4 gap-6 text-sm">
            {plan.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-1 text-gray-700">
                <span className="w-4 h-4 text-primary">{benefit.icon}</span>
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
          
          <div className="flex mt-4 gap-6 text-sm">
            <div className="bg-blue-50 p-1 px-2 rounded text-xs">
              Plan Benefits
            </div>
            
            {plan.coveragePoints.map((point, index) => (
              <div key={index} className="text-xs text-gray-600">
                {point}
              </div>
            ))}
            
            <div className="text-primary text-xs">
              View All →
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end ml-4 gap-2">
          <button 
            className="bg-primary text-white py-1 px-3 rounded text-sm"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          
          <div className="flex items-center gap-2">
            <Checkbox 
              id={`compare-${plan.id}`} 
              checked={isSelectedForComparison}
              onCheckedChange={() => onToggleCompare(plan)}
            />
            <label htmlFor={`compare-${plan.id}`} className="text-xs">Add to Compare</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
