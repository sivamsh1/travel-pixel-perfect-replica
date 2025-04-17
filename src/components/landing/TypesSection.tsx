import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
const TypesSection = () => {
  const insuranceTypes = [{
    title: "Student Insurance",
    description: "Special coverage designed for students studying abroad, covering academic expenses and emergencies.",
    features: ["Coverage for tuition fees if you need to withdraw", "Emergency medical evacuation", "Coverage for lost documents and passports", "Mental health support"]
  }, {
    title: "Group Insurance",
    description: "Perfect for school trips, study groups, and educational tours with comprehensive group benefits.",
    features: ["Discounted rates for groups of 10+", "Dedicated group coordinator", "Simplified claims process", "Coverage for all group activities"]
  }, {
    title: "Family Insurance",
    description: "Protect your entire family with a single policy when accompanying students on their academic journey.",
    features: ["Coverage for all family members", "Child-specific benefits", "Family emergency assistance", "Multi-person discounts"]
  }];
  return;
};
export default TypesSection;