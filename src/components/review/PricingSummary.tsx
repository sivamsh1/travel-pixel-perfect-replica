
import React from 'react';
import { TravelFormData } from '@/utils/localStorageUtils';

interface PricingSummaryProps {
  selectedPlan?: TravelFormData['selectedPlan'];
}

const PricingSummary: React.FC<PricingSummaryProps> = ({
  selectedPlan
}) => {
  return (
    <>
      <div className="px-6 py-3 flex justify-between border-b border-gray-200">
        <span className="font-medium text-primary">Sub Total</span>
        <span className="font-medium text-primary">{selectedPlan?.price || '₹ 1,938.00'}</span>
      </div>
      
      <div className="px-6 py-4 bg-primary text-white flex justify-between">
        <span className="font-medium">Total Amount Payable (Including 18% GST)</span>
        <span className="font-medium">{selectedPlan?.price || '₹ 1,938.00'}</span>
      </div>
    </>
  );
};

export default PricingSummary;
