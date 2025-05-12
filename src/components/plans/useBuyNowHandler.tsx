
import { useNavigate } from 'react-router-dom';
import { useTravelForm } from '@/context/TravelFormContext';
import { saveToLocalStorage } from '@/utils/localStorageUtils';

export const useBuyNowHandler = () => {
  const navigate = useNavigate();
  const { setSelectedPlan } = useTravelForm();

  const handleBuyNow = (planName: string, quotes: any[]) => {
    if (!Array.isArray(quotes) || quotes.length === 0) return;
    
    // Find the selected plan from quotes
    const selectedPlanData = quotes.find(plan => plan.name === planName);
    
    if (selectedPlanData) {
      // Extract sumInsured from the plan if available or use a default value
      const sumInsuredValue = selectedPlanData.sumInsured 
        ? `USD ${selectedPlanData.sumInsured.toLocaleString()}`
        : 'USD 50000';
      
      // Store plan details in localStorage
      const planData = {
        name: selectedPlanData.name,
        provider: selectedPlanData.provider,
        price: selectedPlanData.price,
        details: selectedPlanData.details,
        insurer: `${selectedPlanData.provider} ${selectedPlanData.name}`,
        sumInsured: sumInsuredValue,
        planCode: selectedPlanData.planCode || "RS5" // Ensure planCode is stored for API integration
      };
      
      saveToLocalStorage('selectedPlan', planData);
    }
    
    setSelectedPlan(planName);
    navigate('/addons');
  };

  return { handleBuyNow };
};
