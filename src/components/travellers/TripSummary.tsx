
import React from 'react';

interface TripSummaryProps {
  travellerCount: number;
  startDateFormatted: string;
  endDateFormatted: string;
}

const TripSummary: React.FC<TripSummaryProps> = ({
  travellerCount,
  startDateFormatted,
  endDateFormatted
}) => {
  return (
    <div className="w-full mb-6">
      <div className="text-sm text-gray-700">
        Summary: {travellerCount} Traveller(s) | {startDateFormatted} - {endDateFormatted} <span className="text-primary">Edit &gt;</span>
      </div>
    </div>
  );
};

export default TripSummary;
