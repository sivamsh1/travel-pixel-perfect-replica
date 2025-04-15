
/**
 * Validates an email address
 * @param email The email to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  // RFC 5322 compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
};

/**
 * Validates a phone number (requires exactly 10 digits)
 * @param phone The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  // Check if exactly 10 digits
  return digitsOnly.length === 10;
};

/**
 * Validates a passport number (basic validation - at least 8 characters)
 * @param passport The passport number to validate
 * @returns True if the passport number is valid, false otherwise
 */
export const isValidPassport = (passport: string): boolean => {
  // Basic validation - at least 8 characters
  return passport.length >= 8;
};

/**
 * Validates an Indian pincode (exactly 6 digits)
 * @param pincode The pincode to validate
 * @returns True if the pincode is valid, false otherwise
 */
export const isValidPincode = (pincode: string): boolean => {
  return /^\d{6}$/.test(pincode);
};

/**
 * Validates a name (at least 3 characters)
 * @param name The name to validate
 * @returns True if the name is valid, false otherwise
 */
export const isValidName = (name: string): boolean => {
  return name.trim().length >= 3;
};
