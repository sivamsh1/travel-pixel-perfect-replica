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

// Function to fetch quotes from API
const fetchQuotes = async (travelData: any) => {
  const response = await fetch('https://gyaantree.com/api/travel/v1/quickQuote/fetch-quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(travelData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch quotes');
  }
  
  return response.json();
};

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
    setQuotes,
  } = useTravelForm();

  // State for validation errors
  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  // State for loading status
  const [isLoading, setIsLoading] = useState(false);

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

  const handleNext = async () => {
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

    try {
      setIsLoading(true);
      // Get formatted travel data
      const travelData = formatTravelData();
      console.log('Sending travel data:', travelData);
      
      // Fetch quotes
      const quotesResponse = await fetchQuotes(travelData);
      console.log('Quotes response:', quotesResponse);
      
      // Store quotes in context - keep the raw response format
      if (quotesResponse && quotesResponse.result) {
        // We're storing the result directly, which could be an object with key-value pairs
        setQuotes([quotesResponse.result]);
        localStorage.setItem('travelQuotes', JSON.stringify([quotesResponse.result]));
      } else {
        // If response structure is different, at least try to store what we got
        setQuotes([quotesResponse]);
        localStorage.setItem('travelQuotes', JSON.stringify([quotesResponse]));
      }
      
      // Navigate to the quotes page
      navigate('/quotes');
    } catch (error) {
      console.error('Error fetching quotes:', error);
      toast({
        title: "Error",
        description: "Failed to fetch quotes. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
          >
            {isLoading ? "LOADING..." : "NEXT"}
          </ActionButton>
        </div>
      </div>
    </Layout>
  );
};

export default ContactStep;
