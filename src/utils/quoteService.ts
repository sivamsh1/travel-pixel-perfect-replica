import { toast } from "@/hooks/use-toast";
import { TravelFormData } from './localStorageUtils';
import { QuoteResponse } from './apiTypes';
import { determineProvider } from './insuranceProviderUtils';
import { createGoDigitQuotePayload } from './goDigitQuoteService';
import { createRelianceQuotePayload } from './relianceQuoteService';
import { createBajajQuotePayload } from './bajajQuoteService';

/**
 * Submit the quote to create a policy
 * @param formData Travel form data from localStorage
 * @returns Promise that resolves to the API response
 */
export const createQuote = async (formData: TravelFormData): Promise<QuoteResponse> => {
  const provider = determineProvider(formData.selectedPlan?.provider);
  console.log('Selected provider:', provider);
  
  let apiEndpoint: string;
  let payload: any;
  
  if (provider === 'GoDigit') {
    apiEndpoint = 'https://gyaantree.com/api/travel/v1/quickQuote/createQuote/godigit';
    payload = createGoDigitQuotePayload(formData);
  } else if (provider === 'Bajaj') {
    apiEndpoint = 'https://gyaantree.com/api/travel/v1/quickQuote/createQuote/bajaj';
    payload = createBajajQuotePayload(formData);
  } else {
    apiEndpoint = 'https://gyaantree.com/api/travel/v1/quickQuote/createQuote/Reliance';
    payload = createRelianceQuotePayload(formData);
  }
  
  console.log(`Request payload for ${provider}:`, payload);
  
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    if (provider === 'GoDigit') {
      console.log('GoDigit API Response:', data.result.paymentUrl, "payment url");
      window.location.href = data.result.paymentUrl;
    } else if (provider === 'Bajaj') {
      console.log('Bajaj API Response:', data);
      if (data.message === "Bajaj RequestId Successful" && data.url) {
        console.log('Redirecting to Bajaj payment URL:', data.url);
        window.location.href = data.url;
      } else {
        console.error('Unexpected Bajaj response format:', data);
        toast({
          title: "Payment Error",
          description: "Failed to process your payment. Please try again.",
          variant: "destructive",
        });
      }
    } else {
      console.log('API Response:', data);
      if (data.url) {
        window.location.href = data.url;
      }
    }
    
    return data;
  } catch (error) {
    console.error(`Error creating quote for ${provider}:`, error);
    toast({
      title: "Payment Error",
      description: "Failed to process your payment. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};

// Re-export functions from other files for backward compatibility
export { determineProvider } from './insuranceProviderUtils';
export { createGoDigitQuotePayload } from './goDigitQuoteService';
export { createRelianceQuotePayload as createQuotePayload } from './relianceQuoteService';
export { createBajajQuotePayload } from './bajajQuoteService';
