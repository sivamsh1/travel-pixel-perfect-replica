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

export interface TravellerLocationData {
  stateId: number;
  districtId: number;
  cityId: number;
  cityName: string;
  _id: string; // Added _id field
}

export interface TravellerDetail {
  passportNumber?: string;
  name?: string;
  forename?: string;  // Added forename field
  lastname?: string;  // Added lastname field
  salutation?: string; // Added salutation field
  gender?: string;    // Added gender field
  dob?: string;
  age?: string;
  address?: string;
  pincode?: string;
  city?: string;
  mobileNo?: string;
  email?: string;
  hasPreExistingCondition?: boolean;
  medicalCondition?: string;  // Add this field that was missing
  locationData?: TravellerLocationData;
}

export interface NomineeData {
  name?: string;
  relationship?: string;
  dob?: string;
}

export interface ProposerData {
  type?: string;
  salutation?: string;
  name?: string;
  gender?: string;
  maritalStatus?: string;
  occupation?: string;
  passportNumber?: string;
  communicationAddress?: string;
  permanentAddress?: string;
}

interface TravellersData {
  count: number;
  details: TravellerDetail[];
  nominee?: NomineeData;
  proposer?: ProposerData;
}

interface ContactData {
  email: string;
  phone: string;
  agreeToContact: boolean;
}

interface PlanData {
  name: string;
  provider: string;
  price: string;
  details?: string;
  insurer?: string;
  sumInsured?: string;
  planCode?: string;
}

export interface TravelFormData {
  location?: LocationData;
  dates?: DatesData;
  travellers?: TravellersData;
  contact?: ContactData;
  selectedPlan?: PlanData;
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
