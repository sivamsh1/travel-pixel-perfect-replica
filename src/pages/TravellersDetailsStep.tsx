import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import TravellerDetailsContent from '@/components/travellers/TravellerDetailsContent';
import { useTravellerDetails } from '@/hooks/useTravellerDetails';
import { toast } from "@/components/ui/use-toast";
import { formSteps } from '@/constants/formSteps';

const TravellersDetailsStep = () => {
  const navigate = useNavigate();
  const { validateForm, saveTravellersToLocalStorage, travellers, proposer } = useTravellerDetails();

  const handleContinue = () => {
    // Validate required fields
    if (validateForm()) {
      // Check for medical conditions
      const hasMedicalCondition = travellers.some(
        traveller => traveller.hasPreExistingCondition && traveller.medicalCondition
      );

      if (hasMedicalCondition) {
        toast({
          title: "Medical Condition Restriction",
          description: "Sorry, travellers with selected medical conditions are not eligible to continue.",
          variant: "destructive"
        });
        return;
      }

      // Validate proposer fields if not "Self"
      if (proposer.type !== "Self") {
        const requiredFields = ["name", "gender", "salutation", "maritalStatus"];
        const missingFields = requiredFields.filter(field => !proposer[field as keyof typeof proposer]);
        
        if (missingFields.length > 0) {
          const fieldNames = missingFields.map(f => f.charAt(0).toUpperCase() + f.slice(1)).join(", ");
          toast({
            title: "Proposer Details Required",
            description: `Please fill in the required proposer fields: ${fieldNames}`,
            variant: "destructive"
          });
          return;
        }
      }

      // Save traveller details to localStorage before navigating
      saveTravellersToLocalStorage();
      
      toast({
        title: "Success",
        description: "Traveller details saved successfully",
      });
      navigate('/review');
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly",
        variant: "destructive"
      });
    }
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator 
          steps={formSteps} 
          currentStep={4} 
          completedSteps={[1, 2, 3]}
        />
      </div>
      
      <TravellerDetailsContent onContinue={handleContinue} />
    </Layout>
  );
};

export default TravellersDetailsStep;
