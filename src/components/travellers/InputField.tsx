
import React from 'react';
import FormField from './FormField';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  readOnly?: boolean;
  disabled?: boolean;
  maxLength?: number;
  className?: string;
  id?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
  error,
  readOnly = false,
  disabled = false,
  maxLength,
  className = "",
  id,
}) => {
  return (
    <FormField label={label} required={required} error={error}>
      <input
        id={id}
        type={type}
        className={`w-full p-2 md:p-3 text-sm md:text-base border ${error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${readOnly || disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} ${className}`}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
    </FormField>
  );
};

export default InputField;
