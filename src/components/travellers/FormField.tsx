
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
    <div className="mb-4">
      <label className={`block text-sm font-medium ${error ? 'text-destructive' : 'text-gray-700'} mb-1`}>
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-sm font-medium text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
