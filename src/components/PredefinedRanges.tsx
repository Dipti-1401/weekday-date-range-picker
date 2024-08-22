// src/components/PredefinedRanges.tsx
import React from 'react';

interface PredefinedRangesProps {
  predefinedRanges?: { label: string, range: [Date, Date] }[];
  onRangeSelect: (range: [Date, Date]) => void;
}

function PredefinedRanges({ predefinedRanges = [], onRangeSelect }: PredefinedRangesProps) {
  return (
    <div className="predefined-ranges">
      {predefinedRanges.map((range, index) => (
        <button key={index} onClick={() => onRangeSelect(range.range)}>
          {range.label}
        </button>
      ))}
    </div>
  );
}

export default PredefinedRanges;
