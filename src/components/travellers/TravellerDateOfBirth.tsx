
import React from 'react';
import { DatePicker } from '@/components/DatePicker';

interface TravellerDateOfBirthProps {
  index: number;
  dob?: string;
  age?: string;
  handleDateChange: (index: number, date: Date | undefined) => void;
  updateTraveller: (index: number, details: { age: string }) => void;
  error?: string;
}

const TravellerDateOfBirth: React.FC<TravellerDateOfBirthProps> = ({
  index,
  dob,
  age,
  handleDateChange,
  updateTraveller,
  error
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <DatePicker
          value={dob ? new Date(dob) : undefined}
          onChange={(date) => handleDateChange(index, date)}
          placeholder={`Traveller ${index + 1} DOB`}
          error={error}
        />
      </div>
      
      <div className="w-1/3">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={`T ${index + 1} Age`}
          value={age || ''}
          onChange={(e) => updateTraveller(index, { age: e.target.value })}
        />
      </div>
    </div>
  );
};

export default TravellerDateOfBirth;
