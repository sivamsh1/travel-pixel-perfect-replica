
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { useTravelForm } from '@/context/TravelFormContext';

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
  const { setSelectedPlan } = useTravelForm();
  
  // Use the consistent Reliance logo for all plans
  const relianceLogo = "/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png";
  
  const handleBuyNow = () => {
    // Update the selected plan in context
    setSelectedPlan(plan.name);
    
    // Call the original onBuyNow function
    onBuyNow(plan.name);
    
    // Navigate directly to the next page without logging
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
