
import React, { useRef, useLayoutEffect } from "react";
import { format, isValid } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface TravellerDateOfBirthProps {
  index: number;
  dob?: string;
  name?: string;
  age?: string;
  handleDateChange: (index: number, date: Date | undefined) => void;
  updateTraveller: (index: number, details: { dob?: string; name?: string; age?: string }) => void;
  error?: string;
  nameError?: string;
}

const TravellerDateOfBirth: React.FC<TravellerDateOfBirthProps> = ({
  index,
  dob,
  name,
  age,
  handleDateChange,
  updateTraveller,
  error,
  nameError,
}) => {
  const dateValue = dob ? new Date(dob) : undefined;

  // Auto-resize the name input box horizontally
  const nameInputRef = useRef<HTMLInputElement>(null);
  const mirrorRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (nameInputRef.current && mirrorRef.current) {
      const minWidth = 240; // px, matching DOB input
      mirrorRef.current.textContent = name || "";
      // +2ch to always leave some space for the cursor
      const width = Math.max(minWidth, mirrorRef.current.offsetWidth + 30);
      nameInputRef.current.style.width = width + "px";
    }
  }, [name]);

  return (
    <div className="flex gap-4 flex-col md:flex-row">
      {/* Name input */}
      <div className="flex-1 min-w-[240px] max-w-[320px] relative">
        <input
          ref={nameInputRef}
          type="text"
          className={cn(
            "p-3 h-12 rounded-md border border-primary bg-background text-base font-normal w-full transition-all overflow-x-auto",
            nameError
              ? "border-destructive focus:ring-destructive"
              : "focus:ring-2 focus:ring-primary",
            "resize-none"
          )}
          style={{ boxSizing: "content-box" }}
          placeholder={`Traveller ${index + 1} Name`}
          value={name || ""}
          autoComplete="off"
          onChange={e => updateTraveller(index, { name: e.target.value })}
          spellCheck="false"
        />
        {/* Hidden mirror span for width calculation */}
        <span
          ref={mirrorRef}
          className="absolute left-[-9999px] top-[-9999px] whitespace-pre px-3 py-3 text-base font-normal font-jost"
          aria-hidden="true"
        />
        {nameError && (
          <p className="text-sm font-medium text-destructive mt-1">{nameError}</p>
        )}
      </div>
      {/* DOB input */}
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
              onSelect={date => handleDateChange(index, date)}
              disabled={date =>
                date > new Date() || date < new Date("1900-01-01")
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
      {/* Age */}
      <div className="w-1/3 min-w-[80px]">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-12"
          placeholder={`T ${index + 1} Age`}
          value={age || ''}
          onChange={e => updateTraveller(index, { age: e.target.value })}
          readOnly
        />
      </div>
    </div>
  );
};

export default TravellerDateOfBirth;
