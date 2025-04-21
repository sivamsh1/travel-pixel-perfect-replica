
import React, { useState, useEffect } from 'react';
import ComparePopup, { PlanToCompare } from '@/components/ComparePopup';
import { InsurancePlan } from '@/components/PlanCard';
import { saveComparisonPlans, getComparisonPlans, clearComparisonPlans as clearPlansStorage, ComparisonPlan } from '@/utils/comparisonStorageUtils';

interface PlanComparisonManagerProps {
  children: (comparisonProps: {
    isSelectedForComparison: (planId: string) => boolean;
    togglePlanComparison: (plan: InsurancePlan) => void;
  }) => React.ReactNode;
}

const PlanComparisonManager: React.FC<PlanComparisonManagerProps> = ({ children }) => {
  const [plansToCompare, setPlansToCompare] = useState<PlanToCompare[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPlans = getComparisonPlans();
    setPlansToCompare(savedPlans as PlanToCompare[]);
  }, []);

  // Save to localStorage whenever plansToCompare changes
  useEffect(() => {
    saveComparisonPlans(plansToCompare as ComparisonPlan[]);
  }, [plansToCompare]);

  const togglePlanComparison = (plan: InsurancePlan) => {
    setPlansToCompare(prev => {
      const alreadyAdded = prev.some(p => p.id === plan.id);

      let nextPlans;
      if (alreadyAdded) {
        nextPlans = prev.filter(p => p.id !== plan.id);
      } else if (prev.length >= 2) {
        nextPlans = prev;
      } else {
        nextPlans = [
          ...prev, 
          {
            id: plan.id,
            name: plan.name,
            provider: plan.provider,
            logo: plan.logo,
            price: plan.price,
            description: plan.details || plan.description || ''
          }
        ];
      }
      saveComparisonPlans(nextPlans as ComparisonPlan[]);
      return nextPlans;
    });
  };

  const clearComparison = () => {
    setPlansToCompare([]);
    clearPlansStorage();
  };

  const removePlanFromComparison = (planId: string) => {
    const next = plansToCompare.filter(p => p.id !== planId);
    setPlansToCompare(next);
    saveComparisonPlans(next as ComparisonPlan[]);
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
