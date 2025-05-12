
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

  // Local state for form values with proper typing
  const [localRegion, setLocalRegion] = useState<string>(region || '');
  const [localDestination, setLocalDestination] = useState<string>(destination || '');
  const [localStartDate, setLocalStartDate] = useState<Date | undefined>(undefined);
  const [localEndDate, setLocalEndDate] = useState<Date | undefined>(undefined);
  const [localDuration, setLocalDuration] = useState<number>(duration || 7);
  const [localDob, setLocalDob] = useState<Date | undefined>(undefined);
  const [localAge, setLocalAge] = useState<string>('');

  // Helper functions for parsing dates safely
  const parseDateString = (dateStr: string | undefined): Date | undefined => {
    if (!dateStr) return undefined;
    
    try {
      // Try parsing as YYYY-MM-DD (from context)
      if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const date = new Date(dateStr);
        return isValid(date) ? date : undefined;
      }
      
      // Try parsing as DD/MM/YYYY (from traveller DOB)
      if (dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        const [day, month, year] = dateStr.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        return isValid(date) ? date : undefined;
      }
      
      return undefined;
    } catch (error) {
      console.error('Error parsing date:', error);
      return undefined;
    }
  };
  
  // Set up initial values from context when dialog opens
  useEffect(() => {
    if (open) {
      // Set basic values
      setLocalRegion(region || '');
      setLocalDestination(destination || '');
      
      // Parse dates from context and localStorage
      try {
        // Parse startDate
        const parsedStartDate = parseDateString(startDate);
        setLocalStartDate(parsedStartDate);
        
        // Parse endDate
        const parsedEndDate = parseDateString(endDate);
        setLocalEndDate(parsedEndDate);
        
        // Set duration based on dates or existing value
        if (parsedStartDate && parsedEndDate) {
          const calculatedDuration = differenceInDays(parsedEndDate, parsedStartDate) + 1;
          setLocalDuration(calculatedDuration > 0 ? calculatedDuration : duration || 7);
        } else {
          setLocalDuration(duration || 7);
        }
        
        // Get traveller's DOB if available
        const traveller = travellers[0] || {};
        
        if (traveller.dob) {
          const parsedDob = parseDateString(traveller.dob);
          setLocalDob(parsedDob);
          
          // Calculate age from DOB
          if (parsedDob && isValid(parsedDob)) {
            const formattedDob = format(parsedDob, 'dd/MM/yyyy');
            const calculatedAge = calculateAge(formattedDob);
            setLocalAge(calculatedAge !== null ? calculatedAge.toString() : '');
          } else {
            setLocalAge(traveller.age || '');
          }
        } else {
          setLocalDob(undefined);
          setLocalAge('');
        }
      } catch (error) {
        console.error('Error setting up travel details form:', error);
        toast({ 
          title: "Error loading data",
          description: "There was a problem loading your travel details.",
          variant: "destructive"
        });
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
        const formattedDob = format(localDob, 'dd/MM/yyyy');
        const age = calculateAge(formattedDob);
        setLocalAge(age !== null ? age.toString() : '');
      } catch (error) {
        console.error('Error calculating age:', error);
        setLocalAge('');
      }
    }
  }, [localDob]);

  // Handle start date change
  const handleStartDateChange = (date: Date | undefined) => {
    setLocalStartDate(date);
    if (date && isValid(date)) {
      // If end date is not set or start date is after end date, set end date to start date + 7 days
      if (!localEndDate || !isValid(localEndDate) || date > localEndDate) {
        setLocalEndDate(addDays(date, 7));
      }
    }
  };

  // Handle end date change
  const handleEndDateChange = (date: Date | undefined) => {
    if (date && isValid(date)) {
      setLocalEndDate(date);
    }
  };

  // Handle DOB change
  const handleDobChange = (date: Date | undefined) => {
    setLocalDob(date);
    if (date && isValid(date)) {
      try {
        const formattedDob = format(date, 'dd/MM/yyyy');
        const age = calculateAge(formattedDob);
        setLocalAge(age !== null ? age.toString() : '');
      } catch (error) {
        console.error('Error calculating age:', error);
        setLocalAge('');
      }
    }
  };

  // Handle form submission
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

    try {
      // Update context values
      setRegion(localRegion);
      setDestination(localDestination);
      setStartDate(localStartDate ? format(localStartDate, 'yyyy-MM-dd') : '');
      setEndDate(localEndDate ? format(localEndDate, 'yyyy-MM-dd') : '');
      setDuration(localDuration);
      
      // Update traveller info using the correct format for DOB
      updateTraveller(0, {
        dob: localDob ? format(localDob, 'dd/MM/yyyy') : '', // Format as DD/MM/YYYY for API
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
      
      // Update dates data
      saveToLocalStorage('dates', {
        startDate: localStartDate ? format(localStartDate, 'yyyy-MM-dd') : '',
        endDate: localEndDate ? format(localEndDate, 'yyyy-MM-dd') : '',
        duration: localDuration
      });
      
      // Update traveller data
      if (storageData.travellers) {
        const updatedTravellers = [...(storageData.travellers.details || [])];
        if (updatedTravellers[0]) {
          updatedTravellers[0] = {
            ...updatedTravellers[0],
            dob: localDob ? format(localDob, 'dd/MM/yyyy') : '', // Format as DD/MM/YYYY for storage
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
      
      // Redirect to get fresh quotes based on updated information
      navigate('/plans');
      
      toast({ 
        title: "Travel details updated",
        description: "Your travel details have been updated successfully",
      });
    } catch (error) {
      console.error('Error saving data:', error);
      toast({ 
        title: "Update failed",
        description: "Failed to update travel details. Please try again.",
        variant: "destructive"
      });
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
              minDate={localStartDate || new Date()}
              disabled={!localStartDate}
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
