
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

  // Ensure the calendar closes when Escape key is pressed
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        setTimeout(() => triggerRef.current?.focus(), 10);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
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
          className="w-auto p-0 z-[100]" 
          align="start"
          sideOffset={8}
          onEscapeKeyDown={() => {
            setOpen(false);
            setTimeout(() => triggerRef.current?.focus(), 10);
          }}
          onInteractOutside={(e) => {
            setOpen(false);
          }}
        >
          <Calendar
            key={calendarKey}
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
              // Return focus to the trigger button when a date is selected
              setTimeout(() => {
                triggerRef.current?.focus();
              }, 10);
            }}
            initialFocus
            className="pointer-events-auto"
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
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm font-medium text-destructive mt-1">{error}</p>
      )}
    </div>
  );
}
