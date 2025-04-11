
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, X } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { PlanToCompare } from '@/components/ComparePopup';
import { insurancePlans } from '@/constants/insurancePlans';

interface ComparisonRowProps {
  label: string;
  values: (string | React.ReactNode)[];
  isHighlighted?: boolean;
  isCategoryHeader?: boolean;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ 
  label, 
  values,
  isHighlighted = false,
  isCategoryHeader = false
}) => {
  return (
    <TableRow className={isHighlighted ? 'bg-blue-50' : ''}>
      <TableCell className={`border-r ${isCategoryHeader ? 'font-semibold text-blue-600' : 'text-gray-700'}`}>
        {label}
      </TableCell>
      {values.map((value, index) => (
        <TableCell 
          key={index} 
          className={`text-center ${index === 0 ? 'bg-[#f5faff]' : 'bg-[#fff9f5]'}`}
        >
          {value}
        </TableCell>
      ))}
    </TableRow>
  );
};

// Default example plans to show when no plans are selected
const defaultPlans: PlanToCompare[] = [
  {
    id: "icon-plan",
    name: "Icon Plan",
    provider: "Reliance General Insurance",
    logo: "https://via.placeholder.com/100x50",
    description: "Reliance General Insurance",
  },
  {
    id: "magna-plan",
    name: "Magna Plan",
    provider: "Future Generali",
    logo: "https://via.placeholder.com/100x50",
    description: "Future Generali",
  }
];

const ComparePlans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use default plans if location.state is null or plans array is missing/empty
  const plans = location.state?.plans && location.state.plans.length >= 2
    ? location.state.plans
    : defaultPlans;

  const handleBack = () => {
    navigate('/plans');
  };
  
  // New function to handle buy now button click
  const handleBuyNow = (planName: string) => {
    // Navigate to the Addons page
    navigate('/addons');
  };

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
              <TableRow>
                <TableHead className="w-1/3 border-r">Coverage Plan</TableHead>
                {plans.map((plan, index) => (
                  <TableHead 
                    key={plan.id} 
                    className={`w-1/3 text-center ${index === 0 ? 'bg-[#f5faff]' : 'bg-[#fff9f5]'}`}
                  >
                    <div className={`rounded-md p-2 text-center ${index === 0 ? 'bg-[#143d7a]' : 'bg-[#FF6B35]'}`}>
                      <div className="text-white font-bold">{plan.name}</div>
                      <div className="text-white text-xs">{index === 0 ? 'AIG Multi Trip with Add-On' : 'HDFC Single Trip (Standard)'}</div>
                    </div>
                    <div className="mt-3 font-bold text-center text-lg">
                      {index === 0 ? '₹ 3998' : '₹ 2500'}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Medical Benefits Category */}
              <ComparisonRow
                label="Medical Benefits"
                values={["", ""]}
                isCategoryHeader={true}
                isHighlighted={true}
              />
              <ComparisonRow 
                label="Medical Expense Coverage" 
                values={["$500", "$50,000"]} 
              />
              <ComparisonRow 
                label="Daily Expense – Loss of Hospitalization" 
                values={["$50 per day | max 7 days", "NA"]} 
              />
              <ComparisonRow 
                label="Personal Accident (Age 18+ Yrs, PD)" 
                values={["$25,000", "NA"]} 
              />
              <ComparisonRow 
                label="Flight Delay" 
                values={["$75", "$50"]} 
              />
              <ComparisonRow 
                label="Flight Delays Coverage" 
                values={["$50 per day | max 7 days", "$50 per day | max 3 days"]} 
              />
              
              {/* Travel Delays & Losses Category */}
              <ComparisonRow
                label="Travel Delays & Losses Benefits"
                values={["", ""]}
                isCategoryHeader={true}
                isHighlighted={true}
              />
              <ComparisonRow 
                label="Flight Delays Coverage" 
                values={["$75", "$50"]} 
              />
              <ComparisonRow 
                label="Loss of Passport" 
                values={["$300", "NA"]} 
              />
              <ComparisonRow 
                label="Trip Delay" 
                values={["$300", "$100 per day | max 7 days"]} 
              />
              
              {/* Property Losses Category */}
              <ComparisonRow
                label="Property Losses"
                values={["", ""]}
                isCategoryHeader={true}
                isHighlighted={true}
              />
              <ComparisonRow 
                label="Checked-in Luggage" 
                values={["$25,000", "$10,000"]} 
              />
              <ComparisonRow 
                label="Home Break-in during trip" 
                values={["$25,000", "NA"]} 
              />
              <ComparisonRow 
                label="Bail Bond" 
                values={["$500", "NA"]} 
              />

              {/* Support Features */}
              <ComparisonRow
                label="Additional Features"
                values={["", ""]}
                isCategoryHeader={true}
                isHighlighted={true}
              />
              <ComparisonRow 
                label="Adventure Protection (in case of injury during sport)" 
                values={[<Check key="1" className="mx-auto text-green-500" />, <X key="2" className="mx-auto text-red-500" />]} 
              />
              <ComparisonRow 
                label="Bounce Coverage Cover" 
                values={[<Check key="1" className="mx-auto text-green-500" />, <X key="2" className="mx-auto text-red-500" />]} 
              />
              <ComparisonRow 
                label="Covid cover" 
                values={[<Check key="1" className="mx-auto text-green-500" />, <X key="2" className="mx-auto text-red-500" />]} 
              />
              <ComparisonRow 
                label="Hotel cover" 
                values={[<Check key="1" className="mx-auto text-green-500" />, <X key="2" className="mx-auto text-red-500" />]} 
              />

              {/* Action row */}
              <TableRow>
                <TableCell className="border-r">
                  <div className="text-blue-600 font-bold">Pick this plan that best fits for you</div>
                </TableCell>
                {plans.map((plan, index) => (
                  <TableCell key={index} className={`text-center ${index === 0 ? 'bg-[#f5faff]' : 'bg-[#fff9f5]'}`}>
                    <div className="text-xs mb-2 text-gray-500">
                      Have any query about this policy? Contact us
                    </div>
                    <Button 
                      className={`${index === 0 ? 'bg-[#143d7a] hover:bg-[#143d7a]/80' : 'bg-[#FF6B35] hover:bg-[#FF6B35]/80'} cursor-pointer transition-colors`}
                      size="sm"
                      onClick={() => handleBuyNow(plan.name)}
                    >
                      Buy Now
                    </Button>
                  </TableCell>
                ))}
              </TableRow>
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
