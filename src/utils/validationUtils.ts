/**
 * Validates an email address
 * @param email The email to validate
 * @returns True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  // More comprehensive email validation
  // Checks for: local part @ domain . tld
  // - Local part can contain letters, numbers, and certain special characters
  // - Domain can contain letters, numbers, dots, and hyphens
  // - TLD must be at least 2 characters
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
};

/**
 * Validates an Indian phone number
 * Rules:
 * - Must be exactly 10 digits
 * - Must start with a digit between 6-9 (as per Indian mobile number standards)
 * - Cannot have all digits the same (e.g., 9999999999)
 * 
 * @param phone The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if exactly 10 digits
  if (digitsOnly.length !== 10) {
    return false;
  }
  
  // Check if the number starts with a valid digit (6, 7, 8, or 9)
  if (!/^[6-9]/.test(digitsOnly)) {
    return false;
  }
  
  // Check if all digits are the same (e.g., 9999999999)
  if (/^(\d)\1{9}$/.test(digitsOnly)) {
    return false;
  }
  
  return true;
};

/**
 * Validates a passport number (exactly 10 characters)
 * @param passport The passport number to validate
 * @returns True if the passport number is valid, false otherwise
 */
export const isValidPassport = (passport: string): boolean => {
  // Check if exactly 10 characters (alphanumeric)
  return /^[A-Za-z0-9]{10}$/.test(passport);
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
