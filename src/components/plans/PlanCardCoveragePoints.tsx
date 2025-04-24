
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PlanCardCoveragePointsProps {
  coveragePoints: string[];
}

const PlanCardCoveragePoints: React.FC<PlanCardCoveragePointsProps> = ({ coveragePoints }) => {
  const isMobile = useIsMobile();
  
  // Replace $ with ₹ in coveragePoints
  const formattedCoveragePoints = coveragePoints.map(point => 
    point.replace(/\$/g, '₹')
  );
  
  return (
    <div className={`flex mt-4 ${isMobile ? 'flex-wrap' : ''} gap-6 text-sm`}>
      <div className="bg-blue-50 p-1 px-2 rounded text-xs">
        Plan Benefits
      </div>
      
      {formattedCoveragePoints.map((point, index) => (
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
