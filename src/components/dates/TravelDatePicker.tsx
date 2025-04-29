
import React from 'react';
import { format, differenceInDays, addDays, isAfter } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';

interface TravelDatePickerProps {
  label: string;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  error?: string;
}

const TravelDatePicker = ({
  label,
  selectedDate,
  onDateSelect,
  minDate,
  maxDate,
  error
}: TravelDatePickerProps) => {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500 mb-1">{label}</span>
      <Popover>
        <PopoverTrigger asChild>
          <button 
            className={cn(
              "flex h-12 items-center justify-between rounded-md border border-primary bg-background px-3 py-2 text-sm w-full", 
              !selectedDate && "text-muted-foreground",
              error && "border-destructive"
            )}
          >
            {selectedDate ? format(selectedDate, "dd MMM yyyy") : <span className="text-muted-foreground">Select date</span>}
            <CalendarIcon className="h-5 w-5 ml-2 text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar 
            mode="single" 
            selected={selectedDate} 
            onSelect={onDateSelect} 
            disabled={{
              before: minDate,
              after: maxDate
            }} 
            initialFocus 
            className={cn("p-3 pointer-events-auto")} 
          />
        </PopoverContent>
      </Popover>
      {error && <span className="text-sm text-destructive mt-1">{error}</span>}
    </div>
  );
};

export default TravelDatePicker;
