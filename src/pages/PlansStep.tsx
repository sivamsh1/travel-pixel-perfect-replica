
import React from 'react';
import { format, parse } from 'date-fns';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useTravelForm } from '@/context/TravelFormContext';
import PlanFilters from '@/components/PlanFilters';
import { useInsuranceQuotes } from '@/hooks/useInsuranceQuotes';
import PlansList from '@/components/plans/PlansList';
import PlanComparisonManager from '@/components/plans/PlanComparisonManager';
import { useIsMobile } from '@/hooks/use-mobile';

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

  const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';
  const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';

  const handleBuyNow = (planName: string) => {
    // Only update the selected plan in context
    setSelectedPlan(planName);
    // Navigation is now handled in the PlanCard component
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
