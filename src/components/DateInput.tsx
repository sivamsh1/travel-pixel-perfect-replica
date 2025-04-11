
import React from 'react';
import { Calendar } from 'lucide-react';

interface DateInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const DateInput: React.FC<DateInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex-1 relative">
      <input
        type="date"
        className="w-full h-14 px-4 border border-gray-200 rounded-lg appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default DateInput;
