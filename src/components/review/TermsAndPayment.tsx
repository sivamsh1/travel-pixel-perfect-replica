
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import ActionButton from '@/components/ActionButton';
import { Loader2 } from 'lucide-react';

interface TermsAndPaymentProps {
  agreeToTerms: boolean;
  setAgreeToTerms: (value: boolean) => void;
  handlePayNow: () => void;
  isSubmitting: boolean;
  provider?: string;
}

const TermsAndPayment: React.FC<TermsAndPaymentProps> = ({
  agreeToTerms,
  setAgreeToTerms,
  handlePayNow,
  isSubmitting,
  provider = 'Reliance'
}) => {
  return (
    <>
      <div className="mt-8 flex justify-center items-center gap-2">
        <Checkbox 
          id="terms-conditions" 
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
        />
        <label htmlFor="terms-conditions" className="text-sm">
          I have read and agree to the <span className="text-primary">Terms & Conditions</span> to avail Travel Assistance with Insurance.
        </label>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-500">
        Your payment will be processed through {provider} payment gateway
      </div>
      
      <div className="mt-8">
        <ActionButton onClick={handlePayNow} disabled={isSubmitting}>
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing...
            </span>
          ) : (
            'Pay Now'
          )}
        </ActionButton>
      </div>
    </>
  );
};

export default TermsAndPayment;
