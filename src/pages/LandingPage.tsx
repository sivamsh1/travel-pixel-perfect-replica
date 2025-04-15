
import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Shield, Luggage, MapPin, Heart, AlertCircle, Pill, UserPlus, XCircle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src="/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png" alt="Policy Insure Logo" className="h-10" />
            </Link>
            <div className="hidden md:flex ml-10 space-x-6">
              <div className="relative group">
                <button className="flex items-center text-gray-700 font-medium gap-1 py-2">
                  Insurance Product
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <Link to="/claims" className="text-gray-700 font-medium py-2">Claims</Link>
              <Link to="/articles" className="text-gray-700 font-medium py-2">Articles</Link>
              <Link to="/press-release" className="text-gray-700 font-medium py-2">Press-release</Link>
              <Link to="/about" className="text-gray-700 font-medium py-2">About Us</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+1234567890" className="hidden md:flex items-center text-gray-700">
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </a>
            <Link to="/join" className="bg-primary text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-primary/90 transition-colors">
              Join as POS
            </Link>
            <Link to="/login" className="text-primary font-medium text-sm">
              Login
            </Link>
            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Wherever you go<br />
            our coverage follows
          </h1>
          <p className="text-xl text-gray-600 mb-10">Instant setup. Global protection. Always by your side.</p>
          <div className="flex flex-col items-center">
            <Button 
              className="bg-primary text-white px-8 py-6 rounded-md text-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get a Quote
            </Button>
            <div className="flex items-center mt-6 text-sm text-gray-700">
              <Plane className="h-4 w-4 text-primary mr-2" />
              <span>Save 10% on your perfect travel plan!</span>
            </div>
          </div>
        </div>
      </section>

      {/* What does a policy cover */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What does A Travel Insurance Policy Cover?</h2>
          
          {/* Tabs */}
          <div className="flex justify-center mb-8 flex-wrap gap-4">
            <div className="bg-white border border-primary text-primary rounded-md px-4 py-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Medical Coverage
            </div>
            <div className="bg-white border border-gray-200 text-gray-700 rounded-md px-4 py-2 flex items-center">
              <Luggage className="h-5 w-5 mr-2" />
              Baggage Related Coverage
            </div>
            <div className="bg-white border border-gray-200 text-gray-700 rounded-md px-4 py-2 flex items-center">
              <Plane className="h-5 w-5 mr-2" />
              Journey Related Coverage
            </div>
          </div>
          
          {/* Coverage grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Emergency Medical Expenses</h3>
              </div>
              <p className="text-gray-600 text-sm">
                If there's a medical emergency, then the individual travel insurance will come to rescue and will cover for the medical expenses and care.
              </p>
            </div>

            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Emergency dental expenses</h3>
              </div>
              <p className="text-gray-600 text-sm">
                The dental treatment in some of the foreign countries can put you out of pocket. If you get in an accident and require emergency dental care then you can rely on your travel insurance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Medical evacuation</h3>
              </div>
              <p className="text-gray-600 text-sm">
                When we said our travel insurance gets you out of trouble quickly, we didn't just mean it metaphorically. With emergency medical evacuation via air/land, we'll get you safely to the nearest hospital.
              </p>
            </div>

            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Hospital daily cash allowance</h3>
              </div>
              <p className="text-gray-600 text-sm">
                There are a lot of petty expenses that can eat your trip money. If you get hospitalized the medical expenses will be covered but you will also get hospital daily cash allowance to take care of petty expenses.
              </p>
            </div>

            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Medical & Body Repatriation</h3>
              </div>
              <p className="text-gray-600 text-sm">
                We'll stand by you even, and especially, when the going gets tough. In case of a death, we'll bear the cost of transferring the mortal remains to the home country.
              </p>
            </div>

            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Accidental death</h3>
              </div>
              <p className="text-gray-600 text-sm">
                We'll stand by you even, and especially, when the going gets tough. In case of a death, we'll bear the cost of transferring the mortal remains to the home country.
              </p>
            </div>

            <div className="bg-white p-6 rounded-md shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Permanent Disablement</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Under unfortunate circumstances, accidents can result in permanent disabilities. Should such a thing happen, we offer a lump sum compensation to ease the financial burden that may follow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What does it not cover */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What does A Travel Insurance Policy Not Cover?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-gray-200 p-6 rounded-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <AlertCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Breach of Law</h3>
              </div>
              <p className="text-gray-600 text-sm">
                If the insured has an accident or health issue due to breach of law, then claim will be void.
              </p>
            </div>

            <div className="border border-gray-200 p-6 rounded-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <Pill className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Consumption of drugs</h3>
              </div>
              <p className="text-gray-600 text-sm">
                If the insured gets ill or dies due to the consumption of drugs or illegal substances, then the claim on the policy will be rejected.
              </p>
            </div>

            <div className="border border-gray-200 p-6 rounded-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Pre-existing diseases</h3>
              </div>
              <p className="text-gray-600 text-sm">
                If the insured gets ill from preexisting diseases, then the coverage of the same is not included in the travel insurance policy.
              </p>
            </div>

            <div className="border border-gray-200 p-6 rounded-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L9.121 9.121" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Cosmetic Treatment or Obesity</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Should you or any member of your family opt to undergo any cosmetic or obesity treatment during the course of the travel you've insured, such expenses remain uncovered.
              </p>
            </div>

            <div className="border border-gray-200 p-6 rounded-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13l2-2m0 0l4-4 4 4 6-6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Adventure Sports</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Any accident caused due to participation in an adventure sport remains uncovered in the travel insurance policy.
              </p>
            </div>

            <div className="border border-gray-200 p-6 rounded-md">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-md bg-blue-50 flex items-center justify-center mr-3">
                  <XCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Self-Inflicted Injury</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Any hospitalization expenses or medical costs arising from self-inflicted injuries are not covered by the insurance plans we offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Informational text sections */}
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

      {/* Types of insurance */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Types of Individual Travel Insurance</h2>
          <p className="text-center text-gray-700 mb-12">There are two choices of individual travel insurance depending on individuals with different requirements.</p>

          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-center mb-4">Single trip Individual Travel Insurance</h3>
              <p className="text-gray-700 text-center">
                As the name suggests this type of travel insurance covers only 1 trip. The cover starts on the day of the journey and ends on completion of the travel.
              </p>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-semibold text-center mb-4">Annual Multi-trip Individual Travel Insurance</h3>
              <p className="text-gray-700 text-center">
                This type of travel insurance is valid for multi trips and is ideal for businesspeople and professionals who frequently travel abroad for work basis. The advantage of this policy is that you don't need to take the hassle of buying a travel policy again and again for your travel in a year. This type of policy also works out cost-effective than purchasing single trip policy for each travel expedition.
              </p>
            </div>

            <div>
              <p className="text-gray-700 mb-6">
                Whatever the reason be, an unfortunate incident or accident can happen anytime while travel which can spoil the fun or goal of the trip and put you in deep trouble of financial burden. To mitigate the risks of such events, a travel plan is a great solution. It protects the policyholder from financial losses as a result of unexpected events which may happen during the journey.
              </p>
              <p className="text-gray-700 mb-6">
                No one can guarantee a stress-free trip to any destination. A well-planned journey can get disrupted if an expected incident occurs. For example – What if you are your partner or children meet with an unfortunate accident and require medical help or hospitalization? Or if your flight gets delayed due to bad weather conditions? Or the airline loses your luggage, Or the flight gets cancelled at the last minute Or you miss your connecting flight to your destination. The list of unfortunate incidents is endless.
              </p>
              <p className="text-gray-700">
                The only solution to overcome these unexpected problems is to have travel insurance safeguarding you during your travel. Not only the travel insurance help you handle diversities for you, but it also mitigates your financial losses and keeps you out of misery. With a comprehensive travel plan, you can sit back relax, enjoy your trip and make lasting memories of your trip.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="mb-6">
                <img src="/lovable-uploads/92e4cd3c-dbb1-4c01-ae16-8032d50630ba.png" alt="Policy Insure Logo" className="h-10" />
              </div>
              <p className="text-gray-700 mb-6">
                With Policy Insure, you do more than compare policies; you truly understand them, narrow your choices, make wiser choices, and stay away from risks.
              </p>
              <button className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-primary/90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Talk to an advisor
              </button>

              <div className="mt-6">
                <p className="font-medium mb-2">For Insurance Queries:</p>
                <div className="flex items-center gap-2 mb-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:info@policyinsure.com" className="text-gray-700 hover:text-primary">info@policyinsure.com</a>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+917798251714" className="text-gray-700 hover:text-primary">+91 7798251714</a>
                </div>
              </div>

              <div className="mt-6">
                <p className="font-medium mb-2">Social's:</p>
                <div className="flex gap-4">
                  <a href="#" className="text-primary hover:text-primary-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                  <a href="#" className="text-primary hover:text-primary-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Products</h3>
              <div className="mb-4">
                <h4 className="text-gray-600 font-medium mb-2">Retail</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-700 hover:text-primary">Car Insurance</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-primary">Bike Insurance</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-primary">Cycle Insurance</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-primary">Health Insurance</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-primary">Marine Insurance</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-gray-600 font-medium mb-2">Corporate</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-700 hover:text-primary">Workmen's Compensation</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-primary">Group Health Insurance</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-primary">Fire Insurance</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-primary">Personal Indemnity Insurance</a></li>
                  <li><a href="#" className="text-gray-700 hover:text-primary">Marine Transmit Insurance</a></li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">General Information</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-700 hover:text-primary">Privacy policy</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary">Terms & Conditions</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary">Code of Conduct</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary">Cancellation & Refund Policy</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary">Payment & Payment Protection</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary">Press Release</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary">About Us</a></li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-gray-500 mt-4">
                <span className="font-medium text-gray-700">Brixton Insurance Broker Pvt ltd. ©2024</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Brixton Insurance Broker Pvt. Ltd Direct insurance broker "with 20+years of experience in Insurance Industry".
              </p>
              <p className="text-sm text-gray-500 mt-2">
                CIN : U66000TN2016PTC103674
              </p>
              <p className="text-sm text-gray-500 mt-2">
                IRDA Broker Registration No. IRDA/DB/772/19<br />
                Valid till 24/08/2024
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="text-xs text-gray-500">
              <span className="font-medium">Disclaimer:</span> The information contained in this website is presented purely for information purposes only provided as service to the internet community at large. It does not constitute insurance advice and we do not guarantee the accuracy, adequacy or the completeness of the information contained here.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
