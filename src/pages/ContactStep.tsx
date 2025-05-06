import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { Mail, Phone, AlertCircle } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { isValidEmail, isValidPhone } from '@/utils/validationUtils';
import { saveToLocalStorage } from '@/utils/localStorageUtils';
const steps = [{
  id: 1,
  name: "Trip Details"
}, {
  id: 2,
  name: "Choose Plan"
}, {
  id: 3,
  name: "Choose Add-Ons"
}, {
  id: 4,
  name: "Travellers Details"
}, {
  id: 5,
  name: "Review & Pay"
}];
const ContactStep = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    contactEmail,
    setContactEmail,
    contactPhone,
    setContactPhone,
    agreeToContact,
    setAgreeToContact
  } = useTravelForm();

  // State for validation errors
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  // Handle form validation
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = {
      email: '',
      phone: ''
    };

    // Validate email
    if (!contactEmail) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(contactEmail)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Validate phone number - must be a valid Indian mobile number
    if (!contactPhone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!isValidPhone(contactPhone)) {
      newErrors.phone = 'Please enter a valid Indian mobile number (10 digits starting with 6-9)';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleNext = () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive"
      });
      return;
    }
    if (!agreeToContact) {
      toast({
        title: "Agreement Required",
        description: "Please agree to the contact terms to continue",
        variant: "destructive"
      });
      return;
    }

    // Save contact details to localStorage
    saveToLocalStorage('contact', {
      email: contactEmail,
      phone: contactPhone,
      agreeToContact
    });

    // Navigate to the next page
    navigate('/plans');
  };

  // Format phone input to show only digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, '');
    // Limit to 10 digits
    const limitedDigits = digitsOnly.slice(0, 10);
    setContactPhone(limitedDigits);
    if (errors.phone) {
      setErrors(prev => ({
        ...prev,
        phone: ''
      }));
    }
  };
  return <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={steps} currentStep={1} completedSteps={[]} />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-4">Stay Informed, Stay Protected</h2>
        
        <div className="w-full max-w-md space-y-6 mt-6">
          <div className="space-y-1">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input type="email" className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`} placeholder="Email" value={contactEmail} onChange={e => {
              setContactEmail(e.target.value);
              if (errors.email) setErrors(prev => ({
                ...prev,
                email: ''
              }));
            }} />
            </div>
            {errors.email && <div className="flex items-center text-destructive text-sm space-x-1 px-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.email}</span>
              </div>}
          </div>
          
          <div className="space-y-1">
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input type="tel" className={`pl-10 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`} placeholder="Phone No. (10 digits)" value={contactPhone} onChange={handlePhoneChange} maxLength={10} />
            </div>
            {errors.phone && <div className="flex items-center text-destructive text-sm space-x-1 px-1">
                <AlertCircle className="h-4 w-4" />
                <span>{errors.phone}</span>
              </div>}
            <div className="text-xs text-gray-500 px-1">
              Please enter a valid Indian mobile number (10 digits starting with 6, 7, 8, or 9)
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <Checkbox id="terms" checked={agreeToContact} onCheckedChange={checked => setAgreeToContact(checked === true)} />
            <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
              By entering the above details, you authorize our representatives to contact you via SMS, email, call or WhatsApp, irrespective of availing Travel Assistance & Insurance or not.
            </label>
          </div>
          
          <div className="pt-4">
            <ActionButton onClick={handleNext} className="w-full">
              NEXT
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>;
};
export default ContactStep;