
import { TravelFormData } from './localStorageUtils';

export type Address = {
  flatNumber: string;
  streetNumber: string;
  street: string;
  district: string;
  state: string;
  city: string;
  country: string;
  pincode: string;
};

export type InsuranceProvider = 'Reliance' | 'GoDigit' | 'Bajaj' | 'Care';

export type QuotePayload = {
  productName: string;
  startDate: string;
  returnDate: string;
  bodyCount: number;
  tripType: string;
  addons: {
    trackBaggage: boolean;
    tripDelay: boolean;
    adventureSportsCover: boolean;
    sportsCover: boolean;
    visaRefund: boolean;
    emergencyCover: boolean;
    staffReplacementCover: boolean;
  };
  kycDetails: {
    passport: string;
  };
  clientDetails: {
    salutation: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    occupation: string;
    mobileNo: string;
    communicationAddress: Address;
    permanantAddress: Address;
    nationality: string;
  };
  insurePersonDetails: {
    salutation: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    occupation: string;
    mobileNo: string;
    proposerRelation: string;
    passportNo: string;
    destination: string;
    IsUnderMedication: boolean;
    ped: boolean;
    nomineeName: string;
    nomineeRelation: string;
    university: string;
    courseDuration: number;
    noofSems: number;
    homeBurglaryAddress: Address;
    homeBurglaryPhone: string;
    sponsorName: string;
    sponsorAddress: Address;
    sponsorPhone: string;
    isDoctor: boolean;
    doctorName: string;
    doctorAddress: Address;
    doctorPhone: string;
    nationality: string;
  };
};

export type GoDigitQuotePayload = {
  productName: string;
  amount: number;
  startDate: string;
  returnDate: string;
  destination: string;
  bodyCount: number;
  kycDetails: {
    kycDoc: string;
    docuin: string;
  };
  clientDetails: {
    salutation: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    mobileNo: string;
    email: string;
    communicationAddress: Address;
  };
  insurePersonDetails: Array<{
    salutation: string;
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    email: string;
    mobileNo: string;
    passportNo: string;
    nomineeName: string;
    nomineeRelation: string;
    university: string;
    universityAddress: string;
    courseName: string;
    courseDuration: number;
    communicationAddress: Address;
    sponsorName: string;
    sponsorRelationship: string;
    sponsorDob: string;
    ped: Array<any>;
  }>;
};

export type QuoteResponse = {
  success?: boolean;
  message?: string;
  url?: string;
  data?: any;
};

