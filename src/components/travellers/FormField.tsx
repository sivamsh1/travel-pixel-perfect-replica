
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  children
}) => {
  return (
    <div className="mb-4">
      <label className={`block text-sm font-medium ${error ? 'text-red-500' : 'text-gray-700'} mb-1`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1 mt-1">
          <AlertCircle className="h-4 w-4 text-red-500" />
          <p className="text-sm font-medium text-red-500">
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

export default FormField;
