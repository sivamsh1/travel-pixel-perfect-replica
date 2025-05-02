
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckIcon, Plane } from 'lucide-react';

interface Step {
  id: number;
  name: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
}

const ProgressIndicator = ({ steps, currentStep, completedSteps }: ProgressIndicatorProps) => {
  return (
    <div className="flex items-center justify-center w-full max-w-3xl mx-auto mt-8 mb-12">
      <div className="w-full relative">
        {/* Main horizontal line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200" />
        
        {/* Steps container */}
        <div className="flex justify-between relative">
          {steps.map((step) => {
            const isCompleted = completedSteps.includes(step.id);
            const isActive = currentStep === step.id;
            const isLast = step.id === steps.length;
            
            return (
              <div 
                key={step.id} 
                className="flex flex-col items-center"
              >
                {/* Step circle */}
                <div 
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center relative z-10",
                    isActive 
                      ? "bg-white border border-primary" 
                      : isCompleted
                        ? "bg-primary"
                        : "bg-gray-200 border border-gray-200"
                  )}
                >
                  {isCompleted && (
                    <CheckIcon className="h-4 w-4 text-white" />
                  )}
                </div>
                
                {/* Plane indicator for current step */}
                {isActive && (
                  <div className="absolute top-3.5 transform translate-y-px">
                    <Plane 
                      className="h-5 w-5 text-primary" 
                      style={{ transform: 'rotate(90deg)' }}
                    />
                  </div>
                )}
                
                {/* Step label */}
                <span 
                  className={cn(
                    "text-sm mt-2 text-center",
                    isActive 
                      ? "text-primary font-medium" 
                      : isCompleted
                        ? "text-primary"
                        : "text-gray-400"
                  )}
                >
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
