import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, parse, isValid } from 'date-fns';
import { useTravelForm } from '@/context/TravelFormContext';
import { getFromLocalStorage } from '@/utils/localStorageUtils';
import { TravelFormData } from '@/utils/localStorageUtils';
import { createQuote } from '@/utils/quoteService';
import { toast } from "@/hooks/use-toast";

export const useReviewPage = () => {
  const navigate = useNavigate();
  const { selectedAddOns, agreeToTerms, setAgreeToTerms } = useTravelForm();
  const [storedData, setStoredData] = useState<TravelFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formatDate = (dateStr: string | undefined, defaultValue = ''): string => {
    if (!dateStr) return defaultValue;
    
    try {
      const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date());
      if (isValid(parsedDate)) {
        return format(parsedDate, 'do MMMM yyyy');
      }
      return defaultValue;
    } catch (error) {
      console.error('Error formatting date:', error);
      return defaultValue;
    }
  };
  
  const calculateDuration = (startDate?: string, endDate?: string): number => {
    if (!startDate || !endDate) return 0;
    
    try {
      const start = parse(startDate, 'yyyy-MM-dd', new Date());
      const end = parse(endDate, 'yyyy-MM-dd', new Date());
      
      if (!isValid(start) || !isValid(end)) return 0;
      
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      return diffDays >= 0 ? diffDays + 1 : 0;
    } catch (error) {
      console.error('Error calculating duration:', error);
      return 0;
    }
  };
  
  const formatTravellerAge = (dob?: string): string => {
    if (!dob) return '';
    
    try {
      const birthDate = parse(dob, 'yyyy-MM-dd', new Date());
      if (!isValid(birthDate)) return '';
      
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      
      return `(${age})`;
    } catch (error) {
      console.error('Error calculating age:', error);
      return '';
    }
  };

  useEffect(() => {
    const data = getFromLocalStorage();
    setStoredData(data);
  }, []);

  const handlePayNow = async () => {
    if (!agreeToTerms) {
      toast({
        title: "Terms & Conditions",
        description: "Please agree to the terms and conditions to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    if (!storedData) {
      toast({
        title: "Missing Data",
        description: "Required travel information is missing. Please complete all previous steps.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      toast({
        title: "Processing",
        description: "Processing your payment...",
      });
      
      const result = await createQuote(storedData);
      
      if (!result.url) {
        toast({
          title: "Success!",
          description: "Payment successful! Thank you for purchasing travel insurance.",
        });
        
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsSubmitting(false);
      
      toast({
        title: "Payment Error",
        description: "Failed to process your payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  const location = storedData?.location;
  const dates = storedData?.dates;
  const travellers = storedData?.travellers;
  const selectedPlan = storedData?.selectedPlan;
  
  const duration = dates ? 
    calculateDuration(dates.startDate, dates.endDate) || dates.duration : 
    0;
    
  const formattedStartDate = formatDate(dates?.startDate, '17th April 2025');
  const formattedEndDate = formatDate(dates?.endDate, '19th April 2025');

  return {
    location,
    dates,
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
  };
};
