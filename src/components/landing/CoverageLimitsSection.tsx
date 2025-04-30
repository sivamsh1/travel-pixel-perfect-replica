import React from 'react';

type LimitItemProps = {
  title: string;
  description: string;
};

const LimitItem = ({ title, description }: LimitItemProps) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow h-[calc(100%+20px)] min-h-[200px]">
    <div>
      <h3 className="text-lg sm:text-xl font-medium mb-2">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  </div>
);

const CoverageLimitsSection = () => {
  const limitItems = [
    {
      title: "Breach of Law",
      description: "If the insured has an accident or health issue due to breach of law, then claim will be void."
    },
    {
      title: "Consumption of drugs",
      description: "If the insured gets ill or dies due to the consumption of drugs or illegal substances, then the claim on the policy will be rejected."
    },
    {
      title: "Pre-existing diseases",
      description: "If the insured gets ill from preexisting diseases, then the coverage of the same is not included in the travel insurance policy."
    },
    {
      title: "Cosmetic Treatment or Obesity",
      description: "Should you or any member of your family opt to undergo any cosmetic or obesity treatment during the course of the travel you've insured, such expenses remain uncovered."
    },
    {
      title: "Adventure Sports",
      description: "Any accident caused due to participation in an adventure sport remains uncovered in the travel insurance policy."
    },
    {
      title: "Self-Inflicted Injury",
      description: "Any hospitalization expenses or medical costs arising from self-inflicted injuries are not covered by the insurance plans we offer."
    }
  ];
  
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-3 md:mb-4">Know the Limits of Your Coverage</h2>
          <p className="text-base md:text-xl text-gray-600">Stay informed about what's excluded from your travel insurance</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[60px] mx-auto px-10">
          {limitItems.map((item, index) => (
            <LimitItem 
              key={index}
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
