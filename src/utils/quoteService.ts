
import { toast } from "@/hooks/use-toast";
import { formatDateForAPI, formatDOBForAPI } from './dateFormatUtils';
import { splitName, extractPlanType, createAddressPayload } from './dataTransformUtils';
import { TravelFormData } from './localStorageUtils';
import { QuotePayload, GoDigitQuotePayload, QuoteResponse, InsuranceProvider } from './apiTypes';

/**
 * Determine the insurance provider from the plan name
 * @param planName The selected plan name
 * @returns The insurance provider
 */
export const determineProvider = (planName?: string): InsuranceProvider => {
  if (!planName) return 'Reliance';
  
  const planNameLower = planName.toLowerCase();
  
  if (planNameLower.includes('godigit') || planNameLower.includes('go digit')) {
    return 'GoDigit';
  }
  if (planNameLower.includes('bajaj')) {
    return 'Bajaj';
  }
  if (planNameLower.includes('care')) {
    return 'Care';
  }
  
  return 'Reliance';
};

/**
 * Create the API request payload from the localStorage data for Reliance
 * @param formData Travel form data from localStorage
 * @returns Formatted payload for the createQuote API
 */
export const createQuotePayload = (formData: TravelFormData): QuotePayload => {
  const traveller = formData.travellers?.details?.[0] || {};
  const nominee = formData.travellers?.nominee || {};
  const startDate = formatDateForAPI(formData.dates?.startDate);
  const returnDate = formatDateForAPI(formData.dates?.endDate);
  const { firstName, lastName } = splitName(traveller.name);

  // Use formatDOBForAPI to make sure DOB is dd/MM/yyyy (even though now it should already be good)
  let dob = formatDOBForAPI(traveller.dob) || '01/01/1990';

  const productName = extractPlanType(formData.selectedPlan?.name);
  const address = createAddressPayload(traveller);
  const mobileNo = traveller.mobileNo || "9876543210";

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
 * Create GoDigit specific payload
 * @param formData Travel form data from localStorage
 * @returns Formatted payload for GoDigit API
 */
export const createGoDigitQuotePayload = (formData: TravelFormData): GoDigitQuotePayload => {
  const traveller = formData.travellers?.details?.[0] || {};
  const nominee = formData.travellers?.nominee || {};
  const startDate = formatDateForAPI(formData.dates?.startDate);
  const returnDate = formatDateForAPI(formData.dates?.endDate);
  const { firstName, lastName } = splitName(traveller.name);
  
  // Format DOB correctly
  let dob = formatDOBForAPI(traveller.dob) || '01/01/1990';
  
  const address = createAddressPayload(traveller);
  const mobileNo = traveller.mobileNo || "9876543210";
  const email = traveller.email || "user@example.com";
  const destination = formData.location?.destinationId || "679e707834ecd414eb0004f1";
  
  // Extract price from selectedPlan
  let amount = 2790.7; // Default fallback amount
  if (formData.selectedPlan?.price) {
    // Try to extract numeric value from price string (e.g. "₹ 2790.7" -> 2790.7)
    const priceMatch = formData.selectedPlan.price.match(/[\d.]+/);
    if (priceMatch && priceMatch[0]) {
      amount = parseFloat(priceMatch[0]);
    }
  }
  
  return {
    productName: "RS2", // Default product code for GoDigit
    amount: amount,
    startDate: startDate || "20/05/2025",
    returnDate: returnDate || "20/06/2025",
    destination: destination,
    bodyCount: formData.travellers?.count || 1,
    kycDetails: {
      kycDoc: "passport",
      docuin: traveller.passportNumber || "AB1234567"
    },
    clientDetails: {
      salutation: "Mr",
      firstName,
      lastName,
      dob,
      gender: "Male",
      mobileNo,
      email,
      communicationAddress: { ...address }
    },
    insurePersonDetails: [
      {
        salutation: "Mr",
        firstName,
        lastName,
        dob,
        gender: "Male",
        email,
        mobileNo,
        passportNo: traveller.passportNumber || "AB1234567",
        nomineeName: nominee.name || "John Doe",
        nomineeRelation: nominee.relationship?.toLowerCase() || "father",
        university: "Dummy University",
        universityAddress: "University Address, City, Country",
        courseName: "MBA",
        courseDuration: 3,
        communicationAddress: { ...address },
        sponsorName: "Dummy Sponsor",
        sponsorRelationship: "brother",
        sponsorDob: "01/01/1997",
        ped: []
      }
    ]
  };
};

/**
 * Submit the quote to create a policy
 * @param formData Travel form data from localStorage
 * @returns Promise that resolves to the API response
 */
export const createQuote = async (formData: TravelFormData): Promise<QuoteResponse> => {
  // Determine the provider from the selected plan
  const provider = determineProvider(formData.selectedPlan?.provider);
  console.log('Selected provider:', provider);
  
  let apiEndpoint: string;
  let payload: any;
  
  // Prepare the request based on the provider
  if (provider === 'GoDigit') {
    apiEndpoint = 'https://gyaantree.com/api/travel/v1/quickQuote/createQuote/godigit';
    payload = createGoDigitQuotePayload(formData);
  } else {
    // Default to Reliance for all other providers for now
    apiEndpoint = 'https://gyaantree.com/api/travel/v1/quickQuote/createQuote/Reliance';
    payload = createQuotePayload(formData);
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
    
    // Log the response specifically for GoDigit
    if (provider === 'GoDigit') {
      console.log('GoDigit API Response:', data);
    } else {
      console.log('API Response:', data);
    }
    
    if (data.url) {
      window.location.href = data.url;
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
