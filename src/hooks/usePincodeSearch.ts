
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";

interface LocationData {
  stateId: number;
  districtId: number;
  cityId: number;
  cityName: string;
  _id: string; // Added _id field
}

export const usePincodeSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const searchCityByPincode = async (pincode: string): Promise<LocationData | null> => {
    // Check if pincode is valid (6 digits)
    if (!pincode || !/^\d{6}$/.test(pincode)) {
      return null;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`https://gyaantree.com/api/travel/v1/pin-area-search/reliance-pin?pincode=${pincode}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch city data');
      }
      
      const data = await response.json();
      
      // Check if we have results
      if (data && data.result && data.result.length > 0) {
        // Take the first result
        const firstResult = data.result[0];
        
        return {
          stateId: firstResult.stateId,
          districtId: firstResult.districtId,
          cityId: firstResult.cityId,
          cityName: firstResult.cityName,
          _id: firstResult._id // Store the _id from the API response
        };
      } else {
        toast({
          title: "No data found",
          description: "Couldn't fetch city for this pincode. Please enter it manually.",
          variant: "destructive"
        });
        return null;
      }
    } catch (error) {
      console.error('Error fetching pincode data:', error);
      toast({
        title: "Error",
        description: "Couldn't fetch city for this pincode. Please enter it manually.",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    searchCityByPincode
  };
};
