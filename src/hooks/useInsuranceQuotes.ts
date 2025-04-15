
import { useMemo } from 'react';
import { format, parse } from 'date-fns';
import { useTravelForm } from '@/context/TravelFormContext';
import { InsurancePlan } from '@/components/PlanCard';
import { toast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';

export const useInsuranceQuotes = () => {
  const { 
    startDate, 
    endDate, 
    travellersCount, 
    travellers,
    destination
  } = useTravelForm();

  // Create the request payload with fallback values
  const requestPayload = useMemo(() => {
    const dob = travellers.map(traveller => {
      return traveller.dob ? format(parse(traveller.dob, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
    }).filter(Boolean);
    
    const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
    const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
    
    return {
      destination: destination || "679e707834ecd414eb0004de", // Fallback destination
      dob: dob.length ? dob : ["17/08/1997"], // Fallback DOB
      startDate: formattedStartDate || "19/06/2025", // Fallback start date
      returnDate: formattedEndDate || "29/07/2025", // Fallback end date
    };
  }, [destination, startDate, endDate, travellers]);

  // Fetch quotes using React Query
  const { data: apiQuotes, isLoading, error } = useQuery({
    queryKey: ['insuranceQuotes', requestPayload],
    queryFn: async () => {
      console.log('Fetching quotes with payload:', requestPayload);
      
      try {
        const response = await fetch('https://gyaantree.com/api/travel/v1/quickQuote/fetch-quotes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
        });
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data && data.result) {
          // Convert API response to InsurancePlan format
          return Object.entries(data.result).map(([key, value]: [string, any]) => {
            // Determine the provider based on the key prefix
            let provider = 'Reliance'; // Default provider
            
            if (key.toLowerCase().startsWith('godigit')) {
              provider = 'GoDigit';
            } else if (key.toLowerCase().startsWith('reliance')) {
              provider = 'Reliance';
            }
            
            // Format the plan name from the key (e.g., reliance_Student_Basic -> Student Basic)
            const planNameParts = key.split('_');
            const planName = planNameParts.slice(1).join(' ');
            
            const details = "Overseas Travel | Excluding USA and CANADA";
            
            return {
              id: key,
              name: planName || key,
              provider: provider,
              logo: provider === 'GoDigit' 
                ? '/lovable-uploads/afa69947-6425-48b3-bba8-6af4da608ab1.png'
                : '/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png',
              description: `${planName} Insurance Plan`,
              details: details,
              price: `₹${value.netPremium || 0}`,
              benefits: [
                { icon: "✓", text: "Emergency Medical Assistance" },
                { icon: "✓", text: "Lifestyle Assistance" },
                { icon: "✓", text: "Domestic Roadside Assistance" }
              ],
              coveragePoints: ["$ 1000 Trip Cancellation", "$ 50000 Medical Expenses incl."],
              travellersCount
            };
          });
        }
        
        return []; // Return empty array if no results
      } catch (error) {
        console.error('Error fetching quotes:', error);
        toast({
          title: "Error",
          description: "Failed to fetch insurance quotes. Please try again.",
          variant: "destructive",
        });
        throw error; // Re-throw to let React Query handle it
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    quotes: apiQuotes || [], // Provide fallback empty array
    isLoading,
    error: error instanceof Error ? error.message : null
  };
};
