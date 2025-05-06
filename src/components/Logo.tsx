import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex-shrink-0">
      <Link to="/" className="flex items-center">
        <img 
          src="/lovable-uploads/dafe065b-e37a-436a-9495-630547ca23ad.png" 
          alt="Policy Insure Logo" 
          className="h-10" 
        />
      </Link>
    </div>
  );
};

export default Logo;
