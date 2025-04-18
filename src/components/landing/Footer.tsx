
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 md:mb-12">
          <div>
            <div className="mb-6">
              <img 
                src="/lovable-uploads/dafe065b-e37a-436a-9495-630547ca23ad.png" 
                alt="Policy Insure Logo" 
                className="h-8 md:h-10" 
              />
            </div>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              With Policy Insure, you do more than compare policies; you truly understand them, narrow your choices, make wiser choices, and stay away from risks.
            </p>
            <button className="bg-primary text-white px-3 py-2 md:px-4 md:py-2 rounded-md flex items-center gap-1 md:gap-2 text-sm md:text-base hover:bg-primary/90 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Talk to an advisor
            </button>

            <div className="mt-6">
              <p className="font-medium mb-2 text-sm md:text-base">For Insurance Queries:</p>
              <div className="flex items-center gap-1 md:gap-2 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@policyinsure.com" className="text-gray-700 hover:text-primary text-sm md:text-base">info@policyinsure.com</a>
              </div>
              <div className="flex items-center gap-1 md:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+917798251714" className="text-gray-700 hover:text-primary text-sm md:text-base">+91 7798251714</a>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-medium mb-2 text-sm md:text-base">Social's:</p>
              <div className="flex gap-4">
                <a href="#" className="text-primary hover:text-primary-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-primary hover:text-primary-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-primary hover:text-primary-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="#" className="text-primary hover:text-primary-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-0">
            <h3 className="font-semibold text-lg mb-4">Products</h3>
            <div className="mb-4">
              <h4 className="text-gray-600 font-medium mb-2 text-sm md:text-base">Retail</h4>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Car Insurance</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Bike Insurance</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Cycle Insurance</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Health Insurance</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Marine Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-600 font-medium mb-2 text-sm md:text-base">Corporate</h4>
              <ul className="space-y-1 md:space-y-2">
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Workmen's Compensation</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Group Health Insurance</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Fire Insurance</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Personal Indemnity Insurance</a></li>
                <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Marine Transmit Insurance</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <h3 className="font-semibold text-lg mb-4">General Information</h3>
            <ul className="space-y-1 md:space-y-2">
              <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Privacy policy</a></li>
              <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Code of Conduct</a></li>
              <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Cancellation & Refund Policy</a></li>
              <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Payment & Payment Protection</a></li>
              <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">Press Release</a></li>
              <li><a href="#" className="text-gray-700 hover:text-primary text-sm md:text-base">About Us</a></li>
            </ul>
          </div>

          <div className="mt-6 lg:mt-0">
            <p className="text-xs md:text-sm text-gray-500 mt-4">
              <span className="font-medium text-gray-700">Brixton Insurance Broker Pvt ltd. ©2024</span>
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              Brixton Insurance Broker Pvt. Ltd Direct insurance broker "with 20+years of experience in Insurance Industry".
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
              CIN : U66000TN2016PTC103674
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-2">
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
  );
};

export default Footer;
