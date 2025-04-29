import React, { useState } from 'react';
import { TravellerDetails } from '@/context/TravelFormContext';
import { usePincodeSearch } from '@/hooks/usePincodeSearch';
import { Loader2 } from 'lucide-react';

interface TravellerFormProps {
  traveller: TravellerDetails;
  index: number;
  updateTraveller: (index: number, details: Partial<TravellerDetails>) => void;
  errors: { [key: string]: string };
  handleDateChange: (index: number, date: Date | undefined) => void;
}

const TravellerForm: React.FC<TravellerFormProps> = ({
  traveller,
  index,
  updateTraveller,
  errors,
  handleDateChange
}) => {
  const { searchCityByPincode, isLoading } = usePincodeSearch();
  const [autoFilled, setAutoFilled] = useState(false);
  const [lastFetchedPincode, setLastFetchedPincode] = useState<string | null>(null);

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pincode = e.target.value.slice(0, 6);
    updateTraveller(index, { pincode });

    if (
      pincode.length === 6 &&
      pincode !== lastFetchedPincode
    ) {
      setLastFetchedPincode(pincode);
      const locationData = await searchCityByPincode(pincode);

      if (locationData) {
        updateTraveller(index, {
          city: locationData.cityName,
          locationData: {
            stateId: locationData.stateId,
            districtId: locationData.districtId,
            cityId: locationData.cityId,
            cityName: locationData.cityName
          }
        });
        setAutoFilled(true);
        setTimeout(() => setAutoFilled(false), 3000);
      }
    }
  };

  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium mb-6">Traveller {index + 1} Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number<span className="text-red-500">*</span></label>
          <input
            type="text"
            className={`w-full p-3 border ${errors[`traveller${index}Passport`] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            value={traveller.passportNumber || ''}
            onChange={(e) => updateTraveller(index, { passportNumber: e.target.value.slice(0, 10) })}
            maxLength={10}
          />
          {errors[`traveller${index}Passport`] && (
            <p className="text-sm font-medium text-destructive mt-1">{errors[`traveller${index}Passport`]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name<span className="text-red-500">*</span></label>
          <input
            type="text"
            className={`w-full p-3 border ${errors[`traveller${index}Name`] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            value={traveller.name || ''}
            onChange={(e) => updateTraveller(index, { name: e.target.value })}
          />
          {errors[`traveller${index}Name`] && (
            <p className="text-sm font-medium text-destructive mt-1">{errors[`traveller${index}Name`]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth<span className="text-red-500">*</span></label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 bg-gray-100 rounded-md text-gray-500 cursor-not-allowed"
            value={traveller.dob || ''}
            readOnly
            disabled
          />
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
          <div className="relative">
            <input
              type="text"
              className={`w-full p-3 border ${errors[`traveller${index}Pincode`] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              value={traveller.pincode || ''}
              onChange={handlePincodeChange}
              maxLength={6}
            />
            {isLoading && (
              <div className="absolute right-3 top-3">
                <span>
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </span>
              </div>
            )}
            {errors[`traveller${index}Pincode`] && (
              <p className="text-sm font-medium text-destructive mt-1">{errors[`traveller${index}Pincode`]}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 bg-gray-100 text-gray-500 rounded-md cursor-not-allowed"
              value={traveller.city || ''}
              readOnly
              disabled
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
          <input
            type="tel"
            className={`w-full p-3 border ${errors[`traveller${index}Mobile`] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            value={traveller.mobileNo || ''}
            onChange={(e) => updateTraveller(index, { mobileNo: e.target.value })}
            maxLength={10}
          />
          {errors[`traveller${index}Mobile`] && (
            <p className="text-sm font-medium text-destructive mt-1">{errors[`traveller${index}Mobile`]}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className={`w-full p-3 border ${errors[`traveller${index}Email`] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
            value={traveller.email || ''}
            onChange={(e) => updateTraveller(index, { email: e.target.value })}
          />
          {errors[`traveller${index}Email`] && (
            <p className="text-sm font-medium text-destructive mt-1">{errors[`traveller${index}Email`]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TravellerForm;
