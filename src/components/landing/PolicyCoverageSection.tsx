
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Luggage, Plane } from 'lucide-react';

const PolicyCoverageSection = () => {
  const medicalCoverageItems = [
    {
      title: "Emergency Medical Expenses",
      description: "If there's a medical emergency, then the individual travel insurance will come to rescue and will cover for the medical expenses and care."
    },
    {
      title: "Emergency dental expenses",
      description: "The dental treatment in some of the foreign countries can put you out of pocket. If you get in an accident and require emergency dental care then you can rely on your travel insurance."
    },
    {
      title: "Medical evacuation",
      description: "When we said our travel insurance gets you out of trouble quickly, we didn't just mean it metaphorically. With emergency medical evacuation via air/land, we'll get you safely to the nearest hospital."
    },
    {
      title: "Hospital daily cash allowance",
      description: "There are a lot of petty expenses that can eat your trip money. If you get hospitalized the medical expenses will be covered but you will also get hospital daily cash allowance to take care of petty expenses."
    },
    {
      title: "Medical & Body Repatriation",
      description: "We'll stand by you even, and especially, when the going gets tough. In case of a death, we'll bear the cost of transferring the mortal remains to the home country."
    },
    {
      title: "Accidental death",
      description: "We'll stand by you even, and especially, when the going gets tough. In case of a death, we'll bear the cost of transferring the mortal remains to the home country."
    },
    {
      title: "Permanent Disablement",
      description: "Under unfortunate circumstances, accidents can result in permanent disabilities. Should such a thing happen, we offer a lump sum compensation to ease the financial burden that may follow."
    }
  ];

  const baggageCoverageItems = [
    {
      title: "Loss of Passport",
      description: "If you loses your baggage or important travel document like passport. it can spoil the trip completely. With individual travel insurance, the cost to get a duplicate passport is compensated ensuring complete peace of mind."
    },
    {
      title: "Loss of checked-in baggage",
      description: "Lost your checked-in baggage? It is not uncommon for the airlines to lose the checked-in baggage. With individual travel insurance if you loses the check-in baggage then we'll compensate you for the loss."
    },
    {
      title: "Delay of checked-in baggage",
      description: "If there is a delay in getting the baggage to you then the insurance will reimburse you for the essential required till the time you get your baggage."
    }
  ];

  const journeyCoverageItems = [
    {
      title: "Personal liability",
      description: "If an accident causes damage to the third party, then the individual travel insurance will compensate for the same and keep you away from getting into any legal trouble."
    },
    {
      title: "Financial Emergency Assistance",
      description: "Tourist are easy victims to a robbery or theft in a foreign land. If the insured gets robbed, then the individual travel insurance will provide emergency cash."
    },
    {
      title: "Hijack Distress Allowance",
      description: "Tourist are easy victims to a robbery or theft in a foreign land. If the insured gets robbed, then the individual travel insurance will provide emergency cash."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-5xl font-medium mb-4">Coverage That Goes the Distance</h2>
          <p className="text-xl text-gray-600">From medical emergencies to lost baggage—get the coverage you need for stress-free travel.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="grid grid-cols-3 w-full bg-white rounded-lg shadow-md p-2 mb-8 h-20">
              <TabsTrigger 
                value="medical" 
                className="flex items-center gap-2 py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Building2 className="h-6 w-6" />
                <span className="text-lg font-medium">Medical Coverage</span>
              </TabsTrigger>
              <TabsTrigger 
                value="baggage" 
                className="flex items-center gap-2 py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Luggage className="h-6 w-6" />
                <span className="text-lg font-medium">Baggage Related Coverage</span>
              </TabsTrigger>
              <TabsTrigger 
                value="journey" 
                className="flex items-center gap-2 py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
              >
                <Plane className="h-6 w-6" />
                <span className="text-lg font-medium">Journey Related Coverage</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="medical" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {medicalCoverageItems.map((item, index) => (
                  <Card key={`medical-${index}`} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <h3 className="text-xl font-medium">{item.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="baggage" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {baggageCoverageItems.map((item, index) => (
                  <Card key={`baggage-${index}`} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <h3 className="text-xl font-medium">{item.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="journey" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {journeyCoverageItems.map((item, index) => (
                  <Card key={`journey-${index}`} className="shadow-md hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <h3 className="text-xl font-medium">{item.title}</h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PolicyCoverageSection;
