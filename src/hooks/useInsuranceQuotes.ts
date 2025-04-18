
import { useMemo } from 'react';
import { format, parse, isValid } from 'date-fns';
import { useTravelForm } from '@/context/TravelFormContext';
import { InsurancePlan } from '@/components/PlanCard';
import { toast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { getFromLocalStorage } from '@/utils/localStorageUtils';

export const useInsuranceQuotes = () => {
  const { 
    travellersCount,
    travellers
  } = useTravelForm();

  // Create the request payload from localStorage data
  const requestPayload = useMemo(() => {
    const storageData = getFromLocalStorage();
    
    // Get traveller DOBs from localStorage with proper validation
    const dob = storageData?.travellers?.details?.map(traveller => {
      // If DOB is already in DD/MM/YYYY format, use it directly
      if (traveller.dob && /^\d{2}\/\d{2}\/\d{4}$/.test(traveller.dob)) {
        return traveller.dob;
      }
      
      // If DOB is in ISO format, convert it
      if (traveller.dob) {
        try {
          const parsedDate = parse(traveller.dob, 'yyyy-MM-dd', new Date());
          if (isValid(parsedDate)) {
            return format(parsedDate, 'dd/MM/yyyy');
          }
        } catch (error) {
          console.error('Error parsing traveller DOB:', error);
        }
      }
      return null;
    }).filter(Boolean); // Remove any null values
    
    // Get dates from localStorage with proper validation
    let startDate = '';
    let endDate = '';
    
    if (storageData?.dates) {
      if (storageData.dates.startDate) {
        try {
          const parsedStartDate = parse(storageData.dates.startDate, 'yyyy-MM-dd', new Date());
          if (isValid(parsedStartDate)) {
            startDate = format(parsedStartDate, 'dd/MM/yyyy');
          }
        } catch (error) {
          console.error('Error parsing start date:', error);
        }
      }
      
      if (storageData.dates.endDate) {
        try {
          const parsedEndDate = parse(storageData.dates.endDate, 'yyyy-MM-dd', new Date());
          if (isValid(parsedEndDate)) {
            endDate = format(parsedEndDate, 'dd/MM/yyyy');
          }
        } catch (error) {
          console.error('Error parsing end date:', error);
        }
      }
    }
    
    // Get destination ID from localStorage
    const destinationId = storageData?.location?.destinationId || '679e707834ecd414eb0004de';
    
    return {
      destination: destinationId,
      dob: dob.length ? dob : ["17/08/1997"], // Use stored DOB or fallback
      startDate: startDate || "19/06/2025",
      returnDate: endDate || "29/07/2025",
    };
  }, [travellers]);

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
            
            // Extract the netPremium value and ensure it's a number
            // Handle both string and number types for netPremium
            let netPremium = 0;
            
            if (value && value.netPremium !== undefined && value.netPremium !== null) {
              // Convert to number if it's a string
              netPremium = typeof value.netPremium === 'string' 
                ? parseFloat(value.netPremium)
                : value.netPremium;
            }
            
            return {
              id: key,
              name: planName || key,
              provider: provider,
              logo: provider === 'GoDigit' 
                ? '/lovable-uploads/afa69947-6425-48b3-bba8-6af4da608ab1.png'
                : '/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png',
              description: `${planName} Insurance Plan`,
              details: details,
              price: netPremium > 0 ? `₹${netPremium}` : '₹0',
              benefits: [
                { icon: "✓", text: "Emergency Medical Assistance" },
                { icon: "✓", text: "Lifestyle Assistance" },
                { icon: "✓", text: "Domestic Roadside Assistance" }
              ],
              coveragePoints: ["$ 1000 Trip Cancellation", "$ 50000 Medical Expenses incl."],
              travellersCount,
              netPremium: netPremium
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
