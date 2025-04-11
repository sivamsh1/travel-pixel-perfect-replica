
import React from 'react';
import { Button } from '@/components/ui/button';

interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const ActionButton = ({ 
  children, 
  variant = 'default',
  ...props 
}: ActionButtonProps) => {
  return (
    <Button 
      className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg py-3 px-8 transition-colors"
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
