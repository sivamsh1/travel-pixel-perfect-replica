
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
  }
  
  // Validate lastname
  if (!traveller.lastname) {
    newErrors[`traveller${index}Lastname`] = "Lastname is required";
  } else if (traveller.lastname.length < 2) {
    newErrors[`traveller${index}Lastname`] = "Lastname should be at least 2 characters";
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
  
  // Validate mobile and email
  if (traveller.mobileNo && !isValidPhone(traveller.mobileNo)) {
    newErrors[`traveller${index}Mobile`] = "Please enter a valid 10-digit phone number";
  }
  
  if (traveller.email && !isValidEmail(traveller.email)) {
    newErrors[`traveller${index}Email`] = "Please enter a valid email address";
  }
  
  // Validate pincode
  if (traveller.pincode && !/^\d{6}$/.test(traveller.pincode)) {
    newErrors[`traveller${index}Pincode`] = "Pincode should be 6 digits";
  }

  return newErrors;
};

export const validateNominee = (nominee: NomineeData, errors: ValidationErrors = {}): ValidationErrors => {
  const newErrors = { ...errors };
  
  if (nominee.name && !nominee.dob) {
    newErrors.nomineeDob = "Nominee date of birth is required";
  }
  
  return newErrors;
};

export const validateProposer = (proposer: ProposerData, errors: ValidationErrors = {}): ValidationErrors => {
  const newErrors = { ...errors };
  
  if (proposer.type && proposer.type !== "Self") {
    if (!proposer.name) {
      newErrors.proposerName = "Name is required";
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
  
  // If we have errors, show a summary toast without listing every error
  if (Object.keys(errors).length > 0) {
    toast({
      title: "Validation Error",
      description: "Please correct the highlighted fields and try again.",
      variant: "destructive"
    });
  }
  
  return errors;
};
