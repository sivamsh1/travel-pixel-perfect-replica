import { TravellerDetail, NomineeData, ProposerData } from '@/utils/localStorageUtils';
import { isValidEmail, isValidPhone } from '@/utils/validationUtils';
import { toast } from "@/components/ui/use-toast";

export interface ValidationErrors {
  [key: string]: string;
}

export const validateTraveller = (traveller: TravellerDetail, index: number, errors: ValidationErrors = {}): ValidationErrors => {
  const newErrors = { ...errors };
  
  // Validate salutation
  if (!traveller.salutation) {
    newErrors[`traveller${index}Salutation`] = "Salutation is required";
  }
  
  // Validate forename
  if (!traveller.forename) {
    newErrors[`traveller${index}Forename`] = "Forename is required";
  } else if (traveller.forename.length < 2) {
    newErrors[`traveller${index}Forename`] = "Forename should be at least 2 characters";
  } else if (!/^[a-zA-Z\s]+$/.test(traveller.forename)) {
    newErrors[`traveller${index}Forename`] = "Forename should only contain letters";
  }
  
  // Validate lastname
  if (!traveller.lastname) {
    newErrors[`traveller${index}Lastname`] = "Lastname is required";
  } else if (traveller.lastname.length < 2) {
    newErrors[`traveller${index}Lastname`] = "Lastname should be at least 2 characters";
  } else if (!/^[a-zA-Z\s]+$/.test(traveller.lastname)) {
    newErrors[`traveller${index}Lastname`] = "Lastname should only contain letters";
  }
  
  // Validate gender
  if (!traveller.gender) {
    newErrors[`traveller${index}Gender`] = "Gender is required";
  }

  // Validate passport
  if (!traveller.passportNumber) {
    newErrors[`traveller${index}Passport`] = "Passport number is required";
  } else if (traveller.passportNumber.length !== 10) {
    newErrors[`traveller${index}Passport`] = "Passport number must be exactly 10 characters";
  }
  
  // Validate DOB
  if (!traveller.dob) {
    newErrors[`traveller${index}Dob`] = "Date of birth is required";
  }
  
  // Validate mobile number
  if (traveller.mobileNo && !/^\d{10}$/.test(traveller.mobileNo)) {
    newErrors[`traveller${index}Mobile`] = "Mobile number should be exactly 10 digits";
  }
  
  if (traveller.email && !isValidEmail(traveller.email)) {
    newErrors[`traveller${index}Email`] = "Please enter a valid email address";
  }
  
  // Validate pincode
  if (traveller.pincode && !/^\d{6}$/.test(traveller.pincode)) {
    newErrors[`traveller${index}Pincode`] = "Pincode should be exactly 6 digits";
  }

  // Validate pre-existing medical condition selection
  if (traveller.hasPreExistingCondition === undefined) {
    newErrors[`traveller${index}MedicalCondition`] = "Please indicate if the traveller has a pre-existing medical condition";
  }
  
  // If yes is selected, ensure a condition is selected
  if (traveller.hasPreExistingCondition === true && !traveller.medicalCondition) {
    newErrors[`traveller${index}MedicalConditionType`] = "Please select a medical condition";
  }

  return newErrors;
};

export const validateNominee = (nominee: NomineeData, errors: ValidationErrors = {}): ValidationErrors => {
  const newErrors = { ...errors };
  
  // Validate nominee name
  if (!nominee.name) {
    newErrors.nomineeName = "Nominee name is required";
  } else if (nominee.name.trim().length < 2) {
    newErrors.nomineeName = "Nominee name should be at least 2 characters";
  } else if (!/^[a-zA-Z\s]+$/.test(nominee.name)) {
    newErrors.nomineeName = "Nominee name should only contain letters";
  }
  
  // Make nominee relationship required
  if (!nominee.relationship) {
    newErrors.nomineeRelationship = "Nominee relationship is required";
  }
  
  // DOB validation (existing)
  if (!nominee.dob) {
    newErrors.nomineeDob = "Nominee date of birth is required";
  }
  
  return newErrors;
};

export const validateProposer = (proposer: ProposerData, errors: ValidationErrors = {}): ValidationErrors => {
  const newErrors = { ...errors };
  
  if (proposer.type && proposer.type !== "Self") {
    if (!proposer.name) {
      newErrors.proposerName = "Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(proposer.name)) {
      newErrors.proposerName = "Name should only contain letters";
    }
    
    if (!proposer.gender) {
      newErrors.proposerGender = "Gender is required";
    }
    
    if (!proposer.salutation) {
      newErrors.proposerSalutation = "Salutation is required";
    }
    
    if (!proposer.maritalStatus) {
      newErrors.proposerMaritalStatus = "Marital status is required";
    }
    
    if (proposer.passportNumber && proposer.passportNumber.length !== 10) {
      newErrors.proposerPassport = "Passport number must be exactly 10 characters";
    }
  }
  
  return newErrors;
};

export const validateForm = (travellers: TravellerDetail[], nominee: NomineeData, proposer: ProposerData): ValidationErrors => {
  let errors: ValidationErrors = {};
  
  // Validate all travellers
  travellers.forEach((traveller, index) => {
    errors = validateTraveller(traveller, index, errors);
  });
  
  // Validate nominee
  errors = validateNominee(nominee, errors);
  
  // Validate proposer
  errors = validateProposer(proposer, errors);
  
  // If we have errors, show a specific error message instead of a generic one
  if (Object.keys(errors).length > 0) {
    // Get the first few error messages to display
    const errorMessages = Object.values(errors).slice(0, 3);
    const hasMoreErrors = Object.values(errors).length > 3;
    
    let description = errorMessages.join('\n');
    if (hasMoreErrors) {
      description += `\n... and ${Object.values(errors).length - 3} more issues`;
    }
    
    toast({
      title: "Please fix the following issues:",
      description: description,
      variant: "destructive"
    });
  }
  
  return errors;
};
