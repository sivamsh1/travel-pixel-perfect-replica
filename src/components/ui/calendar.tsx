import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayPickerProps } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Define our own types for selected dates based on the mode
type DateType = Date | undefined;
type DateRange = { from: Date | undefined; to: Date | undefined };
type SelectedDateType = DateType | DateType[] | DateRange | undefined;

// Explicitly define our CalendarProps interface
export interface CalendarProps extends Omit<DayPickerProps, "mode" | "selected" | "onSelect"> {
  ascendingYears?: boolean;
  // Re-add the props we need with correct types
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[] | { from: Date; to: Date } | undefined;
  onSelect?: (date: Date | undefined) => void;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ascendingYears = false,
  mode = "single",
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  // Get current month and year when the calendar mounts or when selected date changes
  const [currentMonth, setCurrentMonth] = React.useState<Date>(
    selected instanceof Date ? new Date(selected) : new Date()
  );

  // Track month/year select dropdown states
  const [isMonthSelectOpen, setIsMonthSelectOpen] = React.useState(false);
  const [isYearSelectOpen, setIsYearSelectOpen] = React.useState(false);

  // Generate years for selection
  const currentYear = new Date().getFullYear();
  
  // Set fromYear and toYear based on ascending mode
  const fromYear = ascendingYears ? currentYear - 10 : currentYear - 75;
  const toYear = ascendingYears ? currentYear + 30 : currentYear + 25;
  
  // Create years array in the correct order
  const years = Array.from(
    { length: toYear - fromYear + 1 }, 
    (_, i) => ascendingYears ? fromYear + i : toYear - i
  );

  // Generate months for selection
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Refs for click outside detection
  const calendarRef = React.useRef<HTMLDivElement>(null);
  const monthButtonRef = React.useRef<HTMLButtonElement>(null);
  const yearButtonRef = React.useRef<HTMLButtonElement>(null);
  const monthDropdownRef = React.useRef<HTMLDivElement>(null);
  const yearDropdownRef = React.useRef<HTMLDivElement>(null);

  // Update calendar view when props.selected changes
  React.useEffect(() => {
    if (selected instanceof Date && isValid(selected)) {
      setCurrentMonth(new Date(selected));
    }
  }, [selected]);

  // Check if a date is valid
  function isValid(date: any): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  // Handle month selection
  const handleMonthChange = (monthIndex: number) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(monthIndex);
    setCurrentMonth(newDate);
    setIsMonthSelectOpen(false);
    if (monthButtonRef.current) {
      monthButtonRef.current.focus();
    }
  };

  // Handle year selection
  const handleYearChange = (year: number) => {
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
    setIsYearSelectOpen(false);
    if (yearButtonRef.current) {
      yearButtonRef.current.focus();
    }
  };

  // Handle click events on dropdowns to prevent propagation
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only process if one of the dropdowns is open
      if (!isMonthSelectOpen && !isYearSelectOpen) return;
      
      // Check if click is outside calendar component
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsMonthSelectOpen(false);
        setIsYearSelectOpen(false);
        return;
      }
      
      // If month dropdown is open, check if click is outside month button and dropdown
      if (isMonthSelectOpen && monthButtonRef.current) {
        const target = event.target as Node;
        if (target !== monthButtonRef.current && !monthButtonRef.current.contains(target)) {
          if (monthDropdownRef.current && !monthDropdownRef.current.contains(target)) {
            setIsMonthSelectOpen(false);
          }
        }
      }
      
      // If year dropdown is open, check if click is outside year button and dropdown
      if (isYearSelectOpen && yearButtonRef.current) {
        const target = event.target as Node;
        if (target !== yearButtonRef.current && !yearButtonRef.current.contains(target)) {
          if (yearDropdownRef.current && !yearDropdownRef.current.contains(target)) {
            setIsYearSelectOpen(false);
          }
        }
      }
    };

    // Close dropdowns when ESC key is pressed
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMonthSelectOpen) {
          setIsMonthSelectOpen(false);
          monthButtonRef.current?.focus();
        }
        if (isYearSelectOpen) {
          setIsYearSelectOpen(false);
          yearButtonRef.current?.focus();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMonthSelectOpen, isYearSelectOpen]);

  // Custom Caption component for the calendar
  const CustomCaption = ({ ...captionProps }: any) => {
    return (
      <div className="flex gap-2 justify-center items-center py-2 pointer-events-auto" ref={calendarRef}>
        {/* Month dropdown */}
        <div className="relative">
          <button
            ref={monthButtonRef}
            className="flex items-center justify-between w-[140px] h-10 px-3 py-2 text-sm border rounded-md bg-background pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setIsMonthSelectOpen(!isMonthSelectOpen);
              setIsYearSelectOpen(false);
            }}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isMonthSelectOpen}
          >
            {months[currentMonth.getMonth()]}
            <ChevronRight className={`h-4 w-4 transition-transform ${isMonthSelectOpen ? 'rotate-90' : ''}`} />
          </button>
          
          {isMonthSelectOpen && (
            <div 
              ref={monthDropdownRef}
              className="absolute top-full left-0 z-[9999] w-[140px] mt-1 bg-white border rounded-md shadow-md max-h-[200px] overflow-y-auto pointer-events-auto"
              role="listbox"
              onClick={handleDropdownClick}
              style={{ zIndex: 9999 }}
            >
              {months.map((month, index) => (
                <button
                  key={month}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-accent pointer-events-auto ${
                    index === currentMonth.getMonth() ? 'bg-muted' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMonthChange(index);
                  }}
                  type="button"
                  role="option"
                  aria-selected={index === currentMonth.getMonth()}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Year dropdown */}
        <div className="relative">
          <button
            ref={yearButtonRef}
            className="flex items-center justify-between w-[100px] h-10 px-3 py-2 text-sm border rounded-md bg-background pointer-events-auto"
            onClick={(e) => {
              e.stopPropagation();
              setIsYearSelectOpen(!isYearSelectOpen);
              setIsMonthSelectOpen(false);
            }}
            type="button"
            aria-haspopup="listbox"
            aria-expanded={isYearSelectOpen}
          >
            {currentMonth.getFullYear()}
            <ChevronRight className={`h-4 w-4 transition-transform ${isYearSelectOpen ? 'rotate-90' : ''}`} />
          </button>
          
          {isYearSelectOpen && (
            <div 
              ref={yearDropdownRef}
              className="absolute top-full left-0 z-[9999] w-[100px] mt-1 bg-white border rounded-md shadow-md max-h-[200px] overflow-y-auto pointer-events-auto"
              role="listbox"
              onClick={handleDropdownClick}
              style={{ zIndex: 9999 }}
            >
              {years.map((year) => (
                <button
                  key={year}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-accent pointer-events-auto ${
                    year === currentMonth.getFullYear() ? 'bg-muted' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleYearChange(year);
                  }}
                  type="button"
                  role="option"
                  aria-selected={year === currentMonth.getFullYear()}
                >
                  {year}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Create type-safe props for DayPicker
  let dayPickerProps: DayPickerProps;
  
  // Handle different modes correctly
  if (mode === "range") {
    dayPickerProps = {
      mode: "range",
      selected: selected as { from: Date | undefined; to: Date | undefined } | undefined,
      onSelect: onSelect as any,
      showOutsideDays,
      className: cn("p-3 pointer-events-auto", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",  // Hide default caption label as we're using custom selectors
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent h-9 w-9 pointer-events-auto",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 pointer-events-auto"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...(classNames || {}),
      },
      components: {
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        Caption: CustomCaption,
      },
      captionLayout: "buttons",
      month: currentMonth,
      onMonthChange: setCurrentMonth,
      ...props
    };
  } else if (mode === "multiple") {
    dayPickerProps = {
      mode: "multiple",
      selected: selected as Date[] | undefined,
      onSelect: onSelect as any,
      showOutsideDays,
      className: cn("p-3 pointer-events-auto", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent h-9 w-9 pointer-events-auto",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 pointer-events-auto"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...(classNames || {}),
      },
      components: {
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        Caption: CustomCaption,
      },
      captionLayout: "buttons",
      month: currentMonth,
      onMonthChange: setCurrentMonth,
      ...props
    };
  } else {
    // Default: single mode
    dayPickerProps = {
      mode: "single",
      selected: selected as Date | undefined,
      onSelect: onSelect as any,
      showOutsideDays,
      className: cn("p-3 pointer-events-auto", className),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "hidden",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 pointer-events-auto"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent h-9 w-9 pointer-events-auto",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100 pointer-events-auto"
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...(classNames || {}),
      },
      components: {
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
        Caption: CustomCaption,
      },
      captionLayout: "buttons",
      month: currentMonth,
      onMonthChange: setCurrentMonth,
      ...props
    };
  }

  return <DayPicker {...dayPickerProps} />;
}

Calendar.displayName = "Calendar";

export { Calendar };
