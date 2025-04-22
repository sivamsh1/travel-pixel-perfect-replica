import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface Country {
  _id: string;
  name: string;
  continent: string;
}

interface CountrySearchProps {
  initialValue: string;
  onSelect: (country: string, countryId: string) => void;
  excludeCountries?: string[]; // NEW
}

const CountrySearch = ({ initialValue, onSelect, excludeCountries = [] }: CountrySearchProps) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const debouncedValue = useDebounce<string>(inputValue, 300);

  useEffect(() => {
    setActiveIndex(-1);
  }, [countries]);

  useEffect(() => {
    const fetchCountries = async () => {
      if (debouncedValue.length < 2) {
        setCountries([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://gyaantree.com/api/travel/v1/area-search/countries?search=${encodeURIComponent(debouncedValue)}`
        );
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        let data = await response.json();
        let results: Country[] = data.result || [];
        if (excludeCountries.length > 0) {
          const exclusions = excludeCountries.map(e => e.trim().toLowerCase());
          results = results.filter(
            c => !exclusions.includes(c.name.trim().toLowerCase())
          );
        }
        setCountries(results);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
        toast({
          title: "Error",
          description: "Failed to fetch country suggestions. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, [debouncedValue, toast, excludeCountries]);

  useEffect(() => {
    if (
      inputValue &&
      excludeCountries.some(
        ec => ec.trim().toLowerCase() === inputValue.trim().toLowerCase()
      )
    ) {
      setInputValue('');
      onSelect('', '');
    }
    // eslint-disable-next-line
  }, [excludeCountries]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!open || countries.length === 0) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => (prev < countries.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : countries.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < countries.length) {
          const selectedCountry = countries[activeIndex];
          setInputValue(selectedCountry.name);
          onSelect(selectedCountry.name, selectedCountry._id);
          setOpen(false);
          inputRef.current?.blur();
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        className={cn(
          "w-full rounded-md focus:outline-none focus:ring-2 pr-10",
          inputValue ? "border-primary focus:ring-primary" : "border-primary border-opacity-50 focus:ring-primary"
        )}
        placeholder="Country*"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          if (e.target.value.length >= 2 && !open) {
            setOpen(true);
          }
        }}
        onFocus={() => {
          if (inputValue.length >= 2) {
            setOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none">
        {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
      </div>

      {open && inputValue.length >= 2 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-primary rounded-md shadow-lg max-h-60 overflow-y-auto">
          {countries.length === 0 && !isLoading && (
            <div className="py-3 px-4 text-gray-500 text-center">
              No countries found
            </div>
          )}
          {isLoading && (
            <div className="py-3 px-4 text-gray-500 text-center">
              Loading...
            </div>
          )}
          <ul>
            {countries.map((country, index) => (
              <li
                key={country._id}
                className={`px-4 py-3 cursor-pointer flex justify-between items-center hover:bg-gray-100 ${
                  index === activeIndex ? 'bg-gray-100' : ''
                }`}
                onClick={() => {
                  setInputValue(country.name);
                  onSelect(country.name, country._id);
                  setOpen(false);
                }}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="text-gray-800">{country.name}</span>
                <span className="text-xs text-gray-400">
                  {country.continent}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
