
import React from 'react';
import { format, parse, isValid } from 'date-fns';
import { TravelFormData } from '@/utils/localStorageUtils';

interface TravellerDetailsProps {
  travellers?: TravelFormData['travellers'];
  formatDate: (dateStr: string | undefined, defaultValue?: string) => string;
  formatTravellerAge: (dob?: string) => string;
}

const TravellerDetails: React.FC<TravellerDetailsProps> = ({
  travellers,
  formatDate,
  formatTravellerAge
}) => {
  if (!travellers?.details?.length) {
    return null;
  }
  
  return (
    <>
      {travellers.details.map((traveller, index) => (
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
    </>
  );
};

export default TravellerDetails;
