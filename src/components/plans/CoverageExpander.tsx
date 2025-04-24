
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from "@/lib/utils";

interface CoveragePoint {
  text: string;
  amount: string;
}

interface CoverageExpanderProps {
  coveragePoints: CoveragePoint[];
}

const CoverageExpander: React.FC<CoverageExpanderProps> = ({ coveragePoints }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialPoints = coveragePoints.slice(0, 3);
  const remainingPoints = coveragePoints.slice(3);

  return (
    <div className="space-y-3">
      {/* Initial points in single line */}
      <div className="flex items-center gap-2 text-sm text-gray-600 flex-wrap">
        {initialPoints.map((point, index) => (
          <React.Fragment key={index}>
            <span>{point.text}</span>
            {index < initialPoints.length - 1 && (
              <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Expandable section */}
      {coveragePoints.length > 3 && (
        <div className="space-y-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 text-sm hover:text-blue-600 flex items-center gap-1"
          >
            {isExpanded ? (
              <>View Less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>View More <ChevronDown className="h-4 w-4" /></>
            )}
          </button>

          <div className={cn(
            "grid gap-2 transition-all duration-300 ease-in-out",
            isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}>
            <div className="overflow-hidden">
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                {remainingPoints.map((point, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{point.text}</span>
                    <span className="text-gray-400">₹{point.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverageExpander;
