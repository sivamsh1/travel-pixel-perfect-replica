
import { useState, useEffect, useMemo } from 'react';
import { format, parse, isValid } from 'date-fns';
import { useTravelForm } from '@/context/TravelFormContext';
import { toast } from "@/components/ui/use-toast";
import { socketService } from '@/services/socketService';
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

  const [quotes, setQuotes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);

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
      trackBaggage: false,
      tripDelay: false,
      tripType: "single",
      bodyCount: travellersCount || 1,
      ped: false,
      adventureSportsCover: false,
      sportsCover: false,
      visaRefund: false,
      emergencyCover: false,
      staffReplacementCover: false,
      isCitizen: true,
      isIndianResident: true,
      si: "50-60"
    };
  }, [travellersCount, travellers]);

  useEffect(() => {
    // Initialize socket connection
    socketService.connect();

    // Check connection status
    const checkConnection = setInterval(() => {
      setSocketConnected(socketService.isConnected());
    }, 1000);

    // Handle socket connection status change
    const handleConnectionChange = () => {
      setSocketConnected(socketService.isConnected());
    };

    // Set up listener for socket connection
    const onConnect = socketService.on('connect', handleConnectionChange);
    const onDisconnect = socketService.on('disconnect', handleConnectionChange);

    return () => {
      // Clean up
      clearInterval(checkConnection);
      onConnect();
      onDisconnect();
      // Don't disconnect as it might be used elsewhere
    };
  }, []);

  // Process quotes data
  const processQuotesData = (data: any) => {
    if (!data || !data.result) return [];
    
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
        sumInsured: sumInsured
      };
    });
  };

  // Effect for fetching quotes via Socket.IO
  useEffect(() => {
    if (!socketConnected) {
      return;
    }

    setIsLoading(true);
    setError(null);

    console.log("Requesting quotes with payload:", requestPayload);

    // Set up listener for receiving quotes
    const handleQuotes = (data: any) => {
      console.log("Received quotes:", data);
      if (data && data.result) {
        const processedQuotes = processQuotesData(data);
        setQuotes(prev => {
          // Merge new quotes with existing ones, replacing any duplicates
          const existingQuoteIds = new Set(prev.map(q => q.id));
          const newQuotes = processedQuotes.filter(q => !existingQuoteIds.has(q.id));
          return [...prev, ...newQuotes];
        });
      }
      setIsLoading(false);
    };

    // Register listener for quotes
    const removeListener = socketService.on('getLiveQuotes', handleQuotes);

    // Emit request for quotes
    socketService.emit('getLiveQuotes', requestPayload);

    // Set a timeout to stop loading state even if no quotes are received
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        if (quotes.length === 0) {
          toast({
            title: "No Quotes Available",
            description: "Couldn't retrieve insurance quotes. Please try again later.",
            variant: "destructive",
          });
        }
      }
    }, 10000);

    return () => {
      removeListener();
      clearTimeout(timeout);
    };
  }, [requestPayload, socketConnected]);

  return {
    quotes,
    isLoading,
    error,
    isConnected: socketConnected
  };
};
