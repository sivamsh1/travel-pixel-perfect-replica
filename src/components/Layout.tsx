import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="py-4 px-6 md:px-12 flex justify-between items-center mb-3">
        <Logo />
        <h1 className="text-2xl font-medium text-primary">Student Trip</h1>
        <div className="w-24"></div> {/* Spacer for balance */}
      </header>
      
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      
      <footer className="p-6 flex justify-between items-center text-sm text-gray-500">
        <p>© PolicyInsure 2025</p>
        <p>Policyinsure.com</p>
      </footer>
    </div>
  );
};

export default Layout;
