import { formatDateForAPI, formatDOBForAPI } from './dateFormatUtils';
import { splitName, createAddressPayload } from './dataTransformUtils';
import { TravelFormData } from './localStorageUtils';
import { parse, isValid, format } from 'date-fns';

/**
 * Create Bajaj specific payload
 * @param formData Travel form data from localStorage
 * @returns Formatted payload for Bajaj API
 */
export const createBajajQuotePayload = (formData: TravelFormData) => {
  const traveller = formData.travellers?.details?.[0] || {};
  const nominee = formData.travellers?.nominee || {};
  
  // Format dates as per Bajaj API requirements - "DD-MMM-YYYY"
  const startDate = formatBajajDate(formData.dates?.startDate);
  const endDate = formatBajajDate(formData.dates?.endDate);
  
  // Get traveler details
  const { firstName, lastName } = splitName(traveller.name);
  const dob = formatBajajDate(traveller.dob);
  const communicationAddress = createAddressPayload(traveller);
  const gender = traveller.gender === 'Female' ? 'F' : 'M';
  const mobileNo = traveller.mobileNo || '9999988888';
  const email = traveller.email || 'test.user@example.com';
  const passportNo = traveller.passportNumber || 'T1234567';
  const destination = formData.location?.destinationId || '679e707834ecd414eb0004df';
  
  // Calculate age if available from DOB
  let age = 34; // Default fallback
  if (traveller.dob) {
    try {
      // Parse DOB string properly
      let dobDate;
      
      // Try parsing different formats
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(traveller.dob)) {
        // DD/MM/YYYY format
        const [day, month, year] = traveller.dob.split('/').map(Number);
        dobDate = new Date(year, month - 1, day);
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(traveller.dob)) {
        // YYYY-MM-DD format
        dobDate = parse(traveller.dob, 'yyyy-MM-dd', new Date());
      } else {
        // Try standard JS date parsing
        dobDate = new Date(traveller.dob);
      }
      
      if (isValid(dobDate)) {
        const today = new Date();
        age = today.getFullYear() - dobDate.getFullYear();
        
        // Adjust age if birthday hasn't occurred yet this year
        const m = today.getMonth() - dobDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
          age--;
        }
      }
    } catch (error) {
      console.error('Error calculating age:', error);
    }
  }
  
  // Determine plan name and area plan from selected plan
  const planName = formData.selectedPlan?.name || 'Travel Prime Student Gold 200000 USD';
  const areaPlan = determineAreaPlan(formData.selectedPlan?.name);
  
  return {
    planName: planName,
    areaPlan: areaPlan,
    startDate: startDate,
    endDate: endDate,
    destination: destination,
    proposerDetails: {
      salutation: traveller.salutation || 'Mr',
      firstName: firstName,
      middleName: '',
      lastName: lastName || 'User',
      dob: dob,
      gender: gender,
      communicationAddress: {
        flatNumber: communicationAddress.flatNumber,
        streetNumber: communicationAddress.streetNumber,
        street: communicationAddress.street,
        district: communicationAddress.district,
        state: communicationAddress.state,
        city: communicationAddress.city,
        pincode: communicationAddress.pincode
      },
      mobileNo: mobileNo,
      email: email,
      passportNo: passportNo
    },
    insuredPersons: [
      {
        firstName: firstName,
        lastName: lastName || 'User',
        dob: dob,
        gender: gender,
        passportNo: passportNo,
        relation: 'SELF',
        age: age
      }
    ],
    nomineeDetails: {
      nomineeName: nominee.name || 'Nominee Name',
      nomineeRelation: nominee.relationship || 'Spouse'
    },
    pedDetails: {
      pspCondition: traveller.hasPreExistingCondition ? 'Y' : 'N',
      pedDiseases: traveller.medicalCondition || ''
    }
  };
};

/**
 * Format date for Bajaj API (DD-MMM-YYYY)
 * @param dateStr Date string in any format
 * @returns Formatted date string for Bajaj API
 */
const formatBajajDate = (dateStr?: string): string => {
  if (!dateStr) return '01-Jan-1990';
  
  try {
    // Default fallback
    let validDate = new Date('1990-01-01');
    let isDateValid = false;
    
    // Try parsing different formats
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      // DD/MM/YYYY format
      const [day, month, year] = dateStr.split('/').map(Number);
      const parsedDate = new Date(year, month - 1, day);
      if (isValid(parsedDate)) {
        validDate = parsedDate;
        isDateValid = true;
      }
    } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      // YYYY-MM-DD format
      const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date());
      if (isValid(parsedDate)) {
        validDate = parsedDate;
        isDateValid = true;
      }
    } else {
      // Try standard JS date parsing
      const parsedDate = new Date(dateStr);
      if (isValid(parsedDate) && !isNaN(parsedDate.getTime())) {
        validDate = parsedDate;
        isDateValid = true;
      }
    }
    
    if (!isDateValid) {
      console.warn(`Invalid date format: ${dateStr}, using default`);
      return '01-Jan-1990';
    }
    
    // Format the date as DD-MMM-YYYY
    const day = String(validDate.getDate()).padStart(2, '0');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[validDate.getMonth()];
    const year = validDate.getFullYear();
    
    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error('Error formatting date for Bajaj:', error, 'with input:', dateStr);
    return '01-Jan-1990'; // Default fallback
  }
};

/**
 * Determine area plan based on selected plan name
 * @param planName Selected plan name
 * @returns Area plan string
 */
const determineAreaPlan = (planName?: string): string => {
  if (!planName) return 'Worldwide Including USA and Canada';
  
  const planNameLower = planName.toLowerCase();
  
  if (planNameLower.includes('usa') || planNameLower.includes('worldwide')) {
    return 'Worldwide Including USA and Canada';
  }
  
  if (planNameLower.includes('excluding usa')) {
    return 'Worldwide Excluding USA and Canada';
  }
  
  // Default to worldwide coverage
  return 'Worldwide Including USA and Canada';
}; 