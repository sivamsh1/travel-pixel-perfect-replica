
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { format, parse } from 'date-fns';
import { Calendar } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const TravellersDetailsStep = () => {
  const navigate = useNavigate();
  const { 
    startDate, 
    endDate, 
    travellers,
    updateTraveller,
    nominee,
    updateNominee
  } = useTravelForm();

  const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';
  const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';

  const handleContinue = () => {
    navigate('/review');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator 
          steps={steps} 
          currentStep={4} 
          completedSteps={[1, 2, 3]}
        />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Travellers Details</h2>
        
        <div className="w-full mb-6">
          <div className="text-sm text-gray-700">
            Summary: {travellers.length} Traveller(s) | {formattedStartDate} - {formattedEndDate} <span className="text-primary">Edit &gt;</span>
          </div>
        </div>
        
        <div className="w-full">
          {travellers.map((traveller, index) => (
            <div key={index} className="mb-12">
              <h3 className="text-xl font-medium mb-6">Traveller {index + 1} Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={traveller.passportNumber || ''}
                    onChange={(e) => updateTraveller(index, { passportNumber: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={traveller.name || ''}
                    onChange={(e) => updateTraveller(index, { name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                      placeholder="mm/dd/yyyy"
                      value={traveller.dob || ''}
                      onChange={(e) => updateTraveller(index, { dob: e.target.value })}
                    />
                    <Calendar className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={traveller.address || ''}
                    onChange={(e) => updateTraveller(index, { address: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={traveller.pincode || ''}
                    onChange={(e) => updateTraveller(index, { pincode: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={traveller.city || ''}
                    onChange={(e) => updateTraveller(index, { city: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
                  <input
                    type="tel"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={traveller.mobileNo || ''}
                    onChange={(e) => updateTraveller(index, { mobileNo: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={traveller.email || ''}
                    onChange={(e) => updateTraveller(index, { email: e.target.value })}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <div className="mb-12">
            <h3 className="text-xl font-medium mb-6">Nominee Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Name</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={nominee.name || ''}
                  onChange={(e) => updateNominee({ name: e.target.value })}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Relationship</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={nominee.relationship || ''}
                  onChange={(e) => updateNominee({ relationship: e.target.value })}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="text-base font-medium mb-2">Does the traveller have a pre-existing medical condition?</div>
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="medical-yes" 
                  checked={travellers[0]?.hasPreExistingCondition === true}
                  onCheckedChange={() => updateTraveller(0, { hasPreExistingCondition: true })}
                />
                <label htmlFor="medical-yes" className="text-sm text-gray-700">Yes</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="medical-no" 
                  checked={travellers[0]?.hasPreExistingCondition === false}
                  onCheckedChange={() => updateTraveller(0, { hasPreExistingCondition: false })}
                />
                <label htmlFor="medical-no" className="text-sm text-gray-700">No</label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12">
            <ActionButton onClick={handleContinue}>
              Continue to KYC Verification
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TravellersDetailsStep;
