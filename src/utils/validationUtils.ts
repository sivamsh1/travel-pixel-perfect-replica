
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
 * Validates a phone number (allows various formats)
 * @param phone The phone number to validate
 * @returns True if the phone number is valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  // Allows formats: +1234567890, 123-456-7890, (123) 456-7890, 123.456.7890
  // Minimum 10 digits (excluding formatting characters)
  const phoneRegex = /^(?:\+\d{1,3}[-\s]?)?\(?(?:\d{3})?\)?[-\s.]?\d{3}[-\s.]?\d{4,}$/;
  return phoneRegex.test(phone);
};
