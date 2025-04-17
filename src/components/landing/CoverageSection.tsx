import React from 'react';
import { Luggage, Plane } from 'lucide-react';
type CoverageItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};
const CoverageItem = ({
  icon,
  title,
  description
}: CoverageItemProps) => <div className="bg-white p-6 rounded-md shadow-sm">
    <div className="flex items-center mb-4">
      <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
        {icon}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>;
const CoverageSection = () => {
  const coverageItems = [{
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>,
    title: "Emergency Medical Expenses",
    description: "If there's a medical emergency, then the individual travel insurance will come to rescue and will cover for the medical expenses and care."
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>,
    title: "Emergency dental expenses",
    description: "The dental treatment in some of the foreign countries can put you out of pocket. If you get in an accident and require emergency dental care then you can rely on your travel insurance."
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>,
    title: "Medical evacuation",
    description: "When we said our travel insurance gets you out of trouble quickly, we didn't just mean it metaphorically. With emergency medical evacuation via air/land, we'll get you safely to the nearest hospital."
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>,
    title: "Hospital daily cash allowance",
    description: "There are a lot of petty expenses that can eat your trip money. If you get hospitalized the medical expenses will be covered but you will also get hospital daily cash allowance to take care of petty expenses."
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>,
    title: "Medical & Body Repatriation",
    description: "We'll stand by you even, and especially, when the going gets tough. In case of a death, we'll bear the cost of transferring the mortal remains to the home country."
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>,
    title: "Accidental death",
    description: "We'll stand by you even, and especially, when the going gets tough. In case of a death, we'll bear the cost of transferring the mortal remains to the home country."
  }, {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>,
    title: "Permanent Disablement",
    description: "Under unfortunate circumstances, accidents can result in permanent disabilities. Should such a thing happen, we offer a lump sum compensation to ease the financial burden that may follow."
  }];
  return;
};
export default CoverageSection;