
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
      className="bg-primary hover:bg-primary/90 text-white font-medium rounded-md py-2 px-8"
      variant={variant}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ActionButton;
