
import React from 'react';
import { format, parse, isValid } from 'date-fns';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useTravelForm } from '@/context/TravelFormContext';
import PlanFilters from '@/components/PlanFilters';
import { useInsuranceQuotes } from '@/hooks/useInsuranceQuotes';
import PlansList from '@/components/plans/PlansList';
import PlanComparisonManager from '@/components/plans/PlanComparisonManager';
import { useIsMobile } from '@/hooks/use-mobile';
import { Progress } from "@/components/ui/progress";
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorageUtils';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const PlansStep = () => {
  const { 
    startDate, 
    endDate, 
    travellersCount, 
    selectedPlan, 
    setSelectedPlan
  } = useTravelForm();
  
  const isMobile = useIsMobile();
  const { quotes, isLoading, error } = useInsuranceQuotes();
  
  // Get data from localStorage for display
  const storageData = getFromLocalStorage();
  
  // Use dates from localStorage if available, otherwise use context
  const effectiveStartDate = storageData?.dates?.startDate || startDate;
  const effectiveEndDate = storageData?.dates?.endDate || endDate;
  
  // Add safe date formatting with error handling
  let formattedStartDate = '';
  let formattedEndDate = '';
  
  try {
    if (effectiveStartDate) {
      const parsedDate = parse(effectiveStartDate, 'yyyy-MM-dd', new Date());
      if (isValid(parsedDate)) {
        formattedStartDate = format(parsedDate, 'do MMM');
      }
    }
  } catch (error) {
    console.error('Error formatting start date:', error);
  }
  
  try {
    if (effectiveEndDate) {
      const parsedDate = parse(effectiveEndDate, 'yyyy-MM-dd', new Date());
      if (isValid(parsedDate)) {
        formattedEndDate = format(parsedDate, 'do MMM');
      }
    }
  } catch (error) {
    console.error('Error formatting end date:', error);
  }

  const handleBuyNow = (planName: string) => {
    // Find the selected plan from quotes
    const selectedPlanData = quotes.find(plan => plan.name === planName);
    
    if (selectedPlanData) {
      // Store plan details in localStorage
      const planData = {
        name: selectedPlanData.name,
        provider: selectedPlanData.provider,
        price: selectedPlanData.price,
        details: selectedPlanData.details,
        insurer: `${selectedPlanData.provider} ${selectedPlanData.name}`,
        sumInsured: 'USD 50000' // This would ideally come from the plan data
      };
      
      saveToLocalStorage('selectedPlan', planData);
    }
    
    setSelectedPlan(planName);
    // Navigation is handled in the PlanCard component
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator 
          steps={steps} 
          currentStep={2} 
          completedSteps={[1]}
        />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6 max-w-5xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Select Your Plan</h2>
        
        <PlanFilters 
          travellersCount={travellersCount}
          formattedStartDate={formattedStartDate}
          formattedEndDate={formattedEndDate}
        />
        
        {/* Always show skeleton while loading - this ensures a better UX during navigation */}
        <PlanComparisonManager>
          {({ isSelectedForComparison, togglePlanComparison }) => (
            <PlansList
              apiQuotes={quotes}
              travellersCount={travellersCount}
              onBuyNow={handleBuyNow}
              isSelectedForComparison={isSelectedForComparison}
              onToggleCompare={togglePlanComparison}
              isLoading={isLoading}
            />
          )}
        </PlanComparisonManager>
      </div>
    </Layout>
  );
};

export default PlansStep;
