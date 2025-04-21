
import React from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';

export interface PlanToCompare {
  id: string;
  name: string;
  provider: string;
  logo: string;
  price: string; // Added price property to fix type errors
  description: string;
}

interface ComparePopupProps {
  selectedPlans: PlanToCompare[];
  onClear: () => void;
  onRemove: (planId: string) => void;
}

const ComparePopup: React.FC<ComparePopupProps> = ({ 
  selectedPlans, 
  onClear,
  onRemove
}) => {
  const navigate = useNavigate();

  const handleCompare = () => {
    if (selectedPlans.length >= 2) {
      navigate('/compare', { state: { plans: selectedPlans } });
    }
  };

  if (selectedPlans.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50">
      <div className="flex justify-between items-center max-w-5xl mx-auto">
        <div className="flex-1 flex space-x-4">
          {selectedPlans.map((plan) => (
            <div key={plan.id} className="relative border border-gray-200 rounded-md p-3 flex-1">
              <button 
                onClick={() => onRemove(plan.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
              <div className="flex flex-col items-start">
                <div className="text-[#FF6B35] font-medium">{plan.name}</div>
                <div className="text-xs text-gray-500">{plan.description}</div>
              </div>
            </div>
          ))}
          
          {selectedPlans.length < 2 && (
            <div className="border border-dashed border-gray-300 rounded-md p-3 flex items-center justify-center flex-1 min-w-[200px]">
              <Plus size={20} className="text-primary" />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 ml-4">
          <Button 
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-gray-500"
          >
            Clear
          </Button>
          
          <Button
            size="sm"
            onClick={handleCompare}
            disabled={selectedPlans.length < 2}
            className={selectedPlans.length < 2 ? "opacity-50" : ""}
          >
            Compare
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComparePopup;
