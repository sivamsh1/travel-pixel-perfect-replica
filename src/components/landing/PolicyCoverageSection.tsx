
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Luggage, Plane } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const PolicyCoverageSection = () => {
  const isMobile = useIsMobile();
  const medicalCoverageItems = [{
    title: "Emergency Medical Expenses",
    description: "If there's a medical emergency, then the individual travel insurance will come to rescue and will cover for the medical expenses and care."
  }, {
    title: "Emergency dental expenses",
    description: "The dental treatment in some of the foreign countries can put you out of pocket. If you get in an accident and require emergency dental care then you can rely on your travel insurance."
  }, {
    title: "Medical evacuation",
    description: "When we said our travel insurance gets you out of trouble quickly, we didn't just mean it metaphorically. With emergency medical evacuation via air/land, we'll get you safely to the nearest hospital."
  }, {
    title: "Hospital daily cash allowance",
    description: "There are a lot of petty expenses that can eat your trip money. If you get hospitalized the medical expenses will be covered but you will also get hospital daily cash allowance to take care of petty expenses."
  }, {
    title: "Medical & Body Repatriation",
    description: "We'll stand by you even, and especially, when the going gets tough. In case of a death, we'll bear the cost of transferring the mortal remains to the home country."
  }, {
    title: "Accidental death",
    description: "We'll stand by you even, and especially, when the going gets tough. In case of a death, we'll bear the cost of transferring the mortal remains to the home country."
  }, {
    title: "Permanent Disablement",
    description: "Under unfortunate circumstances, accidents can result in permanent disabilities. Should such a thing happen, we offer a lump sum compensation to ease the financial burden that may follow."
  }];
  const baggageCoverageItems = [{
    title: "Loss of Passport",
    description: "If you loses your baggage or important travel document like passport. it can spoil the trip completely. With individual travel insurance, the cost to get a duplicate passport is compensated ensuring complete peace of mind."
  }, {
    title: "Loss of checked-in baggage",
    description: "Lost your checked-in baggage? It is not uncommon for the airlines to lose the checked-in baggage. With individual travel insurance if you loses the check-in baggage then we'll compensate you for the loss."
  }, {
    title: "Delay of checked-in baggage",
    description: "If there is a delay in getting the baggage to you then the insurance will reimburse you for the essential required till the time you get your baggage."
  }];
  const journeyCoverageItems = [{
    title: "Personal liability",
    description: "If an accident causes damage to the third party, then the individual travel insurance will compensate for the same and keep you away from getting into any legal trouble."
  }, {
    title: "Financial Emergency Assistance",
    description: "Tourist are easy victims to a robbery or theft in a foreign land. If the insured gets robbed, then the individual travel insurance will provide emergency cash."
  }, {
    title: "Hijack Distress Allowance",
    description: "Tourist are easy victims to a robbery or theft in a foreign land. If the insured gets robbed, then the individual travel insurance will provide emergency cash."
  }];

  const renderCards = (items, keyPrefix) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[60px]">
      {items.map((item, index) => (
        <Card key={`${keyPrefix}-${index}`} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow h-[calc(100%+20px)] min-h-[200px]">
          <CardHeader className="p-0 pb-2 sm:pb-3">
            <h3 className="text-base sm:text-lg md:text-xl font-medium">{item.title}</h3>
          </CardHeader>
          <CardContent className="p-0">
            <p className="text-xs sm:text-sm md:text-base text-gray-600">{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <section className="py-10 md:py-16 bg-[EFF0F0] bg-[#eff0f0]">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-3 md:mb-4">Coverage That Goes the Distance</h2>
          <p className="text-base md:text-xl text-gray-600">From medical emergencies to lost baggage—get the coverage you need for stress-free travel.</p>
        </div>

        <div className="mx-auto px-10">
          <Tabs defaultValue="medical" className="w-full">
            <TabsList className={`grid grid-cols-1 sm:grid-cols-3 w-full bg-white rounded-lg shadow-md p-2 mb-6 md:mb-8 ${isMobile ? 'h-auto' : 'h-20'}`}>
              <TabsTrigger value="medical" className={`flex items-center gap-2 py-3 md:py-4 ${isMobile ? 'justify-start px-4 mb-2' : ''} data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300`}>
                <Building2 className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-base md:text-lg font-medium">Medical Coverage</span>
              </TabsTrigger>
              <TabsTrigger value="baggage" className={`flex items-center gap-2 py-3 md:py-4 ${isMobile ? 'justify-start px-4 mb-2' : ''} data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300`}>
                <Luggage className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-base md:text-lg font-medium">Baggage Coverage</span>
              </TabsTrigger>
              <TabsTrigger value="journey" className={`flex items-center gap-2 py-3 md:py-4 ${isMobile ? 'justify-start px-4' : ''} data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300`}>
                <Plane className="h-5 w-5 md:h-6 md:w-6" />
                <span className="text-base md:text-lg font-medium">Journey Coverage</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="medical" className="mt-4 md:mt-6">
              {renderCards(medicalCoverageItems, 'medical')}
            </TabsContent>

            <TabsContent value="baggage" className="mt-4 md:mt-6">
              {renderCards(baggageCoverageItems, 'baggage')}
            </TabsContent>

            <TabsContent value="journey" className="mt-4 md:mt-6">
              {renderCards(journeyCoverageItems, 'journey')}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default PolicyCoverageSection;
