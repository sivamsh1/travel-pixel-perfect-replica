
import React from 'react';
import { cn } from '@/lib/utils';
import { Airplane } from 'lucide-react';

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
        <React.Fragment key={step.id}>
          {/* Step with icon */}
          <div className="flex flex-col items-center">
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                (currentStep === step.id || completedSteps.includes(step.id)) 
                  ? "bg-primary text-white" 
                  : "bg-gray-300 text-gray-400"
              )}
            >
              {(currentStep === step.id || completedSteps.includes(step.id)) && index === 0 ? (
                <Airplane className="h-4 w-4" />
              ) : null}
            </div>
            <span 
              className={cn(
                "text-xs mt-2",
                (currentStep === step.id || completedSteps.includes(step.id)) 
                  ? "text-primary font-medium" 
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
                "flex-grow h-0.5 mx-2",
                completedSteps.includes(step.id) ? "bg-primary" : "bg-gray-300"
              )}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
