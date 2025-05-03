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

  // Helper to display DOB as dd/MM/yyyy even if not
  const displayDOB = (dob?: string) => {
    if (!dob) return 'Unknown';
    // If already in dd/MM/yyyy, return as is
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dob)) return dob;
    try {
      const asDate = new Date(dob);
      if (!isNaN(asDate.getTime())) {
        return format(asDate, 'dd/MM/yyyy');
      }
    } catch {}
    return dob;
  };
  return <>
      {travellers.details.map((traveller, index) => <div key={index} className="p-4 mt-4 bg-[#e7f5fa]">
          <div className="font-medium text-blue-800 pb-2">
            Traveller {index + 1} : {traveller.name || 'Guest'}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-3 text-sm">
            <div>
              <span className="text-gray-500">Date of Birth: </span>
              <span>
                {displayDOB(traveller.dob)} {formatTravellerAge(traveller.dob) || '(25)'}
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
            
            {traveller.passportNumber && <div>
                <span className="text-gray-500">Passport: </span>
                <span>{traveller.passportNumber}</span>
              </div>}
            
            {traveller.address && <div>
                <span className="text-gray-500">Address: </span>
                <span>{traveller.address}</span>
              </div>}
            
            {traveller.city && <div>
                <span className="text-gray-500">City: </span>
                <span>{traveller.city}</span>
              </div>}
            
            {traveller.pincode && <div>
                <span className="text-gray-500">Pincode: </span>
                <span>{traveller.pincode}</span>
              </div>}
          </div>
        </div>)}
    </>;
};
export default TravellerDetails;