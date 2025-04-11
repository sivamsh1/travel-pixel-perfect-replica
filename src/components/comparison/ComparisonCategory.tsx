
import React from 'react';
import ComparisonRow, { ComparisonRowProps } from './ComparisonRow';

interface ComparisonCategoryProps {
  title: string;
  rows: Omit<ComparisonRowProps, 'isCategoryHeader' | 'isHighlighted'>[];
}

const ComparisonCategory: React.FC<ComparisonCategoryProps> = ({ title, rows }) => {
  return (
    <>
      <ComparisonRow
        label={title}
        values={["", ""]}
        isCategoryHeader={true}
        isHighlighted={true}
      />
      {rows.map((row, index) => (
        <ComparisonRow
          key={index}
          label={row.label}
          values={row.values}
        />
      ))}
    </>
  );
};

export default ComparisonCategory;
