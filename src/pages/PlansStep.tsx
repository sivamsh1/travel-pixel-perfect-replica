
import React, { useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useTravelForm } from '@/context/TravelFormContext';
import PlanCard, { InsurancePlan } from '@/components/PlanCard';
import PlanFilters from '@/components/PlanFilters';
import ComparePopup, { PlanToCompare } from '@/components/ComparePopup';
import { insurancePlans } from '@/constants/insurancePlans';
import { toast } from "@/components/ui/use-toast";

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

interface QuoteData {
  id: string;
  name: string;
  provider: string;
  description: string;
  details: string;
  netPremium: number;
}

const PlansStep = () => {
  const { 
    startDate, 
    endDate, 
    travellersCount, 
    selectedPlan, 
    setSelectedPlan,
    travellers,
    destination
  } = useTravelForm();

  const [plansToCompare, setPlansToCompare] = useState<PlanToCompare[]>([]);
  const [apiQuotes, setApiQuotes] = useState<InsurancePlan[]>([]);

  const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';
  const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';

  // Fetch quotes when the component mounts
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // Prepare the request payload
        const dob = travellers.map(traveller => {
          return traveller.dob ? format(parse(traveller.dob, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
        }).filter(Boolean);
        
        const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
        const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
        
        // Create the data object for API call
        const requestData = {
          destination: destination || "679e707834ecd414eb0004de",
          dob: dob.length ? dob : ["17/08/1997"],
          startDate: formattedStartDate || "19/06/2025",
          returnDate: formattedEndDate || "29/07/2025",
        };
        
        console.log('Fetching quotes with payload:', requestData);
        
        const response = await fetch('https://gyaantree.com/api/travel/v1/quickQuote/fetch-quotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data && data.result) {
          // Convert API response to InsurancePlan format
          const quotePlans: InsurancePlan[] = Object.entries(data.result).map(([key, value]: [string, any]) => {
            // Format the plan name from the key (e.g., reliance_Student_Basic -> Student Basic)
            const planNameParts = key.split('_');
            const provider = planNameParts[0] || 'Reliance';
            const planName = planNameParts.slice(1).join(' ');
            
            return {
              id: key,
              name: planName || key,
              provider: provider,
              logo: '/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png', // Reliance logo
              description: `${planName} Insurance Plan`,
              details: `${provider} Insurance`,
              price: `₹${value.netPremium || 0}`,
              benefits: [
                { icon: "✓", text: "Medical Coverage" },
                { icon: "✓", text: "Trip Cancellation" },
                { icon: "✓", text: "Baggage Loss" }
              ],
              coveragePoints: ["Medical", "Travel", "Baggage"],
              travellersCount
            };
          });
          
          setApiQuotes(quotePlans);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
        toast({
          title: "Error",
          description: "Failed to fetch insurance quotes. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    fetchQuotes();
  }, [destination, startDate, endDate, travellers]);

  const handleBuyNow = (planName: string) => {
    // Only update the selected plan in context
    setSelectedPlan(planName);
    // Navigation is now handled in the PlanCard component
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

  // Use API quotes if available, otherwise fallback to hardcoded plans
  const plansToDisplay = apiQuotes.length > 0 
    ? apiQuotes 
    : insurancePlans.map(plan => ({ ...plan, travellersCount }));

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
        
        {/* Insurance Plan Cards - Dynamic rendering based on API data */}
        <div className="w-full space-y-5 mb-20">
          {plansToDisplay.map((plan) => (
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
