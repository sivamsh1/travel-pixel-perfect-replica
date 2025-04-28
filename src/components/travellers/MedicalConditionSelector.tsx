
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TravellerDetails } from '@/context/TravelFormContext';

interface MedicalConditionSelectorProps {
  traveller: TravellerDetails;
  updateTraveller: (index: number, details: Partial<TravellerDetails>) => void;
  travellerIndex: number;
}

const medicalConditions = [
  "Cardiac ailments",
  "Cancer / Leukemia / Malignant Tumor",
  "Kidney Ailment",
  "Liver Disease",
  "COPD",
  "HIV / AIDS",
  "Thalassemia",
  "Neurological Disorder / Stroke / Paralysis",
  "Insulin Dependent Diabetes"
];

const MedicalConditionSelector: React.FC<MedicalConditionSelectorProps> = ({
  traveller,
  updateTraveller,
  travellerIndex
}) => {
  return (
    <div className="mb-8 space-y-4">
      <div>
        <div className="text-base font-medium mb-2">Does the traveller have a pre-existing medical condition?</div>
        <div className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="medical-yes" 
              checked={traveller?.hasPreExistingCondition === true}
              onCheckedChange={() => updateTraveller(travellerIndex, { 
                hasPreExistingCondition: true,
                medicalCondition: traveller.medicalCondition || undefined 
              })}
            />
            <label htmlFor="medical-yes" className="text-sm text-gray-700">Yes</label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="medical-no" 
              checked={traveller?.hasPreExistingCondition === false}
              onCheckedChange={() => updateTraveller(travellerIndex, { 
                hasPreExistingCondition: false,
                medicalCondition: undefined 
              })}
            />
            <label htmlFor="medical-no" className="text-sm text-gray-700">No</label>
          </div>
        </div>
      </div>

      {traveller?.hasPreExistingCondition && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            PED: Cardiac ailments, Cancer / Leukemia / Malignant Tumor, Kidney Ailment, Liver Disease, COPD, HIV / AIDS, Thalassemia, Neurological Disorder / Stroke / Paralysis, Insulin Dependent Diabetes
          </label>
          <Select 
            value={traveller.medicalCondition} 
            onValueChange={(value) => updateTraveller(travellerIndex, { medicalCondition: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select medical condition" />
            </SelectTrigger>
            <SelectContent>
              {medicalConditions.map((condition) => (
                <SelectItem key={condition} value={condition}>
                  {condition}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default MedicalConditionSelector;
