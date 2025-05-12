
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

  // Set up initial values from context when dialog opens
  useEffect(() => {
    if (open) {
      console.log("Dialog opened, loading data...");
      console.log("Current region:", region);
      console.log("Current destination:", destination);
      console.log("Current startDate:", startDate);
      console.log("Current endDate:", endDate);
      console.log("Current travellers:", travellers);
      
      setLocalRegion(region);
      setLocalDestination(destination);
      
      // Parse dates from string format to Date objects safely
      try {
        if (startDate) {
          const parsedStartDate = parse(startDate, 'yyyy-MM-dd', new Date());
          console.log("Parsed startDate:", parsedStartDate, isValid(parsedStartDate));
          setLocalStartDate(isValid(parsedStartDate) ? parsedStartDate : undefined);
        } else {
          setLocalStartDate(undefined);
        }
        
        if (endDate) {
          const parsedEndDate = parse(endDate, 'yyyy-MM-dd', new Date());
          console.log("Parsed endDate:", parsedEndDate, isValid(parsedEndDate));
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
          console.log("Parsed DOB:", dobDate, isValid(dobDate));
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

  const handleSave = () => {
    // Validation
    if (!localRegion) {
      toast({ description: "Please select a travel region", variant: "destructive" });
      return;
    }
    if (!localDestination) {
      toast({ description: "Please enter a destination", variant: "destructive" });
      return;
    }
    if (!localStartDate || !isValid(localStartDate)) {
      toast({ description: "Please select a valid start date", variant: "destructive" });
      return;
    }
    if (!localEndDate || !isValid(localEndDate)) {
      toast({ description: "Please select a valid end date", variant: "destructive" });
      return;
    }
    if (!localDob || !isValid(localDob)) {
      toast({ description: "Please select a valid date of birth", variant: "destructive" });
      return;
    }

    // Update context values with safe formatting
    setRegion(localRegion);
    setDestination(localDestination);
    
    try {
      setStartDate(localStartDate && isValid(localStartDate) ? format(localStartDate, 'yyyy-MM-dd') : '');
      setEndDate(localEndDate && isValid(localEndDate) ? format(localEndDate, 'yyyy-MM-dd') : '');
    } catch (error) {
      console.error("Error formatting dates:", error);
      toast({ description: "Error processing dates. Please try again.", variant: "destructive" });
      return;
    }
    
    setDuration(localDuration);
    
    // Update traveller info
    try {
      updateTraveller(0, {
        dob: localDob && isValid(localDob) ? format(localDob, 'yyyy-MM-dd') : '',
        age: localAge
      });
    } catch (error) {
      console.error("Error updating traveller:", error);
    }
    
    // Save to localStorage
    const storageData = getFromLocalStorage() || {};
    
    // Update location data
    saveToLocalStorage('location', {
      region: localRegion,
      destination: localDestination,
      destinationId: storageData.location?.destinationId || ''
    });
    
    // Update dates data safely
    try {
      saveToLocalStorage('dates', {
        startDate: localStartDate && isValid(localStartDate) ? format(localStartDate, 'yyyy-MM-dd') : '',
        endDate: localEndDate && isValid(localEndDate) ? format(localEndDate, 'yyyy-MM-dd') : '',
        duration: localDuration
      });
    } catch (error) {
      console.error("Error saving dates to localStorage:", error);
    }
    
    // Update traveller data
    if (storageData.travellers) {
      const updatedTravellers = [...(storageData.travellers.details || [])];
      if (updatedTravellers[0]) {
        try {
          updatedTravellers[0] = {
            ...updatedTravellers[0],
            dob: localDob && isValid(localDob) ? format(localDob, 'yyyy-MM-dd') : '',
            age: localAge
          };
        } catch (error) {
          console.error("Error updating traveller in localStorage:", error);
        }
      }
      saveToLocalStorage('travellers', {
        ...storageData.travellers,
        details: updatedTravellers
      });
    }
    
    // Close dialog
    onOpenChange(false);
    
    // Redirect to get fresh quotes based on updated information
    navigate('/plans');
    
    toast({ 
      title: "Travel details updated",
      description: "Your travel details have been updated successfully",
    });
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
                  ascendingYears={false}
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
          >
            Cancel
          </Button>
          <Button 
            variant="default" 
            onClick={handleSave}
            className="sm:w-auto w-full bg-primary hover:bg-primary/90 mt-2 sm:mt-0"
          >
            Update & Get Quotes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditTravelDetailsDialog;
