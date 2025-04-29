
import React from 'react';

interface TripDurationDisplayProps {
  duration: number;
}

const TripDurationDisplay = ({ duration }: TripDurationDisplayProps) => {
  return (
    <div className="flex items-center justify-center text-center p-4 bg-blue-50 rounded-md">
      <span className="text-gray-600">
        Trip Duration: <span className="text-primary font-medium">{duration} days</span>
      </span>
    </div>
  );
};

export default TripDurationDisplay;
