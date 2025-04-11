
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { Checkbox } from '@/components/ui/checkbox';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const ReviewStep = () => {
  const navigate = useNavigate();
  const { 
    region, 
    destination,
    startDate, 
    endDate, 
    travellers,
    selectedPlan,
    selectedAddOns,
    agreeToTerms,
    setAgreeToTerms
  } = useTravelForm();

  const handlePayNow = () => {
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }
    
    alert('Payment successful! Thank you for purchasing travel insurance.');
    navigate('/');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator 
          steps={steps} 
          currentStep={5} 
          completedSteps={[1, 2, 3, 4]}
        />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Review & Pay</h2>
        
        <div className="w-full mb-6">
          <div className="text-sm text-gray-700">
            Summary: {travellers.length} Traveller(s) | 17th Apr - 23rd Apr <span className="text-primary">Edit &gt;</span>
          </div>
        </div>
        
        <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 text-sm">
              <div>
                <span className="text-gray-500">Trip Type : </span>
                <span>Single Trip</span>
              </div>
              
              <div>
                <span className="text-gray-500">Region : </span>
                <span>Overseas Travel | Excluding USA and CANADA</span>
              </div>
              
              <div>
                <span className="text-gray-500">Destination : </span>
                <span>{destination || 'London'}</span>
              </div>
              
              <div>
                <span className="text-gray-500">Start Date : </span>
                <span>17th April 2025</span>
              </div>
              
              <div>
                <span className="text-gray-500">End Date : </span>
                <span>19th April 2025</span>
              </div>
              
              <div>
                <span className="text-gray-500">Duration: </span>
                <span>7 Days</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 mt-4">
            <div className="font-medium text-blue-800 pb-2">
              Traveller 1 : Dinesh
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 text-sm">
              <div>
                <span className="text-gray-500">Date of Birth: </span>
                <span>17th April 2000 (25)</span>
              </div>
              
              <div>
                <span className="text-gray-500">Email: </span>
                <span>dineshnicky605@gmail.com</span>
              </div>
              
              <div>
                <span className="text-gray-500">Mobile Number: </span>
                <span>9944818946</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 border-b border-gray-200">
            <div className="text-gray-700 font-medium mb-2">Product Details</div>
            <div className="text-sm space-y-1">
              <div><span className="text-gray-500">Insurer : </span>B2C RGI Smart 50K Excluding</div>
              <div><span className="text-gray-500">Sum Insured : </span>USD 50000</div>
              <div><span className="text-gray-500">Plan : </span>{selectedPlan}</div>
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
          
          <div className="px-6 py-3 flex justify-between border-b border-gray-200">
            <span className="font-medium text-primary">Sub Total</span>
            <span className="font-medium text-primary">₹ 1,938.00</span>
          </div>
          
          <div className="px-6 py-4 bg-primary text-white flex justify-between">
            <span className="font-medium">Total Amount Payable (Including 18% GST)</span>
            <span className="font-medium">₹ 1,938.00</span>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center items-center gap-2">
          <Checkbox 
            id="terms-conditions" 
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
          />
          <label htmlFor="terms-conditions" className="text-sm">
            I have read and agree to the <span className="text-primary">Terms & Conditions</span> to avail Travel Assistance with Insurance.
          </label>
        </div>
        
        <div className="mt-8">
          <ActionButton onClick={handlePayNow}>
            Pay Now
          </ActionButton>
        </div>
      </div>
    </Layout>
  );
};

export default ReviewStep;
