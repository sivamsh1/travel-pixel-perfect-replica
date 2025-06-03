
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Download, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import bajajLogo from '@/assets/bajajLogo.png';

const BajajSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    status: string;
    amount: string;
    txn: string;
    referenceNo: string;
    quoteNo: string;
  } | null>(null);

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(location.search);
    const status = urlParams.get('status');
    const amt = urlParams.get('amt');
    const txn = urlParams.get('txn');
    const referenceno = urlParams.get('referenceno');
    const quoteno = urlParams.get('quoteno');

    if (status && amt && txn && referenceno) {
      setPaymentDetails({
        status,
        amount: amt,
        txn,
        referenceNo: referenceno,
        quoteNo: quoteno || ''
      });
    }
  }, [location.search]);

  const handleDownloadPolicy = async () => {
    if (!paymentDetails?.referenceNo) {
      toast({
        title: "Error",
        description: "Policy number not found. Please contact support.",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    
    try {
      const response = await fetch('https://travel-uat.policyinsure.com/api/v1/policy-download/bajaj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          policyNo: paymentDetails.referenceNo
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the PDF as blob
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Bajaj_Policy_${paymentDetails.referenceNo}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

      toast({
        title: "Success",
        description: "Policy document downloaded successfully!",
      });
    } catch (error) {
      console.error('Error downloading policy:', error);
      toast({
        title: "Download Error",
        description: "Failed to download policy. Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleBackHome = () => {
    navigate('/');
  };

  if (!paymentDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Success Animation Container */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center">
            {/* Animated Success Circle */}
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-scale-in shadow-lg">
              <Check className="w-12 h-12 text-white animate-fade-in" />
            </div>
            {/* Pulse Rings */}
            <div className="absolute inset-0 w-24 h-24 bg-green-500 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 w-24 h-24 bg-green-500 rounded-full animate-pulse opacity-10"></div>
          </div>
        </div>

        {/* Main Success Card */}
        <Card className="animate-fade-in shadow-xl border-0">
          <CardContent className="p-8 text-center">
            {/* Bajaj Logo */}
            <div className="mb-6 flex justify-center">
              <img 
                src={bajajLogo} 
                alt="Bajaj Allianz" 
                className="h-12 animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              />
            </div>

            {/* Success Message */}
            <div className="mb-6">
              <h1 
                className="text-2xl font-bold text-gray-900 mb-3 animate-fade-in"
                style={{ animationDelay: '0.3s' }}
              >
                Payment Successful!
              </h1>
              <p 
                className="text-gray-600 animate-fade-in"
                style={{ animationDelay: '0.4s' }}
              >
                Your Bajaj Allianz travel insurance policy has been successfully purchased and activated.
              </p>
            </div>

            {/* Payment Details */}
            <div 
              className="bg-gray-50 rounded-lg p-4 mb-6 animate-fade-in space-y-2"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Amount Paid:</span>
                <span className="font-semibold text-gray-900">₹{paymentDetails.amount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Transaction ID:</span>
                <span className="font-semibold text-gray-900">{paymentDetails.txn}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Policy Number:</span>
                <span className="font-semibold text-gray-900">{paymentDetails.referenceNo}</span>
              </div>
              {paymentDetails.quoteNo && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Quote Number:</span>
                  <span className="font-semibold text-gray-900">{paymentDetails.quoteNo}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleDownloadPolicy}
                disabled={isDownloading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 animate-fade-in"
                style={{ animationDelay: '0.6s' }}
              >
                <Download className="w-5 h-5 mr-2" />
                {isDownloading ? 'Downloading...' : 'Download Policy'}
              </Button>
              
              <Button 
                onClick={handleBackHome}
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-white font-medium py-3 animate-fade-in"
                style={{ animationDelay: '0.7s' }}
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </div>

            {/* Footer Message */}
            <p 
              className="text-xs text-gray-500 mt-6 animate-fade-in"
              style={{ animationDelay: '0.8s' }}
            >
              A confirmation email with your policy details has been sent to your registered email address.
            </p>
          </CardContent>
        </Card>

        {/* Floating Animation Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-40" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-green-300 rounded-full animate-bounce opacity-50" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default BajajSuccessPage;
