
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
    <TableRow className={isHighlighted ? 'bg-blue-50' : ''}>
      <TableCell className={`border-r ${isCategoryHeader ? 'font-semibold text-blue-600' : 'text-gray-700'}`}>
        {label}
      </TableCell>
      {values.map((value, index) => (
        <TableCell 
          key={index} 
          className={`text-center ${index === 0 ? 'bg-[#f5faff]' : 'bg-[#fff9f5]'}`}
        >
          {value}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default ComparisonRow;
