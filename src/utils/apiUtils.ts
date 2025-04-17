
import { format, parse } from 'date-fns';
import { toast } from "@/components/ui/use-toast";
import { TravelFormData } from './localStorageUtils';

/**
 * Format a date string from ISO format (YYYY-MM-DD) to DD/MM/YYYY
 * @param dateStr ISO date string
 * @returns Formatted date string or empty string on error
 */
export const formatDateForAPI = (dateStr?: string): string => {
  if (!dateStr) return '';
  
  try {
    const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date());
    return format(parsedDate, 'dd/MM/yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format a full name into first name and last name
 * @param fullName Full name string
 * @returns Object containing firstName and lastName
 */
export const splitName = (fullName?: string): { firstName: string, lastName: string } => {
  if (!fullName) return { firstName: '', lastName: '' };
  
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';
  
  return { firstName, lastName };
};

/**
 * Extract plan name from the selectedPlan.name - just get Basic, Silver, Gold, or Platinum
 * @param planName The full plan name
 * @returns Basic, Silver, Gold or Platinum
 */
export const extractPlanType = (planName?: string): string => {
  if (!planName) return 'Silver'; // Default fallback
  
  const planTypes = ['Basic', 'Silver', 'Gold', 'Platinum'];
  
  for (const type of planTypes) {
    if (planName.includes(type)) {
      return type;
    }
  }
  
  return 'Silver'; // Default fallback if no match
};

/**
 * Create the API request payload from the localStorage data
 * @param formData Travel form data from localStorage
 * @returns Formatted payload for the createQuote API
 */
export const createQuotePayload = (formData: TravelFormData) => {
  // Extract traveller data
  const traveller = formData.travellers?.details?.[0] || {};
  const nominee = formData.travellers?.nominee || {};
  const locationData = traveller.locationData || { stateId: 0, districtId: 0, cityId: 0 };
  
  // Format dates
  const startDate = formatDateForAPI(formData.dates?.startDate);
  const returnDate = formatDateForAPI(formData.dates?.endDate);
  
  // Format name
  const { firstName, lastName } = splitName(traveller.name);
  
  // Format DOB
  let dob = '';
  if (traveller.dob) {
    try {
      const dobDate = new Date(traveller.dob);
      dob = format(dobDate, 'dd/MM/yyyy');
    } catch (error) {
      console.error('Error formatting DOB:', error);
    }
  }
  
  // Extract plan type (Basic, Silver, Gold, Platinum)
  const productName = extractPlanType(formData.selectedPlan?.name);
  
  // Build address object
  const address = {
    flatNumber: "12", // Default values as these aren't in our form
    streetNumber: traveller.address || "",
    street: traveller.city || "",
    district: locationData.districtId.toString(),
    state: locationData.stateId.toString(),
    city: locationData.cityId.toString(),
    country: "India",
    pincode: traveller.pincode || ""
  };
  
  // Build the complete payload
  return {
    productName,
    startDate,
    returnDate,
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
      passport: traveller.passportNumber || ""
    },
    clientDetails: {
      salutation: "Mr", // Default as we don't collect this
      firstName,
      lastName,
      dob,
      gender: "Male", // Default as we don't collect this
      occupation: "Student",
      mobileNo: traveller.mobileNo || "",
      communicationAddress: { ...address },
      permanantAddress: { ...address },
      nationality: "India"
    },
    insurePersonDetails: {
      salutation: "Mr", // Default
      firstName,
      lastName,
      dob,
      gender: "Male", // Default
      occupation: "Student",
      mobileNo: traveller.mobileNo || "",
      proposerRelation: "self",
      passportNo: traveller.passportNumber || "",
      destination: formData.location?.destinationId || "",
      IsUnderMedication: traveller.hasPreExistingCondition || false,
      ped: traveller.hasPreExistingCondition || false,
      nomineeName: nominee.name || "",
      nomineeRelation: nominee.relationship?.toLowerCase() || "other",
      university: "Dummy University", // Using defaults for student specific fields
      courseDuration: 2,
      noofSems: 4,
      homeBurglaryAddress: { ...address },
      homeBurglaryPhone: traveller.mobileNo || "",
      sponsorName: "Dummy Sponsor",
      sponsorAddress: { ...address },
      sponsorPhone: traveller.mobileNo || "",
      isDoctor: false,
      doctorName: "",
      doctorAddress: { ...address },
      doctorPhone: "",
      nationality: "India"
    }
  };
};

/**
 * Submit the quote to create a policy
 * @param formData Travel form data from localStorage
 * @returns Promise that resolves to the API response
 */
export const createQuote = async (formData: TravelFormData) => {
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
      throw new Error(`API request failed with status ${response.status}`);
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
