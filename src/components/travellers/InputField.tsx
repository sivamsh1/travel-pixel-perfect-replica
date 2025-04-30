
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
}) => {
  return (
    <FormField label={label} required={required} error={error}>
      <input
        type={type}
        className={`w-full p-3 border ${error ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${readOnly || disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''} ${className}`}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        maxLength={maxLength}
      />
    </FormField>
  );
};

export default InputField;
