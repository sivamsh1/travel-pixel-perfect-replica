
import React from 'react';
import { DatePicker } from '@/components/DatePicker';
import { Input } from '@/components/ui/input';
import { TravellerDetails } from '@/context/TravelFormContext';

interface TravellerDateOfBirthProps {
  index: number;
  dob?: string;
  name?: string;
  age?: string;
  error?: string;
  handleDateChange: (index: number, date: Date | undefined) => void;
  updateTraveller: (index: number, details: Partial<TravellerDetails>) => void;
}

const TravellerDateOfBirth: React.FC<TravellerDateOfBirthProps> = ({
  index,
  dob,
  name,
  age,
  error,
  handleDateChange,
  updateTraveller,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Traveller {index + 1}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name<span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Enter traveller name"
            value={name || ''}
            onChange={(e) => updateTraveller(index, { name: e.target.value })}
            className={error && error.includes('name') ? 'border-red-500' : ''}
          />
          {error && error.includes('name') && (
            <p className="text-sm text-red-500 mt-1">{error}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth<span className="text-red-500">*</span>
          </label>
          <DatePicker
            value={dob ? new Date(dob) : undefined}
            onChange={(date) => handleDateChange(index, date)}
            placeholder="Select Date of Birth"
            error={error && error.includes('dob') ? error : undefined}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <Input
            value={age || ''}
            readOnly
            placeholder="Auto-calculated"
            className="bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

export default TravellerDateOfBirth;
