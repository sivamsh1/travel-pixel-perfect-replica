
import { useNavigate } from 'react-router-dom';
import { format, parse, isValid } from 'date-fns';
import { useTravelForm } from '@/context/TravelFormContext';
import { saveToLocalStorage } from '@/utils/localStorageUtils';
import { InsurancePlan } from '@/types/insurance';

export const usePlanPurchase = (plan: InsurancePlan, onBuyNow: (planName: string) => void) => {
  const navigate = useNavigate();
  const { destination, startDate, endDate, travellers } = useTravelForm();

  const isPremiumValid = plan.netPremium !== null && plan.netPremium !== undefined && plan.netPremium > 0;

  const handleBuyNow = () => {
    if (!isPremiumValid) return;

    const planData = {
      name: plan.name,
      provider: plan.provider,
      price: plan.price,
      details: plan.details,
      insurer: `${plan.provider} ${plan.name}`,
      sumInsured: 'USD 50000'
    };

    saveToLocalStorage('selectedPlan', planData);

    const dob = travellers.map(traveller => {
      if (!traveller.dob) return null;
      try {
        const parsedDate = parse(traveller.dob, 'yyyy-MM-dd', new Date());
        if (!isValid(parsedDate)) return null;
        return format(parsedDate, 'dd/MM/yyyy');
      } catch (error) {
        console.error('Error parsing traveller DOB:', error);
        return null;
      }
    }).filter(Boolean);

    let formattedStartDate = '';
    if (startDate) {
      try {
        const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
        if (isValid(parsedStartDate)) {
          formattedStartDate = format(parsedStartDate, 'dd/MM/yyyy');
        }
      } catch (error) {
        console.error('Error parsing start date:', error);
      }
    }

    let formattedEndDate = '';
    if (endDate) {
      try {
        const parsedEndDate = parse(endDate, 'yyyy-MM-dd', new Date());
        if (isValid(parsedEndDate)) {
          formattedEndDate = format(parsedEndDate, 'dd/MM/yyyy');
        }
      } catch (error) {
        console.error('Error parsing end date:', error);
      }
    }

    const purchaseData = {
      destination: destination || "679e707834ecd414eb0004de",
      dob: dob.length ? dob : ["17/08/1997"],
      startDate: formattedStartDate || "19/06/2025",
      returnDate: formattedEndDate || "29/07/2025"
    };

    console.log('Purchase data:', JSON.stringify(purchaseData, null, 2));

    onBuyNow(plan.name);
    navigate('/addons');
  };

  return { isPremiumValid, handleBuyNow };
};
