
import { format, isValid, differenceInYears } from 'date-fns';
import { TravellerDetail } from '@/utils/localStorageUtils';

export const formatDOBtoDDMMYYYY = (date?: Date): string => {
  if (!date) return '';
  return format(date, 'dd/MM/yyyy');
};

export const parseDOB = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
  
  const date = new Date(dateString);
  return !isNaN(date.getTime()) ? date : undefined;
};

export const calculateAge = (dob?: string): number | null => {
  if (!dob) return null;
  
  try {
    const date = parseDOB(dob);
    if (!date) return null;
    
    return differenceInYears(new Date(), date);
  } catch (e) {
    console.error("Error calculating age:", e);
    return null;
  }
};
