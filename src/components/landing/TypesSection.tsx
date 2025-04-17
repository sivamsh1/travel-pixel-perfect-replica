
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TypesSection = () => {
  const insuranceTypes = [
    {
      title: "Student Insurance",
      description: "Special coverage designed for students studying abroad, covering academic expenses and emergencies.",
      features: [
        "Coverage for tuition fees if you need to withdraw",
        "Emergency medical evacuation",
        "Coverage for lost documents and passports",
        "Mental health support"
      ]
    },
    {
      title: "Group Insurance",
      description: "Perfect for school trips, study groups, and educational tours with comprehensive group benefits.",
      features: [
        "Discounted rates for groups of 10+",
        "Dedicated group coordinator",
        "Simplified claims process",
        "Coverage for all group activities"
      ]
    },
    {
      title: "Family Insurance",
      description: "Protect your entire family with a single policy when accompanying students on their academic journey.",
      features: [
        "Coverage for all family members",
        "Child-specific benefits",
        "Family emergency assistance",
        "Multi-person discounts"
      ]
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-medium text-center mb-12">Types of Travel Insurance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insuranceTypes.map((type, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-2xl font-medium mb-3">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                
                <ul className="space-y-2">
                  {type.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TypesSection;
