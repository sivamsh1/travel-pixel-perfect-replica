import React from 'react';
import { AlertCircle, Heart, Pill, XCircle } from 'lucide-react';
type ExclusionItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};
const ExclusionItem = ({
  icon,
  title,
  description
}: ExclusionItemProps) => <div className="border border-gray-200 p-6 rounded-md">
    <div className="flex items-center mb-4">
      <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>;
const ExclusionsSection = () => {
  const exclusionItems = [{
    icon: <AlertCircle className="h-6 w-6 text-primary" />,
    title: "Breach of Law",
    description: "If the insured has an accident or health issue due to breach of law, then claim will be void."
  }, {
    icon: <Pill className="h-6 w-6 text-primary" />,
    title: "Consumption of drugs",
    description: "If the insured gets ill or dies due to the consumption of drugs or illegal substances, then the claim on the policy will be rejected."
  }, {
    icon: <Heart className="h-6 w-6 text-primary" />,
    title: "Pre-existing diseases",
    description: "If the insured gets ill from preexisting diseases, then the coverage of the same is not included in the travel insurance policy."
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>,
    title: "Cosmetic Treatment or Obesity",
    description: "Should you or any member of your family opt to undergo any cosmetic or obesity treatment during the course of the travel you've insured, such expenses remain uncovered."
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l2-2m0 0l4-4 4 4 6-6" />
          </svg>,
    title: "Adventure Sports",
    description: "Any accident caused due to participation in an adventure sport remains uncovered in the travel insurance policy."
  }, {
    icon: <XCircle className="h-6 w-6 text-primary" />,
    title: "Self-Inflicted Injury",
    description: "Any hospitalization expenses or medical costs arising from self-inflicted injuries are not covered by the insurance plans we offer."
  }];
  return;
};
export default ExclusionsSection;