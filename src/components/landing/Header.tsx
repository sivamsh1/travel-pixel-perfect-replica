
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/dafe065b-e37a-436a-9495-630547ca23ad.png" 
                  alt="Policy Insure Logo" 
                  className="h-10" 
                />
              </Link>
            </div>
            
            {/* Navigation and Actions - using flex-1 to distribute space evenly */}
            <div className="hidden md:flex items-center justify-between flex-1 px-8">
              {/* Navigation Links - evenly spaced */}
              <nav className="flex items-center space-x-10">
                <div className="relative group">
                  <button className="flex items-center text-gray-600 font-medium gap-1 py-2 hover:text-primary transition-colors">
                    Insurance Product
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
                <Link to="/claims" className="text-gray-600 font-medium py-2 hover:text-primary transition-colors">Claims</Link>
                <Link to="/articles" className="text-gray-600 font-medium py-2 hover:text-primary transition-colors">Articles</Link>
                <Link to="/press-release" className="text-gray-600 font-medium py-2 hover:text-primary transition-colors">Press-release</Link>
                <Link to="/about" className="text-gray-600 font-medium py-2 hover:text-primary transition-colors">About Us</Link>
              </nav>
              
              {/* Action Buttons - evenly spaced */}
              <div className="flex items-center space-x-6">
                <a href="tel:+1234567890" className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 text-primary hover:bg-blue-100 transition-colors">
                  <Phone className="h-4 w-4" />
                </a>
                <Link to="/join" className="flex items-center justify-center px-6 py-2.5 bg-blue-50 text-primary rounded-full font-medium text-sm hover:bg-blue-100 transition-colors">
                  Join as POS
                </Link>
                <Link to="/login" className="text-primary font-medium text-sm hover:underline transition-all">
                  Login
                </Link>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden flex items-center justify-center h-10 w-10 text-gray-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        <Separator className="opacity-30" />
      </header>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20">
          <div className="container mx-auto px-4 py-5 flex flex-col space-y-6">
            <div className="flex flex-col space-y-5">
              <Link 
                to="/" 
                className="text-lg font-medium text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Insurance Product
              </Link>
              <Link 
                to="/claims" 
                className="text-lg font-medium text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Claims
              </Link>
              <Link 
                to="/articles" 
                className="text-lg font-medium text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link 
                to="/press-release" 
                className="text-lg font-medium text-gray-700 hover:text-primary" 
                onClick={() => setMobileMenuOpen(false)}
              >
                Press-release
              </Link>
              <Link 
                to="/about" 
                className="text-lg font-medium text-gray-700 hover:text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </div>
            <div className="pt-5 flex flex-col space-y-5">
              <a href="tel:+1234567890" className="flex items-center text-primary">
                <Phone className="h-5 w-5 mr-2" />
                <span>Call Us</span>
              </a>
              <Link 
                to="/join" 
                className="w-full bg-blue-50 text-primary py-3 rounded-full text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join as POS
              </Link>
              <Link 
                to="/login" 
                className="w-full text-primary text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
