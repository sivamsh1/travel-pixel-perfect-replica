
import React from 'react';
import { TravelFormData } from '@/utils/localStorageUtils';

interface PricingSummaryProps {
  selectedPlan?: TravelFormData['selectedPlan'];
}

const PricingSummary: React.FC<PricingSummaryProps> = ({
  selectedPlan
}) => {
  // Get the price from the selected plan or use a default
  const basePrice = selectedPlan?.price ? parseFloat(selectedPlan.price.replace(/[^\d.]/g, '')) : 1938.00;
  
  // Calculate GST (18% of base price)
  const gst = basePrice * 0.18;
  
  // Calculate total price (base price + GST)
  const totalPrice = basePrice + gst;
  
  // Format price with currency symbol
  const formatPrice = (price: number): string => {
    return `₹ ${price.toFixed(2)}`;
  };

  return (
    <>
      <div className="px-6 py-3 flex justify-between border-b border-gray-200">
        <span className="font-medium text-primary">Sub Total</span>
        <span className="font-medium text-primary">{selectedPlan?.price || formatPrice(basePrice)}</span>
      </div>
      
      <div className="px-6 py-4 bg-primary text-white flex justify-between">
        <span className="font-medium">Total Amount Payable (Including 18% GST)</span>
        <span className="font-medium">{formatPrice(totalPrice)}</span>
      </div>
    </>
  );
};

export default PricingSummary;
