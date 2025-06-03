
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Download, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import bajajLogo from '@/assets/bajajLogo.png';

const BajajSuccessPage = () => {
  const navigate = useNavigate();

  const handleDownloadPolicy = () => {
    // This would typically trigger a download of the policy document
    console.log('Downloading Bajaj policy...');
    // In a real implementation, this would fetch and download the policy PDF
  };

  const handleBackHome = () => {
    navigate('/');
  };

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

            {/* Policy Details */}
            <div 
              className="bg-gray-50 rounded-lg p-4 mb-6 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="text-sm text-gray-600 mb-2">Policy Number</div>
              <div className="font-semibold text-gray-900 text-lg">BA-{Date.now().toString().slice(-8)}</div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                onClick={handleDownloadPolicy}
                className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 animate-fade-in"
                style={{ animationDelay: '0.6s' }}
              >
                <Download className="w-5 h-5 mr-2" />
                Download Policy
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
