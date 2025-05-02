
import React from 'react';
import { Loader2 } from 'lucide-react';
import FormField from './FormField';

interface PincodeFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  error?: string;
  id?: string;
  required?: boolean;
}

const PincodeField: React.FC<PincodeFieldProps> = ({ 
  value, 
  onChange, 
  isLoading, 
  error,
  id,
  required = false
}) => {
  return (
    <FormField label="Pincode" error={error} required={required}>
      <div className="relative">
        <input
          id={id}
          type="text"
          className={`w-full p-3 border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
          value={value || ''}
          onChange={onChange}
          maxLength={6}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {isLoading && (
          <div className="absolute right-3 top-3">
            <span>
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </span>
          </div>
        )}
      </div>
    </FormField>
  );
};

export default PincodeField;
