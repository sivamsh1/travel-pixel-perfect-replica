
import { toast } from "@/hooks/use-toast";
import { formatDateForAPI } from './dateFormatUtils';
import { splitName, extractPlanType, createAddressPayload } from './dataTransformUtils';
import { TravelFormData } from './localStorageUtils';
import { QuotePayload, QuoteResponse } from './apiTypes';

/**
 * Create the API request payload from the localStorage data
 * @param formData Travel form data from localStorage
 * @returns Formatted payload for the createQuote API
 */
export const createQuotePayload = (formData: TravelFormData): QuotePayload => {
  // Extract traveller data
  const traveller = formData.travellers?.details?.[0] || {};
  const nominee = formData.travellers?.nominee || {};
  
  // Format dates
  const startDate = formatDateForAPI(formData.dates?.startDate);
  const returnDate = formatDateForAPI(formData.dates?.endDate);
  
  // Format name
  const { firstName, lastName } = splitName(traveller.name);
  
  // Format DOB
  let dob = formatDateForAPI(traveller.dob) || '01/01/1990';
  
  // Extract plan type (Basic, Silver, Gold, Platinum)
  const productName = extractPlanType(formData.selectedPlan?.name);
  
  // Build address object with default values to ensure none are empty
  const address = createAddressPayload(traveller);
  
  // Default phone number if not provided
  const mobileNo = traveller.mobileNo || "9876543210";

  // Build the complete payload with no empty fields
  return {
    productName,
    startDate: startDate || "17/04/2025",
    returnDate: returnDate || "19/04/2025",
    bodyCount: formData.travellers?.count || 1,
    tripType: "single",
    addons: {
      trackBaggage: false,
      tripDelay: false,
      adventureSportsCover: false,
      sportsCover: false,
      visaRefund: false,
      emergencyCover: false,
      staffReplacementCover: false
    },
    kycDetails: {
      passport: traveller.passportNumber || "AB1234567"
    },
    clientDetails: {
      salutation: "Mr", 
      firstName,
      lastName,
      dob,
      gender: "Male",
      occupation: "Student",
      mobileNo,
      communicationAddress: { ...address },
      permanantAddress: { ...address },
      nationality: "India"
    },
    insurePersonDetails: {
      salutation: "Mr", 
      firstName,
      lastName,
      dob,
      gender: "Male", 
      occupation: "Student",
      mobileNo,
      proposerRelation: "self",
      passportNo: traveller.passportNumber || "AB1234567",
      destination: formData.location?.destinationId || "679e707834ecd414eb0004de",
      IsUnderMedication: traveller.hasPreExistingCondition || false,
      ped: traveller.hasPreExistingCondition || false,
      nomineeName: nominee.name || "John Doe",
      nomineeRelation: nominee.relationship?.toLowerCase() || "other",
      university: "Dummy University",
      courseDuration: 2,
      noofSems: 4,
      homeBurglaryAddress: { ...address },
      homeBurglaryPhone: mobileNo,
      sponsorName: "Dummy Sponsor",
      sponsorAddress: { ...address },
      sponsorPhone: mobileNo,
      isDoctor: false,
      doctorName: "Dr. Smith", 
      doctorAddress: { ...address },
      doctorPhone: "9876543210",
      nationality: "India"
    }
  };
};

/**
 * Submit the quote to create a policy
 * @param formData Travel form data from localStorage
 * @returns Promise that resolves to the API response
 */
export const createQuote = async (formData: TravelFormData): Promise<QuoteResponse> => {
  const payload = createQuotePayload(formData);
  console.log('Request payload:', payload);
  
  try {
    const response = await fetch('https://gyaantree.com/api/travel/v1/quickQuote/createQuote/Reliance', {
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
    console.log('API Response:', data);
    return data;
  } catch (error) {
    console.error('Error creating quote:', error);
    toast({
      title: "Payment Error",
      description: "Failed to process your payment. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
};
