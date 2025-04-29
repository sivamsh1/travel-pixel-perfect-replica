
import * as React from "react";
import { format, isValid, subYears } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  isNomineeField?: boolean;
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
  error,
  disabled = false,
  isNomineeField = false,
}: DatePickerProps) {
  const [month, setMonth] = React.useState<number>(value ? value.getMonth() : new Date().getMonth());
  const [year, setYear] = React.useState<number>(value ? value.getFullYear() : new Date().getFullYear() - 25);
  
  // Generate years for selection (100 years back from current year)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 120 }, (_, i) => currentYear - i);
  
  // Generate months for selection
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calculate min date for nominee (18 years ago)
  const minDate = isNomineeField 
    ? subYears(new Date(), 18)  // Nominee must be at least 18
    : undefined;

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border border-gray-300 bg-background px-3 py-3 h-12 rounded-md",
              !value && "text-muted-foreground",
              error && "border-destructive focus:ring-destructive",
              className
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value && isValid(value) ? (
              format(value, "dd/MM/yyyy")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0" 
          align="start"
          sideOffset={8}
        >
          <div className="flex gap-2 p-2 border-b">
            <Select 
              value={months[month]} 
              onValueChange={(newMonth) => {
                const monthIndex = months.findIndex(m => m === newMonth);
                setMonth(monthIndex);
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-[300px]">
                {months.map((monthName) => (
                  <SelectItem key={monthName} value={monthName}>
                    {monthName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select 
              value={year.toString()} 
              onValueChange={(newYear) => {
                setYear(parseInt(newYear));
              }}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-[300px] overflow-y-auto">
                {years.map((yearValue) => (
                  <SelectItem key={yearValue} value={yearValue.toString()}>
                    {yearValue}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            month={new Date(year, month)}
            onMonthChange={(date) => {
              setMonth(date.getMonth());
              setYear(date.getFullYear());
            }}
            initialFocus
            className="pointer-events-auto"
            disabled={isNomineeField
              ? (date) => date > minDate || date < new Date("1900-01-01")
              : (date) => date > new Date() || date < new Date("1900-01-01")
            }
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm font-medium text-destructive mt-1">{error}</p>
      )}
    </div>
  );
}
