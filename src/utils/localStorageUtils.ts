
interface LocationData {
  region: string;
  destination: string;
  destinationId: string;
}

interface DatesData {
  startDate: string;
  endDate: string;
  duration: number;
}

interface TravellerDetail {
  passportNumber?: string;
  name?: string;
  dob?: string;
  age?: string;
  address?: string;
  pincode?: string;
  city?: string;
  mobileNo?: string;
  email?: string;
  hasPreExistingCondition?: boolean;
}

interface NomineeData {
  name?: string;
  relationship?: string;
}

interface TravellersData {
  count: number;
  details: TravellerDetail[];
  nominee?: NomineeData;
}

interface ContactData {
  email: string;
  phone: string;
  agreeToContact: boolean;
}

export interface TravelFormData {
  location?: LocationData;
  dates?: DatesData;
  travellers?: TravellersData;
  contact?: ContactData;
}

const STORAGE_KEY = 'travel_form_data';

export const saveToLocalStorage = (key: keyof TravelFormData, data: any) => {
  try {
    // Get existing data
    const existingData = getFromLocalStorage() || {};
    
    // Update with new data
    const updatedData = {
      ...existingData,
      [key]: data
    };
    
    // Save back to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    
    return true;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return false;
  }
};

export const getFromLocalStorage = (): TravelFormData | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error retrieving from localStorage:', error);
    return null;
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
};
