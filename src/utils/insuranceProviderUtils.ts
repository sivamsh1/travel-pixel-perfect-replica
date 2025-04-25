
import { InsuranceProvider } from './apiTypes';

/**
 * Determine the insurance provider from the plan name
 * @param planName The selected plan name
 * @returns The insurance provider
 */
export const determineProvider = (planName?: string): InsuranceProvider => {
  if (!planName) return 'Reliance';
  
  const planNameLower = planName.toLowerCase();
  
  if (planNameLower.includes('godigit') || planNameLower.includes('go digit')) {
    return 'GoDigit';
  }
  if (planNameLower.includes('bajaj')) {
    return 'Bajaj';
  }
  if (planNameLower.includes('care')) {
    return 'Care';
  }
  
  return 'Reliance';
};
