
import React, { useState, useEffect } from 'react';
import { addDays, differenceInDays, format, parse, isValid } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTravelForm } from '@/context/TravelFormContext';
import { getFromLocalStorage, saveToLocalStorage } from '@/utils/localStorageUtils';
import RegionSelector from '@/components/RegionSelector';
import { Input } from '@/components/ui/input';
import TravelDatePicker from '@/components/dates/TravelDatePicker';
import { calculateAge } from '@/utils/travellerUtils';
import { toast } from '@/hooks/use-toast';
import { socketService } from '@/services/socketService';

interface EditTravelDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditTravelDetailsDialog = ({ 
  open, 
  onOpenChange
}: EditTravelDetailsDialogProps) => {
  const navigate = useNavigate();
  const { 
    region, setRegion,
    destination, setDestination,
    startDate, setStartDate,
    endDate, setEndDate,
    duration, setDuration,
    travellers, updateTraveller
  } = useTravelForm();

  // Local state for form values
  const [localRegion, setLocalRegion] = useState(region);
  const [localDestination, setLocalDestination] = useState(destination);
  const [localStartDate, setLocalStartDate] = useState<Date | undefined>(undefined);
  const [localEndDate, setLocalEndDate] = useState<Date | undefined>(undefined);
  const [localDuration, setLocalDuration] = useState<number>(duration);
  const [localDob, setLocalDob] = useState<Date | undefined>(undefined);
  const [localAge, setLocalAge] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Set up initial values from context when dialog opens
  useEffect(() => {
    if (open) {
      setLocalRegion(region);
      setLocalDestination(destination);
      
      // Parse dates from string format to Date objects safely
      try {
        if (startDate) {
          const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
          setLocalStartDate(isValid(parsedStartDate) ? parsedStartDate : undefined);
        } else {
          setLocalStartDate(undefined);
        }
        
        if (endDate) {
          const parsedEndDate = parse(endDate, 'yyyy-MM-dd', new Date());
          setLocalEndDate(isValid(parsedEndDate) ? parsedEndDate : undefined);
        } else {
          setLocalEndDate(undefined);
        }
      } catch (error) {
        console.error("Error parsing dates:", error);
        setLocalStartDate(undefined);
        setLocalEndDate(undefined);
      }
      
      setLocalDuration(duration);
      
      // Get traveller's DOB if available
      const traveller = travellers[0] || {};
      if (traveller.dob) {
        try {
          const dobDate = parse(traveller.dob, 'yyyy-MM-dd', new Date());
          setLocalDob(isValid(dobDate) ? dobDate : undefined);
          setLocalAge(traveller.age || '');
        } catch (error) {
          console.error('Error parsing DOB:', error);
          setLocalDob(undefined);
          setLocalAge('');
        }
      }
    }
  }, [open, region, destination, startDate, endDate, duration, travellers]);

  // Calculate duration when dates change
  useEffect(() => {
    if (localStartDate && localEndDate && isValid(localStartDate) && isValid(localEndDate)) {
      const days = differenceInDays(localEndDate, localStartDate) + 1;
      setLocalDuration(days > 0 ? days : 0);
    }
  }, [localStartDate, localEndDate]);

  // Calculate age when DOB changes
  useEffect(() => {
    if (localDob && isValid(localDob)) {
      try {
        const formattedDob = format(localDob, 'yyyy-MM-dd');
        const age = calculateAge(formattedDob);
        setLocalAge(age !== null ? age.toString() : '');
      } catch (error) {
        console.error('Error calculating age:', error);
        setLocalAge('');
      }
    }
  }, [localDob]);

  const handleStartDateChange = (date: Date | undefined) => {
    setLocalStartDate(date);
    if (date && isValid(date) && (!localEndDate || !isValid(localEndDate))) {
      // If end date is not set, set it to start date + 7 days
      setLocalEndDate(addDays(date, 7));
    }
  };

  const handleEndDateChange = (date: Date | undefined) => {
    setLocalEndDate(date);
  };

  const handleDobChange = (date: Date | undefined) => {
    setLocalDob(date);
    if (date && isValid(date)) {
      try {
        const formattedDob = format(date, 'yyyy-MM-dd');
        const age = calculateAge(formattedDob);
        setLocalAge(age !== null ? age.toString() : '');
      } catch (error) {
        console.error('Error formatting DOB:', error);
      }
    }
  };

  const handleSave = async () => {
    // Prevent multiple submissions
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    // Validation
    if (!localRegion) {
      toast({ description: "Please select a travel region", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (!localDestination) {
      toast({ description: "Please enter a destination", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (!localStartDate || !isValid(localStartDate)) {
      toast({ description: "Please select a valid start date", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (!localEndDate || !isValid(localEndDate)) {
      toast({ description: "Please select a valid end date", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }
    if (!localDob || !isValid(localDob)) {
      toast({ description: "Please select a valid date of birth", variant: "destructive" });
      setIsSubmitting(false);
      return;
    }

    try {
      // Update context values with safe formatting
      setRegion(localRegion);
      setDestination(localDestination);
      
      setStartDate(localStartDate && isValid(localStartDate) ? format(localStartDate, 'yyyy-MM-dd') : '');
      setEndDate(localEndDate && isValid(localEndDate) ? format(localEndDate, 'yyyy-MM-dd') : '');
      
      setDuration(localDuration);
      
      // Update traveller info
      updateTraveller(0, {
        dob: localDob && isValid(localDob) ? format(localDob, 'yyyy-MM-dd') : '',
        age: localAge
      });
      
      // Save to localStorage
      const storageData = getFromLocalStorage() || {};
      
      // Update location data
      saveToLocalStorage('location', {
        region: localRegion,
        destination: localDestination,
        destinationId: storageData.location?.destinationId || ''
      });
      
      // Update dates data safely
      saveToLocalStorage('dates', {
        startDate: localStartDate && isValid(localStartDate) ? format(localStartDate, 'yyyy-MM-dd') : '',
        endDate: localEndDate && isValid(localEndDate) ? format(localEndDate, 'yyyy-MM-dd') : '',
        duration: localDuration
      });
      
      // Update traveller data
      if (storageData.travellers) {
        const updatedTravellers = [...(storageData.travellers.details || [])];
        if (updatedTravellers[0]) {
          updatedTravellers[0] = {
            ...updatedTravellers[0],
            dob: localDob && isValid(localDob) ? format(localDob, 'yyyy-MM-dd') : '',
            age: localAge
          };
        }
        saveToLocalStorage('travellers', {
          ...storageData.travellers,
          details: updatedTravellers
        });
      }
      
      // Close dialog
      onOpenChange(false);
      
      // Show loading toast
      toast({ 
        title: "Updating travel details",
        description: "Refreshing quotes based on your updates...",
      });
      
      // Reset socket connection to get fresh quotes
      socketService.disconnect();
      socketService.connect();
      
      // Refresh the page to trigger new quote fetching
      window.location.reload();
      
    } catch (error) {
      console.error("Error saving travel details:", error);
      toast({
        title: "Error",
        description: "There was a problem updating your travel details. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Travel Details</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Travel Region */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Travel Region</label>
            <RegionSelector value={localRegion} onChange={setLocalRegion} />
          </div>
          
          {/* Destination */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Destination</label>
            <Input 
              value={localDestination} 
              onChange={(e) => setLocalDestination(e.target.value)}
              placeholder="Enter destination"
            />
          </div>
          
          {/* Dates - Side by side on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Start Date */}
            <TravelDatePicker
              label="Start Date"
              selectedDate={localStartDate}
              onDateSelect={handleStartDateChange}
              minDate={new Date()}
              ascendingYears={true}
            />
            
            {/* End Date */}
            <TravelDatePicker
              label="End Date"
              selectedDate={localEndDate}
              onDateSelect={handleEndDateChange}
              minDate={localStartDate}
              disabled={!localStartDate || !isValid(localStartDate)}
              ascendingYears={true}
            />
          </div>
          
          {/* Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (Days)</label>
            <Input 
              type="number" 
              value={localDuration} 
              onChange={(e) => setLocalDuration(parseInt(e.target.value) || 0)} 
              min="1"
              readOnly
              className="bg-gray-50"
            />
          </div>
          
          {/* Traveller Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* DOB */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Traveller's Date of Birth</label>
              <div className="relative">
                <TravelDatePicker
                  label=""
                  selectedDate={localDob}
                  onDateSelect={handleDobChange}
                  maxDate={new Date()}
                  ascendingYears={true}
                />
              </div>
            </div>
            
            {/* Age */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Age (Years)</label>
              <Input 
                value={localAge} 
                readOnly 
                className="bg-gray-50" 
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="sm:w-auto w-full"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleSave}
            className="sm:w-auto w-full bg-primary hover:bg-primary/90 mt-2 sm:mt-0"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update & Get Quotes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTravelDetailsDialog;
