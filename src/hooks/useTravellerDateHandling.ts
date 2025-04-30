
import { format } from 'date-fns';
import { ValidationErrors } from '@/utils/travellerValidator';

export const useTravellerDateHandling = (updateTraveller: (index: number, details: any) => void, errors: ValidationErrors, setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>) => {

  const handleDateChange = (index: number, date: Date | undefined) => {
    if (date) {
      const formattedDOB = format(date, 'dd/MM/yyyy');
      updateTraveller(index, { dob: formattedDOB });

      if (errors[`traveller${index}Dob`]) {
        const newErrors = { ...errors };
        delete newErrors[`traveller${index}Dob`];
        setErrors(newErrors);
      }
    }
  };

  return { handleDateChange };
};
