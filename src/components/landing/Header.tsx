
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/dafe065b-e37a-436a-9495-630547ca23ad.png" 
              alt="Policy Insure Logo" 
              className="h-10" 
            />
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
  );
};

export default Header;
