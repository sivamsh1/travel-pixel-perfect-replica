
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parse, isValid } from 'date-fns';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { Checkbox } from '@/components/ui/checkbox';
import { getFromLocalStorage } from '@/utils/localStorageUtils';
import { TravelFormData } from '@/utils/localStorageUtils';

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
    selectedAddOns,
    agreeToTerms,
    setAgreeToTerms
  } = useTravelForm();

  const [storedData, setStoredData] = useState<TravelFormData | null>(null);
  
  // Format dates helper function
  const formatDate = (dateStr: string | undefined, defaultValue = ''): string => {
    if (!dateStr) return defaultValue;
    
    try {
      const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date());
      if (isValid(parsedDate)) {
        return format(parsedDate, 'do MMMM yyyy');
      }
      return defaultValue;
    } catch (error) {
      console.error('Error formatting date:', error);
      return defaultValue;
    }
  };
  
  // Calculate duration between two dates
  const calculateDuration = (startDate?: string, endDate?: string): number => {
    if (!startDate || !endDate) return 0;
    
    try {
      const start = parse(startDate, 'yyyy-MM-dd', new Date());
      const end = parse(endDate, 'yyyy-MM-dd', new Date());
      
      if (!isValid(start) || !isValid(end)) return 0;
      
      // Calculate the difference in days
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays >= 0 ? diffDays + 1 : 0; // Include both start and end date
    } catch (error) {
      console.error('Error calculating duration:', error);
      return 0;
    }
  };
  
  // Format traveller age
  const formatTravellerAge = (dob?: string): string => {
    if (!dob) return '';
    
    try {
      const birthDate = parse(dob, 'yyyy-MM-dd', new Date());
      if (!isValid(birthDate)) return '';
      
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return `(${age})`;
    } catch (error) {
      console.error('Error calculating age:', error);
      return '';
    }
  };

  useEffect(() => {
    // Load data from localStorage
    const data = getFromLocalStorage();
    setStoredData(data);
  }, []);

  const handlePayNow = () => {
    if (!agreeToTerms) {
      alert('Please agree to the terms and conditions to proceed.');
      return;
    }
    
    alert('Payment successful! Thank you for purchasing travel insurance.');
    navigate('/');
  };

  // Prepare display data from localStorage
  const location = storedData?.location;
  const dates = storedData?.dates;
  const travellers = storedData?.travellers;
  const selectedPlan = storedData?.selectedPlan;
  
  // Calculate actual duration or use stored duration
  const duration = dates ? 
    calculateDuration(dates.startDate, dates.endDate) || dates.duration : 
    0;
    
  // Format date strings for display
  const formattedStartDate = formatDate(dates?.startDate, '17th April 2025');
  const formattedEndDate = formatDate(dates?.endDate, '19th April 2025');

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
            Summary: {travellers?.count || 1} Traveller(s) | {formattedStartDate} - {formattedEndDate} <span className="text-primary">Edit &gt;</span>
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
                <span>{location?.region || 'Overseas Travel | Excluding USA and CANADA'}</span>
              </div>
              
              <div>
                <span className="text-gray-500">Destination : </span>
                <span>{location?.destination || 'London'}</span>
              </div>
              
              <div>
                <span className="text-gray-500">Start Date : </span>
                <span>{formattedStartDate}</span>
              </div>
              
              <div>
                <span className="text-gray-500">End Date : </span>
                <span>{formattedEndDate}</span>
              </div>
              
              <div>
                <span className="text-gray-500">Duration: </span>
                <span>{duration} Days</span>
              </div>
            </div>
          </div>
          
          {travellers?.details && travellers.details.map((traveller, index) => (
            <div className="bg-blue-50 p-4 mt-4" key={index}>
              <div className="font-medium text-blue-800 pb-2">
                Traveller {index + 1} : {traveller.name || 'Guest'}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 text-sm">
                <div>
                  <span className="text-gray-500">Date of Birth: </span>
                  <span>
                    {formatDate(traveller.dob, '17th April 2000')} {formatTravellerAge(traveller.dob) || '(25)'}
                  </span>
                </div>
                
                <div>
                  <span className="text-gray-500">Email: </span>
                  <span>{traveller.email || 'Not provided'}</span>
                </div>
                
                <div>
                  <span className="text-gray-500">Mobile Number: </span>
                  <span>{traveller.mobileNo || 'Not provided'}</span>
                </div>
                
                {traveller.passportNumber && (
                  <div>
                    <span className="text-gray-500">Passport: </span>
                    <span>{traveller.passportNumber}</span>
                  </div>
                )}
                
                {traveller.address && (
                  <div>
                    <span className="text-gray-500">Address: </span>
                    <span>{traveller.address}</span>
                  </div>
                )}
                
                {traveller.city && (
                  <div>
                    <span className="text-gray-500">City: </span>
                    <span>{traveller.city}</span>
                  </div>
                )}
                
                {traveller.pincode && (
                  <div>
                    <span className="text-gray-500">Pincode: </span>
                    <span>{traveller.pincode}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
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
          
          <div className="px-6 py-3 flex justify-between border-b border-gray-200">
            <span className="font-medium text-primary">Sub Total</span>
            <span className="font-medium text-primary">{selectedPlan?.price || '₹ 1,938.00'}</span>
          </div>
          
          <div className="px-6 py-4 bg-primary text-white flex justify-between">
            <span className="font-medium">Total Amount Payable (Including 18% GST)</span>
            <span className="font-medium">{selectedPlan?.price || '₹ 1,938.00'}</span>
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
