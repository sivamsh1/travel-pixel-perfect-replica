
import React from 'react';

interface PlanCardCoveragePointsProps {
  coveragePoints: string[];
}

const PlanCardCoveragePoints: React.FC<PlanCardCoveragePointsProps> = ({ coveragePoints }) => {
  return (
    <div className="flex mt-4 gap-6 text-sm">
      <div className="bg-blue-50 p-1 px-2 rounded text-xs">
        Plan Benefits
      </div>
      
      {coveragePoints.map((point, index) => (
        <div key={index} className="text-xs text-gray-600">
          {point}
        </div>
      ))}
      
      <div className="text-primary text-xs">
        View All →
      </div>
    </div>
  );
};

export default PlanCardCoveragePoints;
