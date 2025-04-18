
import { format, parse, isValid } from 'date-fns';

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

/**
 * Format a DOB string to DD/MM/YYYY format for API
 * @param dobStr Date string in any format
 * @returns Formatted DOB string or fallback value
 */
export const formatDOBForAPI = (dobStr?: string): string => {
  if (!dobStr) return '17/08/1997'; // Default fallback
  
  try {
    // Handle ISO format
    if (dobStr.includes('-')) {
      const parsedDate = parse(dobStr, 'yyyy-MM-dd', new Date());
      return format(parsedDate, 'dd/MM/yyyy');
    }
    
    // If already in correct format, return as is
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dobStr)) {
      return dobStr;
    }
    
    // Try parsing as ISO string
    const date = new Date(dobStr);
    if (isValid(date)) {
      return format(date, 'dd/MM/yyyy');
    }
    
    throw new Error('Invalid date format');
  } catch (error) {
    console.error('Error formatting DOB:', error);
    return '17/08/1997'; // Fallback value
  }
};
