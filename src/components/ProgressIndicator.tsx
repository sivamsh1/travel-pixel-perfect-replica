
import React, { Fragment } from 'react';
import { cn } from '@/lib/utils';
import { Plane } from 'lucide-react';

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
      {steps.map((step, index) => (
        <Fragment key={step.id}>
          {/* Step with icon */}
          <div className="flex flex-col items-center">
            <div 
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center relative",
                currentStep === step.id 
                  ? "bg-primary text-white" 
                  : completedSteps.includes(step.id)
                    ? "bg-gray-200 text-primary"
                    : "bg-gray-200 text-gray-400"
              )}
            >
              {currentStep === step.id && (
                <Plane 
                  className="h-6 w-6 animate-bounce" 
                  style={{ transform: 'rotate(45deg)' }} 
                />
              )}
              {completedSteps.includes(step.id) && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-primary rounded-full"></div>
                </div>
              )}
            </div>
            <span 
              className={cn(
                "text-xs mt-2 font-medium",
                currentStep === step.id 
                  ? "text-primary" 
                  : completedSteps.includes(step.id)
                    ? "text-primary"
                    : "text-gray-500"
              )}
            >
              {step.name}
            </span>
          </div>
          
          {/* Line connector (except after last step) */}
          {index < steps.length - 1 && (
            <div 
              className={cn(
                "flex-grow h-1 mx-2",
                completedSteps.includes(step.id) 
                  ? "bg-primary" 
                  : "bg-gray-200"
              )}
            />
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
