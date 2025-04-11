
import React from 'react';
import DateInput from './DateInput';

interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  duration: number;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  duration
}) => {
  return (
    <div className="w-full space-y-5">
      <div className="flex gap-4">
        <DateInput 
          value={startDate} 
          onChange={onStartDateChange} 
          placeholder="Start Date"
        />
        
        <DateInput 
          value={endDate} 
          onChange={onEndDateChange} 
          placeholder="End Date"
        />
      </div>
      
      <div className="text-center text-gray-600">
        Duration : <span className="text-blue-500 font-medium">{duration} days</span>
      </div>
    </div>
  );
};

export default DateRangeSelector;
