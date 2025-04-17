
import React from 'react';
import { format, parse, isValid } from 'date-fns';
import { TravelFormData } from '@/utils/localStorageUtils';

interface ReviewSummaryProps {
  location?: TravelFormData['location'];
  dates?: TravelFormData['dates'];
  duration: number;
  formattedStartDate: string;
  formattedEndDate: string;
}

const ReviewSummary: React.FC<ReviewSummaryProps> = ({
  location,
  dates,
  duration,
  formattedStartDate,
  formattedEndDate
}) => {
  return (
    <div className="w-full mb-6">
      <div className="text-sm text-gray-700">
        Summary: {location?.destination || 'Destination'} | {formattedStartDate} - {formattedEndDate} <span className="text-primary">Edit &gt;</span>
      </div>
    </div>
  );
};

export default ReviewSummary;
