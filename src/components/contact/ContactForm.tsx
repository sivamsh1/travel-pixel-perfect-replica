
import React from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, Phone, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  contactEmail: string;
  setContactEmail: (email: string) => void;
  contactPhone: string;
  handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  agreeToContact: boolean;
  setAgreeToContact: (agree: boolean) => void;
  errors: {
    email: string;
    phone: string;
  };
  setErrors: React.Dispatch<React.SetStateAction<{
    email: string;
    phone: string;
  }>>;
}

const ContactForm: React.FC<ContactFormProps> = ({
  contactEmail,
  setContactEmail,
  contactPhone,
  handlePhoneChange,
  agreeToContact,
  setAgreeToContact,
  errors,
  setErrors
}) => {
  return (
    <div className="w-full max-w-md space-y-6 mt-6">
      <div className="space-y-1">
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="email"
            className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            placeholder="Email"
            value={contactEmail}
            onChange={(e) => {
              setContactEmail(e.target.value);
              if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
            }}
          />
        </div>
        {errors.email && (
          <div className="flex items-center text-destructive text-sm space-x-1 px-1">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.email}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            type="tel"
            className={`pl-10 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
            placeholder="Phone No. (10 digits)"
            value={contactPhone}
            onChange={handlePhoneChange}
            maxLength={10}
          />
        </div>
        {errors.phone && (
          <div className="flex items-center text-destructive text-sm space-x-1 px-1">
            <AlertCircle className="h-4 w-4" />
            <span>{errors.phone}</span>
          </div>
        )}
        <div className="text-xs text-gray-500 px-1">
          Please enter exactly 10 digits without spaces or special characters
        </div>
      </div>
      
      <div className="flex items-start space-x-3">
        <Checkbox 
          id="terms" 
          checked={agreeToContact} 
          onCheckedChange={(checked) => setAgreeToContact(checked === true)}
        />
        <label 
          htmlFor="terms" 
          className="text-sm text-gray-600 leading-relaxed"
        >
          By entering the above details, you authorize our representatives to contact you via SMS, email, call or WhatsApp, irrespective of availing Travel Assistance & Insurance or not.
        </label>
      </div>
    </div>
  );
};

export default ContactForm;
