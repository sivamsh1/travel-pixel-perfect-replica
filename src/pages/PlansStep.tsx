
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { ChevronDown } from 'lucide-react';
import { format, differenceInDays, parse } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const PlansStep = () => {
  const navigate = useNavigate();
  const { 
    startDate, 
    endDate, 
    travellersCount, 
    selectedPlan, 
    setSelectedPlan 
  } = useTravelForm();

  const formattedStartDate = startDate ? format(parse(startDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';
  const formattedEndDate = endDate ? format(parse(endDate, 'yyyy-MM-dd', new Date()), 'do MMM') : '';

  const handleBuyNow = (planName: string) => {
    setSelectedPlan(planName);
    navigate('/addons');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator 
          steps={steps} 
          currentStep={2} 
          completedSteps={[1]}
        />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6 max-w-5xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Select Your Plan</h2>
        
        <div className="w-full mb-4">
          <div className="text-sm text-gray-700 mb-4">
            Summary: {travellersCount} Traveller(s) | {formattedStartDate} - {formattedEndDate} <span className="text-primary">Edit &gt;</span>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Insurers</label>
              <div className="relative">
                <select className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10 focus:outline-none">
                  <option>All</option>
                </select>
                <ChevronDown className="absolute right-2 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Sum Insured</label>
              <div className="relative">
                <select className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10 focus:outline-none">
                  <option>USD 50000</option>
                </select>
                <ChevronDown className="absolute right-2 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <div className="relative">
                <select className="w-full p-2 border border-gray-300 rounded-md appearance-none pr-10 focus:outline-none">
                  <option>All</option>
                </select>
                <ChevronDown className="absolute right-2 top-2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Insurance Plan Cards */}
        <div className="w-full space-y-5">
          {/* Icon Plan */}
          <div className="border border-gray-200 rounded-md p-4 relative">
            <div className="flex">
              <div className="mr-4 bg-blue-100 p-2 rounded">
                <img src="https://via.placeholder.com/100x50" alt="Reliance General Insurance" className="h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-[#FF6B35]">Icon Plan</h3>
                    <p className="text-sm text-gray-600">Overseas Travel | Excluding USA and CANADA</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{travellersCount} traveller(s)</div>
                    <div className="text-xl font-bold text-[#FF6B35]">₹ 969</div>
                  </div>
                </div>
                
                <div className="flex mt-4 gap-6 text-sm">
                  <div className="flex items-center gap-1 text-gray-700">
                    <span className="w-4 h-4 text-primary">📞</span>
                    <span>Emergency Medical Assistance</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-700">
                    <span className="w-4 h-4 text-primary">🧳</span>
                    <span>Luggage Assistance</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-700">
                    <span className="w-4 h-4 text-primary">🚗</span>
                    <span>Domestic Roadside Assistance</span>
                  </div>
                </div>
                
                <div className="flex mt-4 gap-6 text-sm">
                  <div className="bg-blue-50 p-1 px-2 rounded text-xs">
                    Plan Benefits
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    $ 5000 Trip Cancellation
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    $ 50000 Medical Expenses incl
                  </div>
                  
                  <div className="text-primary text-xs">
                    View All →
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end ml-4 gap-2">
                <button 
                  className="bg-primary text-white py-1 px-3 rounded text-sm"
                  onClick={() => handleBuyNow('Icon Plan')}
                >
                  Buy Now
                </button>
                
                <div className="flex items-center gap-2">
                  <Checkbox id="compare1" />
                  <label htmlFor="compare1" className="text-xs">Add to Compare</label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Magna Plan */}
          <div className="border border-gray-200 rounded-md p-4 relative">
            <div className="flex">
              <div className="mr-4 bg-orange-100 p-2 rounded">
                <img src="https://via.placeholder.com/100x50" alt="Future Generali" className="h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-[#FF6B35]">Magna Plan</h3>
                    <p className="text-sm text-gray-600">Overseas Travel | Excluding USA and CANADA</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{travellersCount} traveller(s)</div>
                    <div className="text-xl font-bold text-[#FF6B35]">₹ 969</div>
                  </div>
                </div>
                
                <div className="flex mt-4 gap-6 text-sm">
                  <div className="flex items-center gap-1 text-gray-700">
                    <span className="w-4 h-4 text-primary">📞</span>
                    <span>Emergency Medical Assistance</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-700">
                    <span className="w-4 h-4 text-primary">🧳</span>
                    <span>Luggage Assistance</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-700">
                    <span className="w-4 h-4 text-primary">🚗</span>
                    <span>Domestic Roadside Assistance</span>
                  </div>
                </div>
                
                <div className="flex mt-4 gap-6 text-sm">
                  <div className="bg-blue-50 p-1 px-2 rounded text-xs">
                    Plan Benefits
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    $ 5000 Trip Cancellation
                  </div>
                  
                  <div className="text-xs text-gray-600">
                    $ 50000 Medical Expenses incl
                  </div>
                  
                  <div className="text-primary text-xs">
                    View All →
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col items-end ml-4 gap-2">
                <button 
                  className="bg-primary text-white py-1 px-3 rounded text-sm"
                  onClick={() => handleBuyNow('Magna Plan')}
                >
                  Buy Now
                </button>
                
                <div className="flex items-center gap-2">
                  <Checkbox id="compare2" />
                  <label htmlFor="compare2" className="text-xs">Add to Compare</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PlansStep;
