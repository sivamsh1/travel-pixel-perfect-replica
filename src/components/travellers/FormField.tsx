
import React from 'react';
import { cn } from '@/lib/utils';

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
    <div>
      <label className={`block text-sm font-medium ${error ? 'text-destructive' : 'text-gray-700'} mb-1`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
};

export default FormField;
