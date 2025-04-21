
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';
import Layout from '@/components/Layout';
import { 
  Table,
  TableBody,
  TableHeader,
} from "@/components/ui/table";
import { PlanToCompare } from '@/components/ComparePopup';
import ComparisonRow from '@/components/comparison/ComparisonRow';
import PlanHeaders from '@/components/comparison/PlanHeaders';
import PlanActions from '@/components/comparison/PlanActions';
import ComparisonCategory from '@/components/comparison/ComparisonCategory';
import { getComparisonPlans } from '@/utils/comparisonStorageUtils';

// Default example plans if no comparison plans present
const defaultPlans: PlanToCompare[] = [
  {
    id: "icon-plan",
    name: "Icon Plan",
    provider: "Reliance General Insurance",
    logo: "https://via.placeholder.com/100x50",
    price: '₹3998',
    description: "Reliance General Insurance",
  },
  {
    id: "magna-plan",
    name: "Magna Plan",
    provider: "Future Generali",
    logo: "https://via.placeholder.com/100x50",
    price: '₹2500',
    description: "Future Generali",
  }
];

const ComparePlans = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [comparedPlans, setComparedPlans] = useState<PlanToCompare[]>(defaultPlans);

  useEffect(() => {
    // Use localStorage comparison plans if available
    const localPlans = getComparisonPlans();
    if (localPlans && localPlans.length >= 2) {
      setComparedPlans(localPlans);
    } else if (location.state?.plans && location.state.plans.length >= 2) {
      setComparedPlans(location.state.plans);
    } else {
      setComparedPlans(defaultPlans);
    }
  }, [location.state?.plans]);

  const handleBack = () => {
    navigate('/plans');
  };

  const medicalBenefitsRows = [
    { label: "Medical Expense Coverage", values: ["$500", "$50,000"] },
    { label: "Daily Expense – Loss of Hospitalization", values: ["$50 per day | max 7 days", "NA"] },
    { label: "Personal Accident (Age 18+ Yrs, PD)", values: ["$25,000", "NA"] },
    { label: "Flight Delay", values: ["$75", "$50"] },
    { label: "Flight Delays Coverage", values: ["$50 per day | max 7 days", "$50 per day | max 3 days"] }
  ];

  const travelDelaysRows = [
    { label: "Flight Delays Coverage", values: ["$75", "$50"] },
    { label: "Loss of Passport", values: ["$300", "NA"] },
    { label: "Trip Delay", values: ["$300", "$100 per day | max 7 days"] }
  ];

  const propertyLossesRows = [
    { label: "Checked-in Luggage", values: ["$25,000", "$10,000"] },
    { label: "Home Break-in during trip", values: ["$25,000", "NA"] },
    { label: "Bail Bond", values: ["$500", "NA"] }
  ];

  const additionalFeaturesRows = [
    { 
      label: "Adventure Protection (in case of injury during sport)", 
      values: [<Check key="1" className="mx-auto text-green-500" />, <X key="2" className="mx-auto text-red-500" />] 
    },
    { 
      label: "Bounce Coverage Cover", 
      values: [<Check key="1" className="mx-auto text-green-500" />, <X key="2" className="mx-auto text-red-500" />] 
    },
    { 
      label: "Covid cover", 
      values: [<Check key="1" className="mx-auto text-green-500" />, <X key="2" className="mx-auto text-red-500" />] 
    },
    { 
      label: "Hotel cover", 
      values: [<Check key="1" className="mx-auto text-green-500" />, <X key="2" className="mx-auto text-red-500" />] 
    }
  ];

  return (
    <Layout>
      <div className="px-2 md:px-6 lg:px-12 max-w-7xl mx-auto">
        <button 
          onClick={handleBack} 
          className="flex items-center text-gray-600 mt-6 mb-4"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to Plans</span>
        </button>
        
        <h1 className="text-3xl font-bold mb-2 text-center">Plan Comparison</h1>
        <p className="text-center text-sm text-gray-600 mb-6">Summary - 1 traveller | 11 Oct - 20 Oct '23</p>
        
        <div className="overflow-x-auto pb-10">
          <Table className="border">
            <TableHeader>
              <PlanHeaders plans={comparedPlans} />
            </TableHeader>
            <TableBody>
              <ComparisonCategory 
                title="Medical Benefits" 
                rows={medicalBenefitsRows} 
              />
              
              <ComparisonCategory 
                title="Travel Delays & Losses Benefits" 
                rows={travelDelaysRows} 
              />
              
              <ComparisonCategory 
                title="Property Losses" 
                rows={propertyLossesRows} 
              />
              
              <ComparisonCategory 
                title="Additional Features" 
                rows={additionalFeaturesRows} 
              />
              <PlanActions plans={comparedPlans} />
            </TableBody>
          </Table>
        </div>
        
        <div className="text-center text-xs text-gray-500 mb-6">
          © Travel Insurance 2023
        </div>
      </div>
    </Layout>
  );
};

export default ComparePlans;
