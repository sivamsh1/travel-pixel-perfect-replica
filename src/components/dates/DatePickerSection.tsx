
import React from 'react';
import { format, differenceInDays, addDays, isAfter } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';

interface DatePickerSectionProps {
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  setDuration: (days: number) => void;
  duration: number;
}

const DatePickerSection = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setDuration,
  duration
}: DatePickerSectionProps) => {
  const [dateError, setDateError] = React.useState<string>('');
  const [startDateObj, setStartDateObj] = React.useState<Date | undefined>(startDate ? new Date(startDate) : undefined);
  const [endDateObj, setEndDateObj] = React.useState<Date | undefined>(endDate ? new Date(endDate) : undefined);

  const handleStartDateSelect = (date: Date | undefined) => {
    setStartDateObj(date);
    setDateError('');
    if (date) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      setStartDate(formattedDate);
      if (endDateObj) {
        if (isAfter(date, endDateObj)) {
          setEndDateObj(undefined);
          setEndDate('');
          setDuration(0);
        } else {
          const days = differenceInDays(endDateObj, date) + 1;
          if (days > 365) {
            setEndDateObj(undefined);
            setEndDate('');
            setDuration(0);
            setDateError('Trip duration cannot exceed 365 days');
          } else {
            setDuration(days);
          }
        }
      }
    } else {
      setStartDate('');
      setDuration(0);
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    setEndDateObj(date);
    setDateError('');
    if (date && startDateObj) {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const days = differenceInDays(date, startDateObj) + 1;
      if (days > 365) {
        setDateError('Trip duration cannot exceed 365 days');
        setEndDateObj(undefined);
        setEndDate('');
        setDuration(0);
        return;
      }
      if (days < 1) {
        setDateError('End date must be on or after start date');
        setEndDateObj(undefined);
        setEndDate('');
        setDuration(0);
        return;
      }
      setEndDate(formattedDate);
      setDuration(days);
    } else {
      setEndDate('');
      setDuration(0);
    }
  };

  const today = new Date();
  const maxEndDate = startDateObj ? addDays(startDateObj, 365) : undefined;

  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-2 gap-6">
        {/* Start Date Picker */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 mb-1">Start Date</span>
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn("flex h-12 items-center justify-between rounded-md border border-primary bg-background px-3 py-2 text-sm w-full", !startDateObj && "text-muted-foreground")}>
                {startDateObj ? format(startDateObj, "dd MMM yyyy") : <span className="text-muted-foreground">Select date</span>}
                <CalendarIcon className="h-5 w-5 ml-2 text-gray-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={startDateObj} onSelect={handleStartDateSelect} disabled={{
                before: today
              }} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
        </div>
        
        {/* End Date Picker */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-500 mb-1">End Date</span>
          <Popover>
            <PopoverTrigger asChild>
              <button className={cn("flex h-12 items-center justify-between rounded-md border border-primary bg-background px-3 py-2 text-sm w-full", !endDateObj && "text-muted-foreground", dateError && "border-destructive")}>
                {endDateObj ? format(endDateObj, "dd MMM yyyy") : <span className="text-muted-foreground">Select date</span>}
                <CalendarIcon className="h-5 w-5 ml-2 text-gray-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={endDateObj} onSelect={handleEndDateSelect} disabled={{
                before: startDateObj || today,
                after: maxEndDate
              }} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
          {dateError && <span className="text-sm text-destructive mt-1">{dateError}</span>}
        </div>
      </div>
    </div>
  );
};

export default DatePickerSection;
