import React, { useState } from "react";
import { format, isValid, differenceInYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface TravellerDateOfBirthProps {
  index: number;
  dob?: string;
  age?: string;
  handleDateChange: (index: number, date: Date | undefined) => void;
  updateTraveller: (index: number, details: { age: string }) => void;
  error?: string;
}

const TravellerDateOfBirth: React.FC<TravellerDateOfBirthProps> = ({
  index,
  dob,
  age,
  handleDateChange,
  error
}) => {
  // Add state to control the popover
  const [open, setOpen] = useState(false);
  
  const parseDOB = (dateString?: string): Date | undefined => {
    if (!dateString) return undefined;
    
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day);
    }
    
    const date = new Date(dateString);
    return !isNaN(date.getTime()) ? date : undefined;
  };

  const handleSelect = (date: Date | undefined) => {
    handleDateChange(index, date);
    
    // If a date was selected, close the popover
    if (date) {
      setOpen(false); // This will close the popover
    }
  };

  const dateValue = parseDOB(dob);

  return (
    <div className="flex gap-4">
      <div className="flex-1 min-w-[240px] max-w-[320px]">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full text-left font-normal border border-primary bg-background px-4 py-3 h-12 rounded-md",
                !dateValue && "text-muted-foreground",
                error ? "border-destructive focus:ring-destructive" : ""
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 opacity-60" />
              {dateValue && isValid(dateValue)
                ? format(dateValue, "PPP")
                : <span>{`Traveller ${index + 1} DOB`}</span>
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start" sideOffset={8}>
            <Calendar
              mode="single"
              selected={dateValue}
              onSelect={handleSelect}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {error && (
          <p className="text-sm font-medium text-destructive mt-1">{error}</p>
        )}
      </div>
      <div className="w-1/3">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder={`T ${index + 1} Age (Years)`}
          value={age || ''}
          readOnly
        />
      </div>
    </div>
  );
};

export default TravellerDateOfBirth;
