
import { format, differenceInDays, addDays, parse } from 'date-fns';

export const calculateDateDuration = (startDateStr: string, endDateStr: string): number => {
  try {
    const startDate = parse(startDateStr, 'yyyy-MM-dd', new Date());
    const endDate = parse(endDateStr, 'yyyy-MM-dd', new Date());
    
    return differenceInDays(endDate, startDate);
  } catch (error) {
    console.error('Error calculating date duration:', error);
    return 0;
  }
};

export const getDefaultEndDate = (startDateStr: string, defaultDays = 10): string => {
  try {
    const startDate = parse(startDateStr, 'yyyy-MM-dd', new Date());
    const endDate = addDays(startDate, defaultDays);
    return format(endDate, 'yyyy-MM-dd');
  } catch (error) {
    console.error('Error calculating default end date:', error);
    return '';
  }
};

export const isEndDateValid = (startDateStr: string, endDateStr: string): boolean => {
  try {
    const startDate = parse(startDateStr, 'yyyy-MM-dd', new Date());
    const endDate = parse(endDateStr, 'yyyy-MM-dd', new Date());
    
    return endDate >= startDate;
  } catch (error) {
    console.error('Error validating end date:', error);
    return false;
  }
};
