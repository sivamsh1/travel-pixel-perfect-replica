import { useState, useEffect, useMemo } from 'react';
import { format, parse, isValid } from 'date-fns';
import { useTravelForm } from '@/context/TravelFormContext';
import { toast } from "@/components/ui/use-toast";
import { socketService } from '@/services/socketService';
import { getFromLocalStorage } from '@/utils/localStorageUtils';
import { processQuotesData, notifyNewQuotes } from '@/utils/insuranceQuoteProcessor';
import { InsuranceQuotesState, QuoteRequestPayload } from '@/types/insuranceTypes';

export const useInsuranceQuotes = () => {
  const { 
    travellersCount,
    travellers
  } = useTravelForm();

  const [state, setState] = useState<InsuranceQuotesState>({
    quotes: [],
    isLoading: true,
    error: null,
    isConnected: false,
    receivedFirstBatch: false,
    socketResponses: []
  });

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
    } as QuoteRequestPayload;
  }, [travellersCount, travellers]);

  useEffect(() => {
    // Initialize socket connection
    socketService.connect();

    // Check connection status
    const checkConnection = setInterval(() => {
      setState(prev => ({ ...prev, isConnected: socketService.isConnected() }));
    }, 1000);

    // Handle socket connection status change
    const handleConnectionChange = () => {
      setState(prev => ({ ...prev, isConnected: socketService.isConnected() }));
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

  // Effect for fetching quotes via Socket.IO
  useEffect(() => {
    if (!state.isConnected) {
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    console.log("Requesting quotes with payload:", JSON.stringify(requestPayload, null, 2));

    // Handle receiving quotes
    const handleQuotes = (data: any) => {
      console.log("Received quotes from socket:", typeof data);
      
      try {
        if (data) {
          const processedQuotes = processQuotesData(data, travellersCount);
          
          if (processedQuotes && processedQuotes.length > 0) {
            setState(prev => {
              const receivedFirstBatch = true;
              // Merge new quotes with existing ones, replacing any duplicates
              const existingQuoteIds = new Set(prev.quotes.map(q => q.id));
              const newQuotes = processedQuotes.filter(q => !existingQuoteIds.has(q.id));
              
              console.log(`Adding ${newQuotes.length} new quotes to existing ${prev.quotes.length} quotes`);
              
              // Show a toast notification for new quotes if this isn't the first batch
              if (prev.quotes.length > 0 && newQuotes.length > 0) {
                notifyNewQuotes(newQuotes.length);
              }
              
              return { 
                ...prev,
                quotes: [...prev.quotes, ...newQuotes],
                receivedFirstBatch,
                socketResponses: [...prev.socketResponses, data],
                isLoading: false
              };
            });
          }
          else {
            // Add to socketResponses even if we didn't get valid quotes
            setState(prev => ({
              ...prev,
              socketResponses: [...prev.socketResponses, data],
              // Stop loading if we've already received a first batch
              isLoading: !prev.receivedFirstBatch
            }));
          }
        }
      } catch (err) {
        console.error("Error processing quotes:", err);
        setState(prev => ({ 
          ...prev, 
          error: "Failed to process quotes data",
          isLoading: false
        }));
        
        // Only show toast for errors if we've received the first batch already
        // This prevents showing error messages during initial loading
        if (state.receivedFirstBatch) {
          toast({
            title: "Error Processing Quotes",
            description: "There was a problem processing the insurance quotes.",
            variant: "destructive",
          });
        }
      }
    };

    // Register listener for quotes
    const removeListener = socketService.on('QuickQuote', handleQuotes);

    // Emit request for quotes
    socketService.emit('getLiveQuotes', requestPayload);

    // Set a timeout to stop loading state even if no quotes are received
    // But don't show error message automatically
    const timeout = setTimeout(() => {
      setState(prev => {
        if (!prev.isLoading) return prev;
        
        return { 
          ...prev, 
          isLoading: false,
          receivedFirstBatch: true  // Consider it received so we don't keep showing loading
        };
      });
    }, 20000); // Extended timeout for better user experience

    return () => {
      removeListener();
      clearTimeout(timeout);
    };
  }, [requestPayload, state.isConnected, travellersCount, state.receivedFirstBatch]);

  return {
    quotes: state.quotes,
    isLoading: state.isLoading,
    error: state.error,
    isConnected: state.isConnected,
    receivedFirstBatch: state.receivedFirstBatch,
    socketResponses: state.socketResponses
  };
};
