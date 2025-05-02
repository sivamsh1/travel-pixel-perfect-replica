
import React, { useState, useMemo } from 'react';
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
import { InsurancePlan } from '@/components/PlanCard';

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
  
  // Filter state
  const [selectedInsurer, setSelectedInsurer] = useState('all');
  const [selectedPriceSort, setSelectedPriceSort] = useState('all');
  
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

  // Apply filters to quotes
  const filteredQuotes = useMemo(() => {
    // Ensure quotes is always an array
    const safeQuotes = Array.isArray(quotes) ? quotes : [];
    
    if (safeQuotes.length === 0) return [];
    
    let filtered = [...safeQuotes];
    
    // Filter by insurer
    if (selectedInsurer !== 'all') {
      filtered = filtered.filter(plan => plan?.provider === selectedInsurer);
    }
    
    // Sort by price (netPremium)
    if (selectedPriceSort !== 'all') {
      filtered = filtered.sort((a, b) => {
        // Ensure we're sorting by netPremium numeric values
        const premiumA = a?.netPremium || 0;
        const premiumB = b?.netPremium || 0;
        
        return selectedPriceSort === 'lowToHigh' 
          ? premiumA - premiumB 
          : premiumB - premiumA;
      });
    }
    
    return filtered;
  }, [quotes, selectedInsurer, selectedPriceSort]);

  const handleBuyNow = (planName: string) => {
    if (!quotes) return;
    
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
          selectedInsurer={selectedInsurer}
          selectedPriceSort={selectedPriceSort}
          onInsurerChange={setSelectedInsurer}
          onPriceSortChange={setSelectedPriceSort}
        />
        
        <PlanComparisonManager>
          {({ isSelectedForComparison, togglePlanComparison }) => (
            <PlansList
              apiQuotes={filteredQuotes}
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
