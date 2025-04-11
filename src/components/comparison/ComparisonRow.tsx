
import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";

export interface ComparisonRowProps {
  label: string;
  values: (string | React.ReactNode)[];
  isHighlighted?: boolean;
  isCategoryHeader?: boolean;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ 
  label, 
  values,
  isHighlighted = false,
  isCategoryHeader = false
}) => {
  return (
    <TableRow 
      className={`
        ${isHighlighted ? 'bg-blue-50 dark:bg-blue-900/20' : ''}
        ${isCategoryHeader ? 'border-t-2 border-blue-200 dark:border-blue-800' : ''}
        transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50
      `}
    >
      <TableCell 
        className={`
          border-r 
          ${isCategoryHeader 
            ? 'font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 py-3' 
            : 'text-gray-700 dark:text-gray-300'}
        `}
      >
        {label}
      </TableCell>
      {values.map((value, index) => (
        <TableCell 
          key={index} 
          className={`
            text-center 
            ${index === 0 
              ? 'bg-[#f5faff] dark:bg-[#0a192f]/40' 
              : 'bg-[#fff9f5] dark:bg-[#1f1209]/20'}
            ${isCategoryHeader ? 'py-3' : ''}
          `}
        >
          {value}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ComparisonRow;
