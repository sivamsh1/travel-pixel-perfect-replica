
import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface TravellerCountProps {
  travellersCount: number;
  handleDecrease: () => void;
  handleIncrease: () => void;
}

const TravellerCount: React.FC<TravellerCountProps> = ({
  travellersCount,
  handleDecrease,
  handleIncrease
}) => {
  return (
    <div className="flex border border-gray-300 rounded-md overflow-hidden">
      <button 
        className="p-4 hover:bg-gray-100 flex items-center justify-center"
        onClick={handleDecrease}
        aria-label="decrement"
        type="button"
      >
        <Minus className="h-4 w-4" />
      </button>
      <div className="flex-1 flex items-center justify-center text-xl">
        {travellersCount.toString().padStart(2, '0')}
      </div>
      <button 
        className="p-4 hover:bg-gray-100 flex items-center justify-center"
        onClick={handleIncrease}
        aria-label="increment"
        type="button"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default TravellerCount;
