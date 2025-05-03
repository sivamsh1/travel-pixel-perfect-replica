
import React, { useState, useMemo, useEffect } from 'react';
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
  const [selectedPriceSort, setSelectedPriceSort] = useState('lowToHigh');
  const [selectedCoverage, setSelectedCoverage] = useState('show-all'); // Default to show all
  
  // Track if any filter is active for the Reset button
  const isAnyFilterActive = useMemo(() => {
    return selectedInsurer !== 'all' || 
           selectedPriceSort !== 'lowToHigh' || 
           selectedCoverage !== 'show-all'; // Updated default value
  }, [selectedInsurer, selectedPriceSort, selectedCoverage]);
  
  // Reset filters handler
  const handleResetFilters = () => {
    setSelectedInsurer('all');
    setSelectedPriceSort('lowToHigh');
    setSelectedCoverage('show-all'); // Reset to show all
  };
  
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
    
    let filtered = [...safeQuotes];
    
    // Filter by insurer
    if (selectedInsurer !== 'all') {
      filtered = filtered.filter(plan => plan?.provider === selectedInsurer);
    }
    
    // Filter by coverage - skip if "show-all" is selected
    if (selectedCoverage && selectedCoverage !== 'show-all') {
      // Handle "Most Popular" option specially
      if (selectedCoverage === 'most-popular') {
        filtered = filtered.filter(plan => {
          const coverage = plan.sumInsured || 0;
          // More flexible range for "Most Popular" - approximately around 100,000
          return coverage >= 75000 && coverage <= 125000;
        }).sort((a, b) => {
          // Sort by highest premium first for "Most Popular"
          const premiumA = a?.netPremium || 0;
          const premiumB = b?.netPremium || 0;
          return premiumB - premiumA;
        });
      } else {
        // This is the regular coverage filtering
        const coverageMappings = {
          '30k-50k': [30000, 50000],
          '50k-75k': [50000, 75000],
          '75k-1L': [75000, 100000],
          '1L-2L': [100000, 200000],
          '2L+': [200000, Infinity]
        };
        
        const range = coverageMappings[selectedCoverage as keyof typeof coverageMappings];
        if (range) {
          filtered = filtered.filter(plan => {
            const coverage = plan.sumInsured || 0;
            return coverage >= range[0] && coverage <= range[1];
          });
        }
      }
    }
    
    // Sort by price (netPremium) - but only if we're not in "Most Popular" mode
    // which already has its own sorting logic
    if (selectedPriceSort !== 'all' && selectedCoverage !== 'most-popular') {
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
  }, [quotes, selectedInsurer, selectedPriceSort, selectedCoverage]);

  const handleBuyNow = (planName: string) => {
    if (!Array.isArray(quotes) || quotes.length === 0) return;
    
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
          selectedCoverage={selectedCoverage}
          onInsurerChange={setSelectedInsurer}
          onPriceSortChange={setSelectedPriceSort}
          onCoverageChange={setSelectedCoverage}
          onResetFilters={handleResetFilters}
          filteredPlansCount={filteredQuotes.length}
          isAnyFilterActive={isAnyFilterActive}
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
