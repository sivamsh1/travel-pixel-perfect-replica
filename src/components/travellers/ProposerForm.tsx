import React from 'react';
import { ProposerDetails } from '@/context/TravelFormContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ProposerFormProps {
  proposer: ProposerDetails;
  updateProposer: (details: Partial<ProposerDetails>) => void;
  errors: { [key: string]: string };
}

const ProposerForm: React.FC<ProposerFormProps> = ({
  proposer,
  updateProposer,
  errors
}) => {
  const proposerTypes = [
    "Self", "Spouse", "Father", "Mother", "Son", "Daughter", "Group Manager", "Employee"
  ];

  const salutations = ["Mr", "Ms", "Mrs", "Dr"];
  const maritalStatuses = ["Single", "Married", "Widowed", "Divorced"];
  const genderOptions = ["Male", "Female", "Other"];

  const handleSalutationChange = (value: string) => {
    let gender = proposer.gender;
    if (value === "Mr") {
      gender = "Male";
    } else if (value === "Mrs" || value === "Ms") {
      gender = "Female";
    }
    
    updateProposer({ 
      salutation: value,
      gender: gender
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    updateProposer({ name: value });
  };

  return (
    <div className="mb-12">
      <h3 className="text-xl font-medium mb-6">Proposer Details</h3>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Proposer</label>
        <Select 
          value={proposer.type || "Self"} 
          onValueChange={(value) => updateProposer({ type: value })}
        >
          <SelectTrigger className="w-1/4 h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <SelectValue placeholder="Select proposer" />
          </SelectTrigger>
          <SelectContent>
            {proposerTypes.map(type => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {proposer.type && proposer.type !== "Self" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <Select 
              value={proposer.salutation} 
              onValueChange={handleSalutationChange}
            >
              <SelectTrigger className="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Select Title" />
              </SelectTrigger>
              <SelectContent>
                {salutations.map(salutation => (
                  <SelectItem key={salutation} value={salutation}>
                    {salutation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["proposerSalutation"] && (
              <p className="text-sm font-medium text-destructive mt-1">{errors["proposerSalutation"]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className={`w-full p-3 border ${errors["proposerName"] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              value={proposer.name || ''}
              onChange={handleNameChange}
            />
            {errors["proposerName"] && (
              <p className="text-sm font-medium text-destructive mt-1">{errors["proposerName"]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <Select 
              value={proposer.gender} 
              onValueChange={(value) => updateProposer({ gender: value })}
            >
              <SelectTrigger className="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {genderOptions.map(gender => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["proposerGender"] && (
              <p className="text-sm font-medium text-destructive mt-1">{errors["proposerGender"]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marital Status</label>
            <Select 
              value={proposer.maritalStatus} 
              onValueChange={(value) => updateProposer({ maritalStatus: value })}
            >
              <SelectTrigger className="w-full h-12 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent>
                {maritalStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors["proposerMaritalStatus"] && (
              <p className="text-sm font-medium text-destructive mt-1">{errors["proposerMaritalStatus"]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
            <input
              type="text"
              className={`w-full p-3 border ${errors["proposerOccupation"] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              value={proposer.occupation || ''}
              onChange={(e) => updateProposer({ occupation: e.target.value })}
            />
            {errors["proposerOccupation"] && (
              <p className="text-sm font-medium text-destructive mt-1">{errors["proposerOccupation"]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passport Number</label>
            <input
              type="text"
              className={`w-full p-3 border ${errors["proposerPassport"] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              value={proposer.passportNumber || ''}
              onChange={(e) => updateProposer({ passportNumber: e.target.value.slice(0, 10) })}
              maxLength={10}
            />
            {errors["proposerPassport"] && (
              <p className="text-sm font-medium text-destructive mt-1">{errors["proposerPassport"]}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Communication Address</label>
            <input
              type="text"
              className={`w-full p-3 border ${errors["proposerCommAddress"] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              value={proposer.communicationAddress || ''}
              onChange={(e) => updateProposer({ communicationAddress: e.target.value })}
            />
            {errors["proposerCommAddress"] && (
              <p className="text-sm font-medium text-destructive mt-1">{errors["proposerCommAddress"]}</p>
            )}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Permanent Address</label>
            <input
              type="text"
              className={`w-full p-3 border ${errors["proposerPermAddress"] ? 'border-destructive' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-primary`}
              value={proposer.permanentAddress || ''}
              onChange={(e) => updateProposer({ permanentAddress: e.target.value })}
            />
            {errors["proposerPermAddress"] && (
              <p className="text-sm font-medium text-destructive mt-1">{errors["proposerPermAddress"]}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProposerForm;
