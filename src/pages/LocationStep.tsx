
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import BackButton from '@/components/BackButton';
import ProgressIndicator from '@/components/ProgressIndicator';
import ActionButton from '@/components/ActionButton';
import { useTravelForm } from '@/context/TravelFormContext';
import { ChevronDown, Search, Loader2 } from 'lucide-react';
import { 
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useDebounce } from '@/hooks/useDebounce';
import { useToast } from '@/hooks/use-toast';

interface Country {
  _id: string;
  name: string;
  continent: string;
}

const steps = [
  { id: 1, name: "Trip Details" },
  { id: 2, name: "Choose Plan" },
  { id: 3, name: "Choose Add-Ons" },
  { id: 4, name: "Travellers Details" },
  { id: 5, name: "Review & Pay" }
];

const LocationStep = () => {
  const navigate = useNavigate();
  const { region, setRegion, destination, setDestination } = useTravelForm();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(destination);
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  // Debounce search input to avoid excessive API calls
  const debouncedValue = useDebounce<string>(inputValue, 300);

  // Reset active index when countries list changes
  useEffect(() => {
    setActiveIndex(-1);
  }, [countries]);

  // Fetch countries when input changes
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
        
        const data = await response.json();
        setCountries(data.result || []);
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
  }, [debouncedValue, toast]);

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
          setDestination(selectedCountry.name);
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

  const handleNext = () => {
    // Validation removed
    navigate('/dates');
  };

  return (
    <Layout>
      <div className="px-6 md:px-12">
        <BackButton />
        <ProgressIndicator steps={steps} currentStep={1} completedSteps={[]} />
      </div>
      
      <div className="flex flex-1 flex-col items-center px-6">
        <h2 className="text-3xl font-bold mb-4">Where are you travelling to?</h2>
        <p className="text-gray-600 mb-8 text-center max-w-2xl">
          Overseas Travel Insurance is only valid for Indian passport holders, commencing their journey from India.*
        </p>
        
        <div className="w-full max-w-md space-y-4">
          <div className="relative">
            <select
              className="w-full p-3 border border-gray-300 rounded-md appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="" disabled>Travel Region</option>
              <option value="Student Overseas | Excluding USA and CANADA">Student Overseas | Excluding USA and CANADA</option>
              <option value="Student Overseas | Including USA and CANADA (Worldwide)">Student Overseas | Including USA and CANADA (Worldwide)</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          
          <div className="relative w-full">
            <Input
              ref={inputRef}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10"
              placeholder="Destination*"
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
            <div className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none">
              {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
            </div>

            {open && inputValue.length >= 2 && (
              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
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
                        setDestination(country.name);
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
          
          <div className="pt-4">
            <ActionButton
              onClick={handleNext}
              className="w-full"
            >
              NEXT
            </ActionButton>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LocationStep;
