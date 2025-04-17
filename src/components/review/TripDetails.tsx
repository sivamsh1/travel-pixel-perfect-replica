
import React from 'react';
import { TravelFormData } from '@/utils/localStorageUtils';

interface TripDetailsProps {
  location?: TravelFormData['location'];
  formattedStartDate: string;
  formattedEndDate: string;
  duration: number;
}

const TripDetails: React.FC<TripDetailsProps> = ({
  location,
  formattedStartDate,
  formattedEndDate,
  duration
}) => {
  return (
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
  );
};

export default TripDetails;
