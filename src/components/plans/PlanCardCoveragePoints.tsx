
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanCardCoveragePointsProps {
  coveragePoints: string[];
}

const PlanCardCoveragePoints: React.FC<PlanCardCoveragePointsProps> = ({ coveragePoints }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  // Show first 3 items initially
  const initialItems = coveragePoints.slice(0, 3);
  const remainingItems = coveragePoints.slice(3);
  
  // Replace $ with ₹ in coveragePoints
  const formatPoint = (point: string) => point.replace(/\$/g, '₹');
  
  return (
    <div className="relative mt-4">
      <div className="flex flex-wrap gap-2">
        <div className="bg-blue-50 px-3 py-1 rounded text-xs">
          Plan Benefits
        </div>
        
        {/* Initial items always visible */}
        {initialItems.map((point, index) => (
          <div
            key={index}
            className="text-xs text-gray-600 px-3 py-1 border border-gray-200 rounded-full"
          >
            {formatPoint(point)}
          </div>
        ))}
      </div>

      {/* Expandable section */}
      {coveragePoints.length > 3 && (
        <>
          <div
            className={cn(
              "flex flex-wrap gap-2 mt-2 overflow-hidden transition-all duration-300",
              isExpanded ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"
            )}
          >
            {remainingItems.map((point, index) => (
              <div
                key={index}
                className="text-xs text-gray-600 px-3 py-1 border border-gray-200 rounded-full"
              >
                {formatPoint(point)}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-primary text-xs mt-2 hover:underline"
          >
            {isExpanded ? (
              <>
                View Less
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View More
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default PlanCardCoveragePoints;
