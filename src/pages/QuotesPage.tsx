
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useTravelForm } from '@/context/TravelFormContext';
import QuoteCard from '@/components/quotes/QuoteCard';

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const QuotesPage = () => {
  const navigate = useNavigate();
  const { quotes, setQuotes } = useTravelForm();

  // If no quotes in context, try to get them from localStorage
  useEffect(() => {
    if (quotes.length === 0) {
      const storedQuotes = localStorage.getItem('travelQuotes');
      if (storedQuotes) {
        try {
          const parsedQuotes = JSON.parse(storedQuotes);
          setQuotes(parsedQuotes);
        } catch (error) {
          console.error('Error parsing stored quotes:', error);
          navigate('/contact'); // Redirect back to contact form if quotes can't be loaded
        }
      } else {
        // No quotes found, redirect back to form
        navigate('/contact');
      }
    }
  }, [quotes, setQuotes, navigate]);

  const handleBuyNow = (planId: string) => {
    // Store selected plan ID
    sessionStorage.setItem('selectedPlanId', planId);
    // Navigate to add-ons page
    navigate('/addons');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={steps} currentStep={2} completedSteps={[1]} />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-8">Available Insurance Plans</h2>
        
        {quotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-xl text-gray-500">Loading available quotes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {quotes.map((quote, index) => (
              <QuoteCard 
                key={`${quote.planName}-${index}`}
                planName={quote.planName}
                netPremium={quote.netPremium}
                premium={quote.premium}
                onBuyNow={() => handleBuyNow(quote.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default QuotesPage;
