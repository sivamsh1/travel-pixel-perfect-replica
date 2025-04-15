
import React from 'react';
import { Check } from 'lucide-react';

const InfoSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What is travel Insurance?</h2>
        <p className="text-gray-700 text-center max-w-4xl mx-auto mb-16">
          Travel insurance is a type of insurance that is custom-made for people going on domestic and international travels. It addresses the various risks that one may face during travels, including hospitalization, medical expenses, loss of luggage or documents, cancellation or disruption of flights, and various other costs. Travel insurance covers you from the date of departure till your arrival back at the place of origin. For frequent fliers, a travel plan that remains effective for a certain period is more suitable as it covers multiple travels during the policy period.
        </p>

        <h2 className="text-3xl font-bold text-center mb-10">Why Buy Travel Insurance Policy?</h2>
        <div className="max-w-3xl mx-auto space-y-6 mb-16">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <p className="text-gray-700">People are more prone to medical problems in a foreign land, be it within India or overseas, due to changes in food habits and environmental reasons.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <p className="text-gray-700">Travel insurance helps tackle such circumstances with ease. It protects in case of baggage losses at airports and theft or travel scams in many tourist destinations.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <p className="text-gray-700">Travel insurance protects the policyholder in the event of flight delay or cancellation. It protects you in the event of natural calamities, man-made disasters, flight hijacking, etc. Student travelers can also opt for study interruption coverage in their travel plans.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <p className="text-gray-700">Travel insurance is a mandatory requirement in more than 30 countries. It is a prerequisite for visa processing while travelling to these countries.</p>
          </div>
          <div className="flex items-start gap-4">
            <div className="mt-1 flex-shrink-0">
              <Check className="h-5 w-5 text-primary" />
            </div>
            <p className="text-gray-700">Travel insurance may cover fatalities and repatriation of mortal remains.</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-10">Do You Need A Travel Insurance Policy?</h2>
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-gray-700">
            If that's the question you're baffling with, read on to check the answer to this question! Medical expenses usually cost 3 to 5 times more in foreign countries. Around 25 million baggages are mislaid by airlines every year. Travel scams are very common in tourist-heavy countries.
          </p>
          <p className="text-gray-700">
            So, it's important not only to purchase a travel insurance plan but also to choose the right one. If you buy a travel insurance plan online, you're safeguarding your trip against all the financial losses. Leave aside the financial backup and roaming around abroad without any adequate insurance coverage, as this can prove fatal at the times of an unfortunate event.
          </p>
          <p className="text-gray-700">
            A lost passport or a missed flight are very scary situations for the tourists. One can feel lost even without an insurance cover in a variety of situations, so always keep a backup with travel insurance policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
