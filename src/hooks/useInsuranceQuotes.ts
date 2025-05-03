
import { useMemo } from 'react';
import { format, parse, isValid } from 'date-fns';
import { useTravelForm } from '@/context/TravelFormContext';
import { toast } from "@/components/ui/use-toast";
import { useQuery } from '@tanstack/react-query';
import { getFromLocalStorage } from '@/utils/localStorageUtils';

const LOGO_PATHS = {
  reliance: '/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png',
  godigit: '/lovable-uploads/afa69947-6425-48b3-bba8-6af4da608ab1.png',
  bajaj: '/lovable-uploads/Bajaj.png.png'
} as const;

type LogoPath = string;

const getInsurerFromKey = (key: string): keyof typeof LOGO_PATHS | null => {
  const keyLower = key.toLowerCase();
  for (const insurer of Object.keys(LOGO_PATHS)) {
    if (keyLower.includes(insurer)) {
      return insurer as keyof typeof LOGO_PATHS;
    }
  }
  return null;
};

export const useInsuranceQuotes = () => {
  const { 
    travellersCount,
    travellers
  } = useTravelForm();

  const requestPayload = useMemo(() => {
    const storageData = getFromLocalStorage();
    
    // Add a null/undefined check for travellers
    const dob = storageData?.travellers?.details?.map(traveller => {
      if (!traveller?.dob) return null;
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(traveller.dob)) {
        return traveller.dob;
      }
      try {
        const parsedDate = parse(traveller.dob, 'yyyy-MM-dd', new Date());
        if (isValid(parsedDate)) {
          return format(parsedDate, 'dd/MM/yyyy');
        }
      } catch (error) {
        console.error('Error parsing traveller DOB:', error);
      }
      return null;
    }).filter(Boolean) || [];
    
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
        
        if (data && data.result) {
          return Object.entries(data.result || {}).map(([key, value]: [string, any]) => {
            let planName = value?.planName || key;
            planName = planName.replace(/_/g, ' ');

            let provider = value?.companyName || 'Reliance';
            const insurer = getInsurerFromKey(key);
            
            let logo: LogoPath = LOGO_PATHS.reliance; // Default to Reliance logo
            if (insurer && LOGO_PATHS[insurer]) {
              logo = LOGO_PATHS[insurer];
            }
            const details = "Overseas Travel | Excluding USA and CANADA";
            let netPremium = 0;
            if (value && value.netPremium !== undefined && value.netPremium !== null) {
              netPremium = typeof value.netPremium === 'string' 
                ? parseFloat(value.netPremium)
                : value.netPremium;
            }

            // Ensure covers is always an array
            const covers = Array.isArray(value?.covers) ? value.covers : [];
            
            // Extract sumInsured from covers or use a default value
            let sumInsured = 50000; // Default value
            if (covers.length > 0 && covers[0]?.coverAmount) {
              const coverAmount = covers[0].coverAmount;
              if (typeof coverAmount === 'string') {
                // Try to extract numeric value from string like "50,000" or "50000"
                const numericValue = coverAmount.replace(/[^0-9]/g, '');
                sumInsured = parseInt(numericValue, 10) || 50000;
              } else if (typeof coverAmount === 'number') {
                sumInsured = coverAmount;
              }
            }
            
            // Create standardized benefit names that match the reference design
            const standardBenefits = [
              { icon: "ambulance", text: "Emergency Medical Assistance" },
              { icon: "heart", text: "Lifestyle Assistance" },
              { icon: "car", text: "Domestic Roadside Assistance" }
            ];

            // Format coverage points to match the design
            const coveragePoints = covers.map(
              (cover) => `$ ${cover?.coverAmount || '0'} ${cover?.coverName || ''}`
            );

            return {
              id: key,
              name: planName,
              provider: provider,
              logo: logo,
              description: `${planName} Insurance Plan`,
              details: details,
              price: netPremium > 0 ? `₹ ${netPremium}` : '₹0',
              benefits: standardBenefits,
              coveragePoints: coveragePoints,
              travellersCount,
              netPremium: netPremium,
              sumInsured: sumInsured // Add the sumInsured property
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
        return []; // Return empty array on error
      }
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    quotes: apiQuotes || [], // Ensure we always return an array
    isLoading,
    error: error instanceof Error ? error.message : null
  };
};
