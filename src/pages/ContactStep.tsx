
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { Mail, Phone } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const ContactStep = () => {
  const navigate = useNavigate();
  const { 
    contactEmail, 
    setContactEmail, 
    contactPhone, 
    setContactPhone,
    agreeToContact,
    setAgreeToContact
  } = useTravelForm();

  const handleNext = () => {
    // Validation removed
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
        
        <div className="w-full max-w-md space-y-6 mt-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="email"
              className="pl-10"
              placeholder="Email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="tel"
              className="pl-10"
              placeholder="Phone No."
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
            />
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
          
          <div className="pt-4">
            <ActionButton
              onClick={handleNext}
              className="w-full"
            >
              NEXT
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactStep;
