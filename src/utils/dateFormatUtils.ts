
import { format, parse } from 'date-fns';

/**
 * Format a date string from ISO format (YYYY-MM-DD) to DD/MM/YYYY
 * @param dateStr ISO date string
 * @returns Formatted date string or empty string on error
 */
export const formatDateForAPI = (dateStr?: string): string => {
  if (!dateStr) return '';
  
  try {
    const parsedDate = parse(dateStr, 'yyyy-MM-dd', new Date());
    return format(parsedDate, 'dd/MM/yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};
