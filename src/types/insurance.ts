
export interface Benefit {
  icon: string;
  text: string;
  amount: string;
}

export interface InsurancePlan {
  id: string;
  name: string;
  provider: string;
  logo: string;
  description: string;
  details: string;
  price: string;
  benefits: Benefit[];
  coveragePoints: string[];
  travellersCount?: number;
  netPremium?: number | null;
}
