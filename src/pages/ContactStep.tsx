
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { useToast } from '@/hooks/use-toast';
import { validateContactForm, formatTravelData } from '@/utils/formUtils';
import ContactForm from '@/components/contact/ContactForm';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const ContactStep = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { 
    contactEmail, 
    setContactEmail, 
    contactPhone, 
    setContactPhone,
    agreeToContact,
    setAgreeToContact,
  } = useTravelForm();

  // State for validation errors
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  // Format phone input to show only digits
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, '');
    // Limit to 10 digits
    const limitedDigits = digitsOnly.slice(0, 10);
    setContactPhone(limitedDigits);
    
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: '' }));
    }
  };

  const handleNext = () => {
    const { isValid, errors: formErrors } = validateContactForm(contactEmail, contactPhone);
    
    if (!isValid) {
      setErrors(formErrors);
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

    // Prepare and log travel data with converted dates
    const jsData = formatTravelData();
    console.log('Travel data with converted dates:', jsData);

    // Navigate to the next page
    navigate('/plans');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={steps} currentStep={1} completedSteps={[]} />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-4">Our representatives to contact you via</h2>
        
        <ContactForm 
          contactEmail={contactEmail}
          setContactEmail={setContactEmail}
          contactPhone={contactPhone}
          handlePhoneChange={handlePhoneChange}
          agreeToContact={agreeToContact}
          setAgreeToContact={setAgreeToContact}
          errors={errors}
          setErrors={setErrors}
        />
        
        <div className="w-full max-w-md pt-4">
          <ActionButton
            onClick={handleNext}
            className="w-full"
          >
            NEXT
          </ActionButton>
        </div>
      </div>
    </Layout>
  );
};

export default ContactStep;
