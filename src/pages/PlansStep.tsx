
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parse } from 'date-fns';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useTravelForm } from '@/context/TravelFormContext';
import PlanCard, { InsurancePlan } from '@/components/PlanCard';
import PlanFilters from '@/components/PlanFilters';
import ComparePopup, { PlanToCompare } from '@/components/ComparePopup';
import { insurancePlans } from '@/constants/insurancePlans';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const PlansStep = () => {
  const navigate = useNavigate();
  const { 
    startDate, 
    endDate, 
    travellersCount, 
    selectedPlan, 
    setSelectedPlan 
  } = useTravelForm();

  const [plansToCompare, setPlansToCompare] = useState<PlanToCompare[]>([]);

  const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';
  const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';

  const handleBuyNow = (planName: string) => {
    setSelectedPlan(planName);
    navigate('/addons');
  };

  const handleToggleCompare = (plan: InsurancePlan) => {
    setPlansToCompare(prev => {
      // If plan is already in the comparison list, remove it
      const alreadyAdded = prev.some(p => p.id === plan.id);
      
      if (alreadyAdded) {
        return prev.filter(p => p.id !== plan.id);
      }
      
      // Don't add more than 2 plans to compare
      if (prev.length >= 2) {
        return prev;
      }
      
      // Add plan to comparison list
      return [...prev, {
        id: plan.id,
        name: plan.name,
        provider: plan.provider,
        logo: plan.logo,
        description: plan.description
      }];
    });
  };

  const clearComparison = () => {
    setPlansToCompare([]);
  };

  const removePlanFromComparison = (planId: string) => {
    setPlansToCompare(prev => prev.filter(p => p.id !== planId));
  };

  // Add travellersCount to each plan for rendering
  const plansWithTravellersCount = insurancePlans.map(plan => ({
    ...plan,
    travellersCount
  }));

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
        <h2 className="text-3xl font-bold mb-6">Select Your Plan</h2>
        
        <PlanFilters 
          travellersCount={travellersCount}
          formattedStartDate={formattedStartDate}
          formattedEndDate={formattedEndDate}
        />
        
        {/* Insurance Plan Cards */}
        <div className="w-full space-y-5 mb-20">
          {plansWithTravellersCount.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isSelectedForComparison={plansToCompare.some(p => p.id === plan.id)}
              onBuyNow={handleBuyNow}
              onToggleCompare={handleToggleCompare}
            />
          ))}
        </div>
      </div>

      {/* Compare Popup */}
      <ComparePopup 
        selectedPlans={plansToCompare} 
        onClear={clearComparison}
        onRemove={removePlanFromComparison}
      />
    </Layout>
  );
};

export default PlansStep;
