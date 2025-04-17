
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface LocationData {
  stateId: number;
  districtId: number;
  cityId: number;
  cityName: string;
}

export interface TravellerDetails {
  dob?: string;
  age?: string;
  passportNumber?: string;
  name?: string;
  address?: string;
  pincode?: string;
  city?: string;
  mobileNo?: string;
  email?: string;
  hasPreExistingCondition?: boolean;
  locationData?: LocationData; // Added location data
}

export interface NomineeDetails {
  name?: string;
  relationship?: string;
}

interface TravelFormContextType {
  region: string;
  setRegion: (region: string) => void;
  destination: string;
  setDestination: (destination: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  duration: number;
  setDuration: (days: number) => void;
  travellersCount: number;
  setTravellersCount: (count: number) => void;
  travellers: TravellerDetails[];
  updateTraveller: (index: number, details: Partial<TravellerDetails>) => void;
  contactEmail: string;
  setContactEmail: (email: string) => void;
  contactPhone: string;
  setContactPhone: (phone: string) => void;
  agreeToContact: boolean;
  setAgreeToContact: (agree: boolean) => void;
  selectedPlan: string;
  setSelectedPlan: (plan: string) => void;
  selectedAddOns: string[];
  addAddOn: (addon: string) => void;
  removeAddOn: (addon: string) => void;
  nominee: NomineeDetails;
  updateNominee: (details: Partial<NomineeDetails>) => void;
  agreeToTerms: boolean;
  setAgreeToTerms: (agree: boolean) => void;
}

const TravelFormContext = createContext<TravelFormContextType | undefined>(undefined);

export const TravelFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [region, setRegion] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [travellersCount, setTravellersCount] = useState<number>(1);
  const [travellers, setTravellers] = useState<TravellerDetails[]>([{}]);
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [agreeToContact, setAgreeToContact] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<string>('Icon Plan');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [nominee, setNominee] = useState<NomineeDetails>({});
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const updateTraveller = (index: number, details: Partial<TravellerDetails>) => {
    setTravellers(prev => {
      const newTravellers = [...prev];
      newTravellers[index] = { ...newTravellers[index], ...details };
      return newTravellers;
    });
  };

  const updateNominee = (details: Partial<NomineeDetails>) => {
    setNominee(prev => ({ ...prev, ...details }));
  };

  const addAddOn = (addon: string) => {
    setSelectedAddOns(prev => [...prev, addon]);
  };

  const removeAddOn = (addon: string) => {
    setSelectedAddOns(prev => prev.filter(item => item !== addon));
  };

  // Update travellers array when count changes
  React.useEffect(() => {
    setTravellers(prev => {
      if (prev.length === travellersCount) return prev;
      
      if (prev.length < travellersCount) {
        return [...prev, ...Array(travellersCount - prev.length).fill({})];
      } else {
        return prev.slice(0, travellersCount);
      }
    });
  }, [travellersCount]);

  return (
    <TravelFormContext.Provider
      value={{
        region,
        setRegion,
        destination,
        setDestination,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        duration,
        setDuration,
        travellersCount,
        setTravellersCount,
        travellers,
        updateTraveller,
        contactEmail,
        setContactEmail,
        contactPhone,
        setContactPhone,
        agreeToContact,
        setAgreeToContact,
        selectedPlan,
        setSelectedPlan,
        selectedAddOns,
        addAddOn,
        removeAddOn,
        nominee,
        updateNominee,
        agreeToTerms,
        setAgreeToTerms,
      }}
    >
      {children}
    </TravelFormContext.Provider>
  );
};

export const useTravelForm = () => {
  const context = useContext(TravelFormContext);
  if (context === undefined) {
    throw new Error('useTravelForm must be used within a TravelFormProvider');
  }
  return context;
};
