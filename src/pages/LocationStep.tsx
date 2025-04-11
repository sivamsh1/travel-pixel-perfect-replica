
import React, { useState, useEffect } from 'react';
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
  
  // Debounce search input to avoid excessive API calls
  const debouncedValue = useDebounce<string>(inputValue, 300);

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
        const data = await response.json();
        setCountries(data.result || []);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setCountries([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, [debouncedValue]);

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
          
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Input
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Destination*"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (!open) setOpen(true);
                  }}
                />
                <div className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none">
                  {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 max-w-[300px] md:max-w-md" align="start">
              <Command>
                <CommandList>
                  <CommandEmpty>
                    {isLoading ? "Loading..." : "No countries found"}
                  </CommandEmpty>
                  <CommandGroup>
                    {countries.map((country) => (
                      <CommandItem
                        key={country._id}
                        onSelect={() => {
                          setInputValue(country.name);
                          setDestination(country.name);
                          setOpen(false);
                        }}
                      >
                        <span>{country.name}</span>
                        <span className="ml-auto text-xs text-gray-400">
                          {country.continent}
                        </span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          
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
