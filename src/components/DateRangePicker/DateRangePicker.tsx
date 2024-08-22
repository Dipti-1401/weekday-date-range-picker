// src/components/DateRangePicker/DateRangePicker.tsx
import React from 'react';
import Calendar from './Calendar';
import PredefinedRanges from '../PredefinedRanges';
import useDateRange from '../../hooks/useDateRange';
import styles from '../../styles/DateRangePicker.module.css';

interface DateRangePickerProps {
  predefinedRanges?: { label: string, range: [Date, Date] }[];
  onChange: (selectedRange: [Date, Date], weekendDates: Date[]) => void;
}

function DateRangePicker({ predefinedRanges, onChange }: DateRangePickerProps) {
  const { startDate, endDate, handleDateChange, handlePredefinedRange } = useDateRange(onChange);

  // Calculate today's and yesterday's dates
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // Define additional ranges including today and yesterday
  const additionalRanges: { label: string, range: [Date, Date] }[] = [
    { label: 'Yesterday', range: [yesterday, yesterday] },
    { label: 'Today', range: [today, today] },
  ];

  return (
    <div className={styles.dateRangePicker}>
      <h2>Select Weekday Date Range</h2>
      <Calendar startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
      <div className={styles.predefinedRanges}>
        {[...additionalRanges, ...predefinedRanges!].map((range, index) => (
          <button key={index} onClick={() => handlePredefinedRange(range.range)}>
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DateRangePicker;
