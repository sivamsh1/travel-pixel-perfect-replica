
import React from 'react';
import { NomineeDetails } from '@/context/TravelFormContext';

interface NomineeFormProps {
  nominee: NomineeDetails;
  updateNominee: (details: Partial<NomineeDetails>) => void;
}

const NomineeForm: React.FC<NomineeFormProps> = ({
  nominee,
  updateNominee
}) => {
  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium mb-6">Nominee Details</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Name</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={nominee.name || ''}
            onChange={(e) => updateNominee({ name: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nominee Relationship</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={nominee.relationship || ''}
            onChange={(e) => updateNominee({ relationship: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
};

export default NomineeForm;
