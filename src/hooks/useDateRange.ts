// src/hooks/useDateRange.ts
import { useState } from 'react';
import { isWeekend, getWeekendDatesInRange } from '../utils/dateUtils';

const useDateRange = (onChange: (selectedRange: [Date, Date], weekendDates: Date[]) => void) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date >= startDate && !isWeekend(date)) {
        setEndDate(date);
        const weekendDates = getWeekendDatesInRange(startDate, date);
        onChange([startDate, date], weekendDates);
      }
    }
  };

  const handlePredefinedRange = (range: [Date, Date]) => {
    setStartDate(range[0]);
    setEndDate(range[1]);
    const weekendDates = getWeekendDatesInRange(range[0], range[1]);
    onChange(range, weekendDates);
  };

  return { startDate, endDate, handleDateChange, handlePredefinedRange };
};

export default useDateRange;
