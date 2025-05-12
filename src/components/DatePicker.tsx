
import * as React from "react";
import { format, isValid } from "date-fns";
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
  id?: string;
  ascendingYears?: boolean;
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
  id,
  ascendingYears = false,
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

  // Format the date safely, checking for validity first
  const getFormattedDate = React.useCallback(() => {
    if (value && isValid(value)) {
      try {
        return format(value, "dd/MM/yyyy");
      } catch (error) {
        console.error("Error formatting date:", error);
        return "";
      }
    }
    return "";
  }, [value]);

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
            id={id}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value && isValid(value) ? (
              getFormattedDate()
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
          onInteractOutside={(e) => {
            // Prevent interactions outside from closing the popover when interacting with dropdowns
            const target = e.target as Element;
            if (target.closest('[role="listbox"]') || target.closest('[data-radix-calendar-root]')) {
              e.preventDefault();
            }
          }}
        >
          <Calendar
            key={calendarKey}
            mode="single"
            selected={value && isValid(value) ? value : undefined}
            onSelect={handleSelect}
            initialFocus
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
            className="p-3 pointer-events-auto"
            ascendingYears={ascendingYears}
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-sm font-medium text-destructive mt-1">{error}</p>
      )}
    </div>
  );
}
