
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import { useTravelForm } from '@/context/TravelFormContext';
import QuoteCard from '@/components/quotes/QuoteCard';
import { Skeleton } from "@/components/ui/skeleton";
import { QuoteData } from '@/context/TravelFormContext';

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
  const [isLoading, setIsLoading] = useState(true);
  const [formattedQuotes, setFormattedQuotes] = useState<QuoteData[]>([]);

  useEffect(() => {
    // If no quotes in context, try to get them from localStorage
    if (quotes.length === 0) {
      const storedQuotes = localStorage.getItem('travelQuotes');
      if (storedQuotes) {
        try {
          const parsedData = JSON.parse(storedQuotes);
          
          // Check if we have valid data structure
          if (parsedData && typeof parsedData === 'object') {
            // If it's already an array of quote objects, use it directly
            if (Array.isArray(parsedData)) {
              setQuotes(parsedData);
            }
            // If quotes are nested in a result property as an object
            else if (parsedData.result && typeof parsedData.result === 'object') {
              setQuotes([parsedData.result]); // Wrap in array if it's not already an array
            } else {
              console.error('Invalid quotes format:', parsedData);
              navigate('/contact');
            }
          } else {
            console.error('Invalid stored quotes data:', parsedData);
            navigate('/contact');
          }
        } catch (error) {
          console.error('Error parsing stored quotes:', error);
          navigate('/contact');
        }
      } else {
        // No quotes found, redirect back to form
        navigate('/contact');
      }
    }
  }, [quotes, setQuotes, navigate]);

  // Process quotes when they're available
  useEffect(() => {
    if (quotes.length > 0) {
      try {
        console.log("Processing quotes:", quotes);
        
        // If the quotes are already in the expected format
        if (Array.isArray(quotes) && quotes.every(q => q.planName && (q.premium !== undefined || q.netPremium !== undefined))) {
          // Ensure numeric properties are properly formatted
          const processedQuotes = quotes.map(quote => ({
            ...quote,
            premium: typeof quote.premium === 'string' ? parseFloat(quote.premium) : Number(quote.premium || 0),
            netPremium: typeof quote.netPremium === 'string' ? parseFloat(quote.netPremium) : Number(quote.netPremium || 0)
          }));
          setFormattedQuotes(processedQuotes);
        } 
        // If we have a result object with key-value pairs
        else if (quotes.length === 1 && typeof quotes[0] === 'object') {
          const quotesObj = quotes[0];
          const formattedData: QuoteData[] = Object.entries(quotesObj).map(([key, value]: [string, any]) => {
            // Extract company name from the key (e.g., reliance_Student_Basic)
            const keyParts = key.split('_');
            const companyName = keyParts[0].charAt(0).toUpperCase() + keyParts[0].slice(1);
            
            // Ensure numeric values are properly parsed
            const netPremium = typeof value.netPremium === 'string' ? parseFloat(value.netPremium) : Number(value.netPremium || 0);
            const premium = typeof value.premium === 'string' ? parseFloat(value.premium) : Number(value.premium || 0);
            
            return {
              id: key,
              companyName,
              planName: value.planName || keyParts.slice(1).join(' '),
              netPremium,
              premium
            };
          });
          
          setFormattedQuotes(formattedData);
        }
      } catch (error) {
        console.error('Error formatting quotes:', error);
      }
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [quotes]);

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
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-40 w-full rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : formattedQuotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8">
            <p className="text-xl text-gray-500">No quotes available. Please try again later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
            {formattedQuotes.map((quote, index) => (
              <QuoteCard 
                key={`${quote.planName}-${index}`}
                planName={quote.planName}
                netPremium={quote.netPremium}
                premium={quote.premium}
                companyName={quote.companyName}
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
