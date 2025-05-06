import { useMemo, useState } from 'react';
import { InsurancePlan } from '@/components/PlanCard';

export const usePlansFilter = (quotes: any[]) => {
  // Filter state
  const [selectedInsurer, setSelectedInsurer] = useState('all');
  const [selectedPriceSort, setSelectedPriceSort] = useState('lowToHigh');
  const [selectedCoverage, setSelectedCoverage] = useState('most-popular'); // Changed default to most-popular
  
  // Track if any filter is active for the Reset button
  const isAnyFilterActive = useMemo(() => {
    return selectedInsurer !== 'all' || 
           selectedPriceSort !== 'lowToHigh' || 
           selectedCoverage !== 'most-popular'; // Updated this to match the new default
  }, [selectedInsurer, selectedPriceSort, selectedCoverage]);
  
  // Reset filters handler
  const handleResetFilters = () => {
    setSelectedInsurer('all');
    setSelectedPriceSort('lowToHigh');
    setSelectedCoverage('most-popular'); // Updated reset value
  };
  
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
        // Group plans by provider
        const providerGroups: Record<string, any[]> = {};
        
        filtered.forEach(plan => {
          const provider = plan.provider || 'Unknown';
          if (!providerGroups[provider]) {
            providerGroups[provider] = [];
          }
          providerGroups[provider].push(plan);
        });
        
        // For each provider, select the plan with the highest coverage/value
        let popularPlans: any[] = [];
        Object.keys(providerGroups).forEach(provider => {
          const providerPlans = providerGroups[provider];
          // Sort by coverage (sumInsured) descending
          providerPlans.sort((a, b) => (b.sumInsured || 0) - (a.sumInsured || 0));
          // Add the highest coverage plan to the results
          if (providerPlans.length > 0) {
            popularPlans.push(providerPlans[0]);
          }
        });
        
        filtered = popularPlans;
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

  return {
    selectedInsurer,
    setSelectedInsurer,
    selectedPriceSort,
    setSelectedPriceSort,
    selectedCoverage,
    setSelectedCoverage,
    isAnyFilterActive,
    handleResetFilters,
    filteredQuotes
  };
};
