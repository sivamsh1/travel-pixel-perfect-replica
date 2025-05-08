export interface InsuranceCover {
  coverName?: string;
  coverAmount?: string | number;
}

export interface InsuranceQuote {
  id: string;
  name: string;
  provider: string;
  logo: string;
  description: string;
  details: string;
  price: string;
  benefits: Array<{ icon: string; text: string }>;
  coveragePoints: string[];
  travellersCount: number;
  netPremium: number;
  sumInsured: number;
  planCode?: string;
}

export interface QuoteResponse {
  status?: boolean;
  responseCode?: number;
  responseMsg?: string;
  netPremium?: number | string;
  premium?: number | string;
  planName?: string;
  companyName?: string;
  covers?: InsuranceCover[];
  tax?: string;
  data?: any;
}

export interface InsuranceQuotesState {
  quotes: InsuranceQuote[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
  receivedFirstBatch: boolean;
  socketResponses: any[];
}

export interface QuoteRequestPayload {
  destination: string;
  dob: string[];
  startDate: string;
  returnDate: string;
  trackBaggage: boolean;
  tripDelay: boolean;
  tripType: string;
  bodyCount: number;
  ped: boolean;
  adventureSportsCover: boolean;
  sportsCover: boolean;
  visaRefund: boolean;
  emergencyCover: boolean;
  staffReplacementCover: boolean;
  isCitizen: boolean;
  isIndianResident: boolean;
  si: string;
}
