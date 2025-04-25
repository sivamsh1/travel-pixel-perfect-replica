
import { formatDateForAPI, formatDOBForAPI } from './dateFormatUtils';
import { splitName, extractPlanType, createAddressPayload } from './dataTransformUtils';
import { TravelFormData } from './localStorageUtils';
import { QuotePayload } from './apiTypes';

/**
 * Create the API request payload from the localStorage data for Reliance
 * @param formData Travel form data from localStorage
 * @returns Formatted payload for the createQuote API
 */
export const createRelianceQuotePayload = (formData: TravelFormData): QuotePayload => {
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
