
import * as React from "react";
import { format, isValid, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  disableFuture?: boolean;
  minDate?: Date;
  maxDate?: Date;
  id?: string; // Added id prop
}

export function DatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
  error,
  disabled = false,
  disableFuture = false,
  minDate,
  maxDate,
  id, // Added id to destructuring
}: DatePickerProps) {
  // Create a ref for the popover trigger to manage focus
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);

  // Force calendar to re-render when opened
  const [calendarKey, setCalendarKey] = React.useState(0);
  
  React.useEffect(() => {
    if (open) {
      setCalendarKey(prev => prev + 1);
    }
  }, [open]);

  // Handle date selection
  const handleSelect = React.useCallback((date: Date | undefined) => {
    onChange(date);
    setOpen(false);
    // Return focus to the trigger button after selection
    setTimeout(() => triggerRef.current?.focus(), 10);
  }, [onChange]);

  // Handle click on the button to toggle the popover
  const handleButtonClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  }, [open]);

  return (
    <div className="w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={triggerRef}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal border border-gray-300 bg-background px-3 py-3 h-12 rounded-md",
              !value && "text-muted-foreground",
              error && "border-destructive focus:ring-destructive",
              className
            )}
            disabled={disabled}
            type="button"
            onClick={handleButtonClick}
            id={id} // Add id to the button
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
          className="w-auto p-0 z-[9999]" 
          align="start"
          sideOffset={8}
          onEscapeKeyDown={() => {
            setOpen(false);
            setTimeout(() => triggerRef.current?.focus(), 10);
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Calendar
            key={calendarKey}
            mode="single"
            selected={value}
            onSelect={handleSelect}
            initialFocus
            className="p-3 pointer-events-auto z-[9999]"
            disabled={(date) => {
              const today = new Date();
              
              // Disable future dates if requested
              if (disableFuture && date > today) {
                return true;
              }
              
              // Disable dates before minDate
              if (minDate && date < minDate) {
                return true;
              }
              
              // Disable dates after maxDate
              if (maxDate && date > maxDate) {
                return true;
              }
              
              return false;
            }}
            data-radix-calendar-root
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm font-medium text-destructive mt-1">{error}</p>
      )}
    </div>
  );
}
