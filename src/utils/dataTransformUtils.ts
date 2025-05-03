
/**
 * Format a full name into first name and last name
 * @param fullName Full name string
 * @returns Object containing firstName and lastName
 */
export const splitName = (fullName?: string): { firstName: string, lastName: string } => {
  if (!fullName) return { firstName: 'John', lastName: 'Doe' };
  
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || 'John';
  const lastName = nameParts.slice(1).join(' ') || 'Doe';
  
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
 * Creates a default address object with fallback values
 * @param traveller Traveller data
 * @returns Formatted address object with no empty fields
 */
export const createAddressPayload = (traveller: any) => {
  const locationData = traveller.locationData || { stateId: 0, districtId: 0, cityId: 0 };
  
  return {
    flatNumber: traveller.address ? "12" : "12", // Default value
    streetNumber: traveller.address || "123 Main Street",
    street: traveller.city || "New Delhi",
    district: locationData.districtId ? locationData.districtId.toString() : "1",
    state: locationData.stateId ? locationData.stateId.toString() : "1",
    city: locationData.cityId ? locationData.cityId.toString() : "1",
    country: "India",
    pincode: traveller.pincode || "110001"
  };
};
export const createAddressPayloadGodigit = (traveller: any) => {
  const locationData = traveller.locationData || { stateId: 0, districtId: 0, cityId: 0 };
  
  return {
    flatNumber: traveller.address ? "12" : "12", // Default value
    streetNumber: traveller.address || "123 Main Street",
    street: traveller.city || "New Delhi",
    district: locationData.districtId ? locationData.districtId.toString() : "1",
    state: locationData._id ? locationData._id.toString() : "1",
    city: locationData.cityId ? locationData.cityId.toString() : "1",
    country: "India",
    pincode: traveller.pincode || "110001"
  };
};
