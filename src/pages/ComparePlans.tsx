
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { PlanToCompare } from '@/components/ComparePopup';

const ComparisonRow = ({ 
  label, 
  values 
}: { 
  label: string; 
  values: (string | React.ReactNode)[] 
}) => {
  return (
    <div className="grid grid-cols-[1fr_2fr_2fr] gap-4 py-3 border-b">
      <div className="font-medium text-gray-700">{label}</div>
      {values.map((value, index) => (
        <div key={index} className={index === 0 ? "text-primary" : "text-gray-600"}>
          {value}
        </div>
      ))}
    </div>
  );
};

const ComparePlans = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plans } = location.state as { plans: PlanToCompare[] };

  const handleBack = () => {
    navigate('/plans');
  };

  if (!plans || plans.length < 2) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center p-12">
          <p className="text-lg mb-4">No plans selected for comparison</p>
          <Button onClick={() => navigate('/plans')}>Return to Plans</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <button 
          onClick={handleBack} 
          className="flex items-center text-gray-600 mt-6 mb-4"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span>Back to Plans</span>
        </button>
        
        <h1 className="text-3xl font-bold mb-6">Compare Plans</h1>
        
        <div className="bg-white rounded-lg shadow mb-12">
          {/* Header */}
          <div className="grid grid-cols-[1fr_2fr_2fr] gap-4 p-4 bg-gray-50 rounded-t-lg">
            <div className="font-bold">Features</div>
            {plans.map(plan => (
              <div key={plan.id} className="flex flex-col">
                <div className="h-12 w-24 bg-blue-100 p-2 rounded mb-2 flex items-center justify-center">
                  <img src={plan.logo || "https://via.placeholder.com/100x50"} alt={plan.provider} className="h-8 max-w-full object-contain" />
                </div>
                <h3 className="text-lg font-bold text-primary">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.provider}</p>
              </div>
            ))}
          </div>
          
          {/* Comparison Rows */}
          <div className="p-4">
            <ComparisonRow 
              label="Medical Coverage" 
              values={["$50,000", "$50,000"]} 
            />
            <ComparisonRow 
              label="Trip Cancellation" 
              values={["$5,000", "$5,000"]} 
            />
            <ComparisonRow 
              label="Emergency Assistance" 
              values={["Yes", "Yes"]} 
            />
            <ComparisonRow 
              label="Luggage Protection" 
              values={["Yes", "Yes"]} 
            />
            <ComparisonRow 
              label="Roadside Assistance" 
              values={["Yes", "Yes"]} 
            />
            <ComparisonRow 
              label="Price" 
              values={["₹ 969", "₹ 969"]} 
            />
          </div>
          
          {/* Actions */}
          <div className="p-4 flex justify-end gap-4">
            <Button onClick={handleBack} variant="outline">Back to Plans</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComparePlans;
