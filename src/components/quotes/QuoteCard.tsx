
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from 'lucide-react';

interface QuoteCardProps {
  planName: string;
  netPremium: number;
  premium: number;
  onBuyNow: () => void;
}

const QuoteCard: React.FC<QuoteCardProps> = ({
  planName,
  netPremium,
  premium,
  onBuyNow
}) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="bg-primary/10 pb-2">
        <CardTitle className="text-xl font-bold text-center">{planName}</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6 pb-4">
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <p className="text-sm text-gray-500">Net Premium</p>
            <p className="text-3xl font-bold">₹{netPremium.toFixed(2)}</p>
          </div>
          
          <div className="flex flex-col items-center border-t pt-4">
            <p className="text-sm text-gray-500">Premium</p>
            <p className="text-2xl font-semibold">₹{premium.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-center border-t pt-4 pb-4">
        <Button 
          className="w-full"
          onClick={onBuyNow}
        >
          <ShoppingCart className="mr-2" size={18} />
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuoteCard;
