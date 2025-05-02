
import { formatDateForAPI, formatDOBForAPI } from './dateFormatUtils';
import { splitName, createAddressPayload } from './dataTransformUtils';
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
  
  const address = createAddressPayload(traveller);
  const mobileNo = traveller.mobileNo || "9876543210";
  const email = traveller.email || "user@example.com";
  
  // Use the _id from traveller's locationData if available, otherwise fall back to destination ID
  const destination = traveller.locationData?._id || formData.location?.destinationId || "679e707834ecd414eb0004f1";
  
  let amount = 2790.7;
  if (formData.selectedPlan?.price) {
    const priceMatch = formData.selectedPlan.price.match(/[\d.]+/);
    if (priceMatch && priceMatch[0]) {
      amount = parseFloat(priceMatch[0]);
    }
  }
  
  // Default university address that fits within 30 chars
  const defaultUniversityAddress = "DU Main Campus";
  
  return {
    productName: "RS2",
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
