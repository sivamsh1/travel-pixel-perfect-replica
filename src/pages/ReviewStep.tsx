
import React from 'react';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useReviewPage } from '@/hooks/useReviewPage';
import ReviewSummary from '@/components/review/ReviewSummary';
import TripDetails from '@/components/review/TripDetails';
import TravellerDetails from '@/components/review/TravellerDetails';
import ProductDetails from '@/components/review/ProductDetails';
import PricingSummary from '@/components/review/PricingSummary';
import TermsAndPayment from '@/components/review/TermsAndPayment';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const ReviewStep = () => {
  const {
    location,
    travellers,
    selectedPlan,
    selectedAddOns,
    agreeToTerms,
    setAgreeToTerms,
    isSubmitting,
    duration,
    formattedStartDate,
    formattedEndDate,
    formatDate,
    formatTravellerAge,
    handlePayNow
  } = useReviewPage();

  // Get provider from selected plan
  const provider = selectedPlan?.provider || 'Reliance';

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator 
          steps={steps} 
          currentStep={5} 
          completedSteps={[1, 2, 3, 4]}
        />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6 max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Review & Pay</h2>
        
        <ReviewSummary
          location={location}
          dates={undefined}
          duration={duration}
          formattedStartDate={formattedStartDate}
          formattedEndDate={formattedEndDate}
        />
        
        <div className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <TripDetails
            location={location}
            formattedStartDate={formattedStartDate}
            formattedEndDate={formattedEndDate}
            duration={duration}
          />
          
          <TravellerDetails
            travellers={travellers}
            formatDate={formatDate}
            formatTravellerAge={formatTravellerAge}
          />
          
          <ProductDetails
            selectedPlan={selectedPlan}
            selectedAddOns={selectedAddOns}
          />
          
          <PricingSummary selectedPlan={selectedPlan} />
        </div>
        
        <TermsAndPayment
          agreeToTerms={agreeToTerms}
          setAgreeToTerms={setAgreeToTerms}
          handlePayNow={handlePayNow}
          isSubmitting={isSubmitting}
          provider={provider}
        />
      </div>
    </Layout>
  );
};

export default ReviewStep;
