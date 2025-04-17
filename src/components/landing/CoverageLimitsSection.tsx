import React from 'react';
import { AlertCircle, Pill, Heart, Scissors, Mountain, Ban } from 'lucide-react';

type LimitItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const LimitItem = ({ icon, title, description }: LimitItemProps) => (
  <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow">
    <div className="mb-4">
      <h3 className="text-xl font-medium mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const CoverageLimitsSection = () => {
  const limitItems = [
    {
      icon: <AlertCircle className="h-6 w-6 text-primary" />,
      title: "Breach of Law",
      description: "If the insured has an accident or health issue due to breach of law, then claim will be void."
    },
    {
      icon: <Pill className="h-6 w-6 text-primary" />,
      title: "Consumption of drugs",
      description: "If the insured gets ill or dies due to the consumption of drugs or illegal substances, then the claim on the policy will be rejected."
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: "Pre-existing diseases",
      description: "If the insured gets ill from preexisting diseases, then the coverage of the same is not included in the travel insurance policy."
    },
    {
      icon: <Scissors className="h-6 w-6 text-primary" />,
      title: "Cosmetic Treatment or Obesity",
      description: "Should you or any member of your family opt to undergo any cosmetic or obesity treatment during the course of the travel you've insured, such expenses remain uncovered."
    },
    {
      icon: <Mountain className="h-6 w-6 text-primary" />,
      title: "Adventure Sports",
      description: "Any accident caused due to participation in an adventure sport remains uncovered in the travel insurance policy."
    },
    {
      icon: <Ban className="h-6 w-6 text-primary" />,
      title: "Self-Inflicted Injury",
      description: "Any hospitalization expenses or medical costs arising from self-inflicted injuries are not covered by the insurance plans we offer."
    }
  ];
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-medium mb-4">Know the Limits of Your Coverage</h2>
          <p className="text-xl text-gray-600">Stay informed about what's excluded from your travel insurance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {limitItems.map((item, index) => (
            <LimitItem 
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoverageLimitsSection;
