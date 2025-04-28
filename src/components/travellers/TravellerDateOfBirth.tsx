
import React from "react";
import { format, isValid, addYears, subYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { differenceInYears } from "date-fns";
import { toast } from "@/components/ui/use-toast";

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
    if (date) {
      const age = differenceInYears(new Date(), date);
      
      if (age < 16) {
        toast({
          title: "Age Restriction",
          description: "Proposer must be at least 16 years old",
          variant: "destructive"
        });
        return;
      }
      
      if (age > 35) {
        toast({
          title: "Age Restriction",
          description: "Proposer cannot be more than 35 years old",
          variant: "destructive"
        });
        return;
      }
    }
    
    handleDateChange(index, date);
  };

  const dateValue = parseDOB(dob);
  const minDate = subYears(new Date(), 35); // Max age 35 years
  const maxDate = subYears(new Date(), 16); // Min age 16 years

  return (
    <div className="flex gap-4">
      <div className="flex-1 min-w-[240px] max-w-[320px]">
        <Popover>
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
              disabled={(date) =>
                date > maxDate || date < minDate
              }
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
          placeholder={`T ${index + 1} Age`}
          value={age || ''}
          readOnly
        />
      </div>
    </div>
  );
};

export default TravellerDateOfBirth;
