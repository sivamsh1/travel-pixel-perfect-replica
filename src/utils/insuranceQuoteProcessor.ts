import { toast } from "@/components/ui/use-toast";
import { LOGO_PATHS, getInsurerFromKey } from './insuranceLogos';
import { InsuranceQuote, QuoteResponse } from '@/types/insuranceTypes';

/**
 * Process socket.io response data into standardized quotes
 * @param data Raw data from socket.io event
 * @returns Array of processed insurance quotes
 */
export const processQuotesData = (data: any, travellersCount: number): InsuranceQuote[] => {
  console.log("===== SOCKET.IO RESPONSE START =====");
  console.log("Raw Socket.IO response:", JSON.stringify(data, null, 2));
  console.log("Response type:", typeof data);
  console.log("Is Array:", Array.isArray(data));
  
  try {
    // Handle the format from logs: ["QuickQuote", [{ data: {...} }]]
    if (Array.isArray(data) && data.length > 0) {
      console.log("Processing array format response with length:", data.length);
      
      // Check if it's the [{ data: {...} }] format or similar
      if (data[0] && typeof data[0] === 'object' && 'data' in data[0]) {
        console.log("Found data property in first array element");
        const quoteData = data[0].data;
        return processQuoteItems(quoteData, travellersCount);
      }
      
      // Log more details to debug the structure
      for (let i = 0; i < Math.min(data.length, 3); i++) {
        console.log(`Data[${i}] type:`, typeof data[i]);
        if (typeof data[i] === 'object' && data[i] !== null) {
          console.log(`Data[${i}] keys:`, Object.keys(data[i]));
        }
      }
      
      // Try to find the quotes data in the structure
      if (data[0] && typeof data[0] === 'object') {
        if ('data' in data[0]) {
          console.log("Found data property in array[0]");
          return processQuoteItems(data[0].data, travellersCount);
        }
      }
    } 
    // Handle direct object format
    else if (data && typeof data === 'object' && !Array.isArray(data)) {
      console.log("Processing object format response");
      if ('result' in data) {
        return processQuoteItems(data.result, travellersCount);
      } else if ('data' in data) {
        return processQuoteItems(data.data, travellersCount);
      }
    }
    
    console.error("Couldn't identify the quotes data structure:", data);
    return [];
  } catch (err) {
    console.error("Error in processQuotesData:", err);
    return [];
  }
};

/**
 * Process individual quote items into standardized format
 * @param quoteItems The raw quote items to process
 * @returns Array of processed insurance quotes
 */
export const processQuoteItems = (quoteItems: Record<string, any>, travellersCount: number): InsuranceQuote[] => {
  if (!quoteItems) {
    console.error("No quote items to process");
    return [];
  }
  
  console.log("Quote items to process:", Object.keys(quoteItems || {}));
  
  try {
    const processedQuotes = Object.entries(quoteItems || {}).map(([key, value]: [string, any]) => {
      // Skip any boolean false or empty objects
      if (value === false || 
          (typeof value === 'object' && 
           value !== null && 
           Object.keys(value).length === 0)) {
        console.log(`Skipping item ${key} - value is false or empty`);
        return null;
      }
      
      // Skip Care items with no data
      if (value?.status === true && 
          value?.responseCode === 204 && 
          (!value?.data || (Array.isArray(value.data) && value.data.length === 0))) {
        console.log(`Skipping item ${key} - Care item with no data`);
        return null;
      }
      
      console.log(`Processing plan ${key}:`, value);
      
      let planName = value?.planName || key;
      planName = planName.replace(/_/g, ' ');

      let provider = value?.companyName || 'Reliance';
      const insurer = getInsurerFromKey(key);
      
      // Extract planCode for GoDigit plans
      let planCode;
      if (provider === 'GoDigit') {
        // Try to get planCode from the response first
        planCode = value?.planCode || value?.productCode;
        // If not found in response, extract from plan name
        if (!planCode) {
          const parts = planName.split("-");
          planCode = parts[parts.length - 1];
        }
      }
      
      // Default logo
      let logo = '/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png'; 
      
      // Set the appropriate logo if we identified the insurer
      if (insurer) {
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
      
      // Extract sumInsured based on provider
      let sumInsured = 50000; // Default value
      
      if (provider === 'Reliance') {
        // For Reliance, find the medical expenses coverage
        const medicalCoverage = covers.find(cover => 
          cover?.coverName?.toLowerCase().includes('medical expenses including transportation evacuation and repatriation of mortal remains')
        );
        if (medicalCoverage?.coverAmount) {
          const coverAmount = medicalCoverage.coverAmount;
          if (typeof coverAmount === 'string') {
            const numericValue = coverAmount.replace(/[^0-9]/g, '');
            sumInsured = parseInt(numericValue, 10) || 50000;
          } else if (typeof coverAmount === 'number') {
            sumInsured = coverAmount;
          }
        }
      } else if (provider === 'GoDigit' || provider === 'Bajaj') {
        // For GoDigit and Bajaj, use the SI key
        if (value?.SI) {
          const siValue = value.SI;
          if (typeof siValue === 'string') {
            const numericValue = siValue.replace(/[^0-9]/g, '');
            sumInsured = parseInt(numericValue, 10) || 50000;
          } else if (typeof siValue === 'number') {
            sumInsured = siValue;
          }
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

      console.log(`Processed plan: ${key} - ${planName} - ${netPremium}`);

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
        sumInsured: sumInsured,
        planCode: planCode
      };
    }).filter(Boolean) as InsuranceQuote[]; 
    
    console.log(`Processed ${processedQuotes.length} valid quotes`);
    return processedQuotes;
  } catch (err) {
    console.error("Error processing quote items:", err);
    return [];
  }
};

/**
 * Show notification for new quotes
 * @param newQuotesCount Number of new quotes received
 */
export const notifyNewQuotes = (newQuotesCount: number): void => {
  if (newQuotesCount > 0) {
    toast({
      title: "New Quotes Available",
      description: `${newQuotesCount} new insurance quotes received.`,
    });
  }
};
