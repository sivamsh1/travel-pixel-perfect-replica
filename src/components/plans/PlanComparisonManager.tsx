
import React, { useState } from 'react';
import ComparePopup, { PlanToCompare } from '@/components/ComparePopup';
import { InsurancePlan } from '@/components/PlanCard';

interface PlanComparisonManagerProps {
  children: (comparisonProps: {
    isSelectedForComparison: (planId: string) => boolean;
    togglePlanComparison: (plan: InsurancePlan) => void;
  }) => React.ReactNode;
}

const PlanComparisonManager: React.FC<PlanComparisonManagerProps> = ({ children }) => {
  const [plansToCompare, setPlansToCompare] = useState<PlanToCompare[]>([]);

  const togglePlanComparison = (plan: InsurancePlan) => {
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

  const isSelectedForComparison = (planId: string) => {
    return plansToCompare.some(p => p.id === planId);
  };

  return (
    <>
      {children({
        isSelectedForComparison,
        togglePlanComparison,
      })}
      
      <ComparePopup 
        selectedPlans={plansToCompare} 
        onClear={clearComparison}
        onRemove={removePlanFromComparison}
      />
    </>
  );
};

export default PlanComparisonManager;
