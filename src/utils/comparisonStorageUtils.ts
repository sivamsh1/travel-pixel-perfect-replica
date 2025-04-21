
export interface ComparisonPlan {
  id: string;
  name: string;
  provider: string;
  logo: string;
  price: string;
  description: string;
}

const COMPARISON_STORAGE_KEY = 'comparison_selected_plans';

export function saveComparisonPlans(plans: ComparisonPlan[]) {
  try {
    localStorage.setItem(COMPARISON_STORAGE_KEY, JSON.stringify(plans));
  } catch (e) {
    console.error('Failed to save comparison plans', e);
  }
}

export function getComparisonPlans(): ComparisonPlan[] {
  try {
    const data = localStorage.getItem(COMPARISON_STORAGE_KEY);
    return data ? JSON.parse(data) as ComparisonPlan[] : [];
  } catch (e) {
    console.error('Failed to get comparison plans', e);
    return [];
  }
}

export function clearComparisonPlans() {
  try {
    localStorage.removeItem(COMPARISON_STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear comparison plans', e);
  }
}
