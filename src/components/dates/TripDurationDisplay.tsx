
import React from 'react';

interface TripDurationDisplayProps {
  duration: number;
}

const TripDurationDisplay = ({ duration }: TripDurationDisplayProps) => {
  // Determine the text color based on whether duration exceeds 365 days
  const isInvalidDuration = duration > 365;
  
  return (
    <div className={`flex items-center justify-center text-center p-4 ${isInvalidDuration ? 'bg-red-50' : 'bg-blue-50'} rounded-md`}>
      <span className={`${isInvalidDuration ? 'text-destructive' : 'text-gray-600'}`}>
        Trip Duration: <span className={`${isInvalidDuration ? 'text-destructive' : 'text-primary'} font-medium`}>{duration} days</span>
        {isInvalidDuration && <span className="text-destructive block mt-1 text-xs">Maximum allowed trip duration is 365 days</span>}
      </span>
    </div>
  );
};

export default TripDurationDisplay;
