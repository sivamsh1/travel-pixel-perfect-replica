
import { useState, useEffect } from 'react';
import { format, parse } from 'date-fns';
import { useTravelForm } from '@/context/TravelFormContext';
import { InsurancePlan } from '@/components/PlanCard';
import { toast } from "@/components/ui/use-toast";

export const useInsuranceQuotes = () => {
  const { 
    startDate, 
    endDate, 
    travellersCount, 
    travellers,
    destination
  } = useTravelForm();

  const [apiQuotes, setApiQuotes] = useState<InsurancePlan[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Start with loading state true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);
      setError(null);
      // Clear existing quotes while loading
      setApiQuotes([]);
      
      try {
        // Prepare the request payload with fallback values
        const dob = travellers.map(traveller => {
          return traveller.dob ? format(parse(traveller.dob, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
        }).filter(Boolean);
        
        const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
        const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy') : '';
        
        // Create the data object for API call with fallbacks
        const requestData = {
          destination: destination || "679e707834ecd414eb0004de", // Fallback destination
          dob: dob.length ? dob : ["17/08/1997"], // Fallback DOB
          startDate: formattedStartDate || "19/06/2025", // Fallback start date
          returnDate: formattedEndDate || "29/07/2025", // Fallback end date
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
            
            const details = "Overseas Travel | Excluding USA and CANADA";
            
            return {
              id: key,
              name: planName || key,
              provider: provider,
              logo: '/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png', // Reliance logo
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
          
          setApiQuotes(quotePlans);
        } else {
          // Handle empty response data properly
          setApiQuotes([]);
        }
      } catch (error) {
        console.error('Error fetching quotes:', error);
        setError('Failed to fetch insurance quotes');
        toast({
          title: "Error",
          description: "Failed to fetch insurance quotes. Please try again.",
          variant: "destructive",
        });
      } finally {
        // Ensure loading state is set to false after data is processed
        setIsLoading(false);
      }
    };
    
    // Always fetch quotes on component mount
    fetchQuotes();
  }, [destination, startDate, endDate, travellers, travellersCount]);

  return {
    quotes: apiQuotes,
    isLoading,
    error
  };
};
