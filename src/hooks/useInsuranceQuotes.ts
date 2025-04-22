import { useMemo } from 'react';
import { format, parse, isValid } from 'date-fns';
import { useTravelForm } from '@/context/TravelFormContext';
import { InsurancePlan } from '@/components/PlanCard';
import { toast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { getFromLocalStorage } from '@/utils/localStorageUtils';

const LOGO_PATHS = {
  reliance: '/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png',
  godigit: '/lovable-uploads/afa69947-6425-48b3-bba8-6af4da608ab1.png',
  bajaj: new URL('../assets/bajajLogo.png', import.meta.url).href
} as const;

type LogoPath = typeof LOGO_PATHS[keyof typeof LOGO_PATHS];

const getInsurerFromKey = (key: string): keyof typeof LOGO_PATHS | null => {
  const keyLower = key.toLowerCase();
  console.log('Processing key:', key, 'Lowercase:', keyLower);
  
  // Check if the key contains any of our insurer names
  for (const insurer of Object.keys(LOGO_PATHS)) {
    if (keyLower.includes(insurer)) {
      console.log('Found matching insurer:', insurer);
      return insurer as keyof typeof LOGO_PATHS;
    }
  }
  
  console.log('No matching insurer found for key:', key);
  return null;
};

export const useInsuranceQuotes = () => {
  const { 
    travellersCount,
    travellers
  } = useTravelForm();

  const requestPayload = useMemo(() => {
    const storageData = getFromLocalStorage();
    
    const dob = storageData?.travellers?.details?.map(traveller => {
      if (traveller.dob && /^\d{2}\/\d{2}\/\d{4}$/.test(traveller.dob)) {
        return traveller.dob;
      }
      
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
    }).filter(Boolean);
    
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
    
    const destinationId = storageData?.location?.destinationId || '679e707834ecd414eb0004de';
    
    return {
      destination: destinationId,
      dob: dob.length ? dob : ["17/08/1997"],
      startDate: startDate || "19/06/2025",
      returnDate: endDate || "29/07/2025",
    };
  }, [travellers]);

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
          return Object.entries(data.result).map(([key, value]: [string, any]) => {
            let provider = value.companyName || 'Reliance';
            
            const insurer = getInsurerFromKey(key);
            console.log('Key:', key, 'Detected insurer:', insurer);
            
            let logo: LogoPath = LOGO_PATHS.reliance; // Default to Reliance logo
            
            if (insurer) {
              logo = LOGO_PATHS[insurer];
              console.log('Using logo path:', logo, 'for insurer:', insurer);
            }

            const planName = value.planName || '';
            
            const details = "Overseas Travel | Excluding USA and CANADA";
            
            let netPremium = 0;
            if (value && value.netPremium !== undefined && value.netPremium !== null) {
              netPremium = typeof value.netPremium === 'string' 
                ? parseFloat(value.netPremium)
                : value.netPremium;
            }
            
            return {
              id: key,
              name: planName,
              provider: provider,
              logo: logo,
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
        
        return [];
      } catch (error) {
        console.error('Error fetching quotes:', error);
        toast({
          title: "Error",
          description: "Failed to fetch insurance quotes. Please try again.",
          variant: "destructive",
        });
        throw error;
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    quotes: apiQuotes || [],
    isLoading,
    error: error instanceof Error ? error.message : null
  };
};
