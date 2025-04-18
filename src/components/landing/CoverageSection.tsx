
import React from 'react';

type CoverageItemProps = {
  image: string;
  title: string;
  description: string;
};

const CoverageItem = ({
  image,
  title,
  description
}: CoverageItemProps) => (
  <div className="flex flex-col items-center text-center">
    <div className="rounded-full w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 flex items-center justify-center mb-4 md:mb-6 bg-[#f7f7f7]">
      <img src={image} alt={title} className="w-12 h-12 md:w-16 md:h-16 object-contain" />
    </div>
    <h3 className="text-lg md:text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm md:text-base max-w-xs">{description}</p>
  </div>
);

const CoverageSection = () => {
  const coverageItems = [{
    image: "https://i.ibb.co/FkH7jGsj/1227-emergency-3.png",
    title: "Emergency medical cover",
    description: "Covers sudden illness or injury during your stay"
  }, {
    image: "https://i.ibb.co/s96zw6tT/2071-baggage-lock-1.png",
    title: "Lost luggage protection",
    description: "Replace essentials if bags are lost, stolen, or delayed"
  }, {
    image: "https://i.ibb.co/pvNFSFwn/1265-hospital-visit-1.png",
    title: "Hospitalization",
    description: "Covers hospital stays and medical bills abroad"
  }, {
    image: "https://i.ibb.co/PG8kFHmR/2082-bribery-2.png",
    title: "Tuition fee protection",
    description: "Get reimbursed if studies stop due to emergencies"
  }, {
    image: "https://i.ibb.co/Kx1SrQf3/2367-loan-2.png",
    title: "Sponsor protection",
    description: "Support if your sponsor can no longer fund you"
  }, {
    image: "https://i.ibb.co/PGr1phhW/2884-telemarketing-man-1.png",
    title: "24/7 student assistance",
    description: "Round-the-clock help, wherever you are"
  }];

  // Split items into two rows of three
  const firstRow = coverageItems.slice(0, 3);
  const secondRow = coverageItems.slice(3, 6);
  
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-3 md:mb-4">Insurance That Travels With You</h2>
          <p className="text-base md:text-xl text-gray-600">Comprehensive student coverage that stays by your side from takeoff to graduation</p>
        </div>
        
        <div className="mb-8 md:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-10 md:gap-y-16">
            {firstRow.map((item, index) => <CoverageItem key={index} image={item.image} title={item.title} description={item.description} />)}
          </div>
        </div>
        
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-10 md:gap-y-16">
            {secondRow.map((item, index) => <CoverageItem key={index + 3} image={item.image} title={item.title} description={item.description} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageSection;
