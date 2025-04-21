import { toast } from "@/hooks/use-toast";
import { formatDateForAPI, formatDOBForAPI } from './dateFormatUtils';
import { splitName, extractPlanType, createAddressPayload } from './dataTransformUtils';
import { TravelFormData } from './localStorageUtils';
import { QuotePayload, QuoteResponse } from './apiTypes';

/**
 * Create the API request payload from the localStorage data
 * @param formData Travel form data from localStorage
 * @returns Formatted payload for the createQuote API
 */
export const createQuotePayload = (formData: TravelFormData): QuotePayload => {
  const traveller = formData.travellers?.details?.[0] || {};
  const nominee = formData.travellers?.nominee || {};
  const startDate = formatDateForAPI(formData.dates?.startDate);
  const returnDate = formatDateForAPI(formData.dates?.endDate);
  const { firstName, lastName } = splitName(traveller.name);
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
 * Convert app's form data to GoDigit format
 * @param formData Travel form data from localStorage
 * @returns GoDigit-formatted payload object
 */
const createGoDigitPayload = (formData: TravelFormData): any => {
  const traveller = formData.travellers?.details?.[0] || {};
  const nominee = formData.travellers?.nominee || {};
  const address = createAddressPayload(traveller);
  const startDate = formatDateForAPI(formData.dates?.startDate) || "20/05/2025";
  const returnDate = formatDateForAPI(formData.dates?.endDate) || "20/06/2025";
  const destination = formData.location?.destinationId || "679e707934ecd414eb0004f1";
  const mobileNo = traveller.mobileNo || "8281182477";
  const email = traveller.email || "libin@policyinsure.com";
  const { firstName, lastName } = splitName(traveller.name);
  const productName = "RS2";
  const amount = (typeof formData.selectedPlan?.price === "number") 
    ? formData.selectedPlan?.price 
    : 2790.7;
  const nomineeName = nominee.name || "DD";
  const nomineeRelation = nominee.relationship?.toLowerCase() || "father";
  const sponsorName = "SAFAS";
  const sponsorRelationship = "brother";
  const sponsorDob = "01/01/1997";
  const university = "DD";
  const universityAddress = "asd,ccc,asdsa";
  const courseName = "MBA";
  const courseDuration = 3;
  const passportNo = traveller.passportNumber || "C5580445";
  const district = address.district;
  const state = address.state;
  const city = address.city;

  return {
    productName,
    amount,
    startDate,
    returnDate,
    destination,
    bodyCount: formData.travellers?.count ?? 1,
    kycDetails: {
      kycDoc: "passport",
      docuin: passportNo
    },
    clientDetails: {
      salutation: "Mr",
      firstName,
      lastName,
      dob: formatDOBForAPI(traveller.dob) || "28/03/2002",
      gender: "Male",
      mobileNo,
      email,
      communicationAddress: {
        flatNumber: "12",
        streetNumber: address.streetNumber,
        street: address.street,
        district,
        state,
        city,
        country: "India",
        pincode: address.pincode
      }
    },
    insurePersonDetails: [
      {
        salutation: "Mr",
        firstName,
        lastName,
        dob: formatDOBForAPI(traveller.dob) || "17/08/1997",
        gender: "Male",
        email,
        mobileNo,
        passportNo,
        nomineeName,
        nomineeRelation,
        university,
        universityAddress,
        courseName,
        courseDuration,
        communicationAddress: {
          flatNumber: "12",
          streetNumber: address.streetNumber,
          street: address.street,
          district,
          state,
          city,
          country: "India",
          pincode: address.pincode
        },
        sponsorName,
        sponsorRelationship,
        sponsorDob,
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
  const insurer = formData.selectedPlan?.provider?.toLowerCase() || "";
  if (insurer === "godigit" || insurer === "go digit") {
    const payload = createGoDigitPayload(formData);
    console.log('GoDigit Request payload:', payload);

    try {
      const response = await fetch('https://gyaantree.com/api/travel/v1/quickQuote/createQuote/godigit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('GoDigit API error:', errorText);
        throw new Error(`GoDigit API request failed with status ${response.status}: ${errorText}`);
      }
      
      const data = await response.json();
      console.log('GoDigit API Response:', data);

      if (
        data.message === "succesfully done" &&
        data.result?.paymentUrl
      ) {
        window.location.href = data.result.paymentUrl;
        return data;
      }

      toast({
        title: "GoDigit Error",
        description: data.message || "GoDigit API error. Please try again.",
        variant: "destructive",
      });
      throw new Error(data.message || "GoDigit API error");
    } catch (error) {
      console.error('Error creating GoDigit quote:', error);
      toast({
        title: "Payment Error",
        description: "Failed to process your payment. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  }

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
    
    if (data.url) {
      window.location.href = data.url;
    }
    
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
