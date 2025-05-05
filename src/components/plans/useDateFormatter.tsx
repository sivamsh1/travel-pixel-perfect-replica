
import { format, parse, isValid } from 'date-fns';
import { getFromLocalStorage } from '@/utils/localStorageUtils';

export const useDateFormatter = () => {
  // Get data from localStorage for display
  const storageData = getFromLocalStorage();
  
  // Use dates from localStorage if available
  const effectiveStartDate = storageData?.dates?.startDate || '';
  const effectiveEndDate = storageData?.dates?.endDate || '';
  
  // Add safe date formatting with error handling
  let formattedStartDate = '';
  let formattedEndDate = '';
  
  try {
    if (effectiveStartDate) {
      const parsedDate = parse(effectiveStartDate, 'yyyy-MM-dd', new Date());
      if (isValid(parsedDate)) {
        formattedStartDate = format(parsedDate, 'do MMM');
      }
    }
  } catch (error) {
    console.error('Error formatting start date:', error);
  }
  
  try {
    if (effectiveEndDate) {
      const parsedDate = parse(effectiveEndDate, 'yyyy-MM-dd', new Date());
      if (isValid(parsedDate)) {
        formattedEndDate = format(parsedDate, 'do MMM');
      }
    }
  } catch (error) {
    console.error('Error formatting end date:', error);
  }

  return { formattedStartDate, formattedEndDate };
};
