import { formatDateForAPI, formatDOBForAPI } from './dateFormatUtils';
import { splitName, createAddressPayload, createAddressPayloadGodigit } from './dataTransformUtils';
import { TravelFormData } from './localStorageUtils';
import { GoDigitQuotePayload } from './apiTypes';



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
  
  let dob = formatDOBForAPI(traveller.dob) || '01/01/1990';
  
  const address = createAddressPayloadGodigit(traveller);
  const mobileNo = traveller.mobileNo || "9876543210";
  const email = traveller.email || "user@example.com";
  const destination = formData.location?.destinationId || "679e707834ecd414eb0004f1";
  
  let amount = 2790.7;
  if (formData.selectedPlan?.price) {
    const priceMatch = formData.selectedPlan.price.match(/[\d.]+/);
    if (priceMatch && priceMatch[0]) {
      amount = parseFloat(priceMatch[0]);
      amount = (amount * 0.18 ) + amount;
      amount = parseFloat(amount.toFixed(2));
    }
  }
  
  // Extract planCode from the plan name
  const planName = formData.selectedPlan?.name || '';
  const parts = planName.split("-");
  const planCode = formData.selectedPlan?.planCode || "RS5"; // Default to RS5 if no plan code found
  
  // Default university address that fits within 30 chars
  const defaultUniversityAddress = "DU Main Campus";
  
  return {
    productName: planCode, // Use planCode as the value for productName
    amount,
    startDate: startDate || "20/05/2025",
    returnDate: returnDate || "20/06/2025",
    destination,
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
        university: "DU",
        universityAddress: defaultUniversityAddress,
        courseName: "MBA",
        courseDuration: 3,
        communicationAddress: { ...address },
        sponsorName: "Default Sponsor",
        sponsorRelationship: "brother",
        sponsorDob: "01/01/1997",
        ped: []
      }
    ]
  };
};
