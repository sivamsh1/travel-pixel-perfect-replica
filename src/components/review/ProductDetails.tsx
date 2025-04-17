
import React from 'react';
import { TravelFormData } from '@/utils/localStorageUtils';

interface ProductDetailsProps {
  selectedPlan?: TravelFormData['selectedPlan'];
  selectedAddOns: string[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  selectedPlan,
  selectedAddOns
}) => {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="text-gray-700 font-medium mb-2">Product Details</div>
      <div className="text-sm space-y-1">
        <div><span className="text-gray-500">Insurer : </span>{selectedPlan?.insurer || 'B2C RGI Smart 50K Excluding'}</div>
        <div><span className="text-gray-500">Sum Insured : </span>{selectedPlan?.sumInsured || 'USD 50000'}</div>
        <div><span className="text-gray-500">Plan : </span>{selectedPlan?.name || 'Standard'}</div>
      </div>
      
      <div className="mt-4 text-sm">
        <div><span className="text-gray-500">Add-ons : </span></div>
        <div className="pl-4 mt-1">
          {selectedAddOns.map((addon, index) => (
            <div key={index}>{addon}</div>
          ))}
          {selectedAddOns.length === 0 && <div>None</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
