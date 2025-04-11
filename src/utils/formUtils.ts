
import { isValidEmail, isValidPhone } from '@/utils/validationUtils';

interface FormErrors {
  email: string;
  phone: string;
}

// Validates contact form data
export const validateContactForm = (email: string, phone: string): { isValid: boolean; errors: FormErrors } => {
  let isValid = true;
  const newErrors: FormErrors = { email: '', phone: '' };

  // Validate email
  if (!email) {
    newErrors.email = 'Email is required';
    isValid = false;
  } else if (!isValidEmail(email)) {
    newErrors.email = 'Please enter a valid email address';
    isValid = false;
  }

  // Validate phone number - must be exactly 10 digits
  if (!phone) {
    newErrors.phone = 'Phone number is required';
    isValid = false;
  } else if (!isValidPhone(phone)) {
    newErrors.phone = 'Please enter a valid 10-digit phone number';
    isValid = false;
  }

  return { isValid, errors: newErrors };
};

// Convert date from DD/MM/YYYY to JavaScript Date object
export const convertToJsDateFormat = (dateString: string): Date => {
  const [day, month, year] = dateString.split('/');
  return new Date(`${year}-${month}-${day}`);
};

// Format travel data for logging/submission
export const formatTravelData = () => {
  const travelData = {
    destination: "679e707834ecd414eb0004de",
    dob: "17/08/1997", // Static DOB as required
    startDate: "19/06/2025", // Static start date as required
    returnDate: "29/07/2025", // Static end date as required
  };

  // Convert dates to JavaScript Date objects
  return {
    ...travelData,
    dob: convertToJsDateFormat(travelData.dob),
    startDate: convertToJsDateFormat(travelData.startDate),
    returnDate: convertToJsDateFormat(travelData.returnDate)
  };
};
