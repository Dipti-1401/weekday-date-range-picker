import React, { useState, useEffect, useCallback } from 'react';
import Calendar from './Calendar';
import { getWeekendDatesInRange, formatDate } from '../../utils/dateUtils';
import styles from '../../styles/DateRangePicker.module.css';

interface PredefinedRange {
  label: string;
  range: [Date, Date];
}

interface DateRangePickerProps {
  predefinedRanges: PredefinedRange[];
  onChange: (selectedRange: [Date, Date], weekendDates: Date[]) => void;
}

function DateRangePicker({ predefinedRanges, onChange }: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  const handleDateChange = useCallback((date: Date, predefinedRange?: [Date, Date]) => {
    if (predefinedRange) {
      setStartDate(predefinedRange[0]);
      setEndDate(predefinedRange[1]);
      setCurrentMonth(predefinedRange[0].getMonth());
      setCurrentYear(predefinedRange[0].getFullYear());
      const weekendDates = getWeekendDatesInRange(predefinedRange[0], predefinedRange[1]);
      onChange(predefinedRange, weekendDates);
    } else {
      if (!startDate || (startDate && endDate)) {
        setStartDate(date);
        setEndDate(null);
      } else if (startDate && !endDate && date >= startDate) {
        setEndDate(date);
        const weekendDates = getWeekendDatesInRange(startDate, date);
        onChange([startDate, date], weekendDates);
      } else {
        setStartDate(date);
        setEndDate(null);
      }
    }
  }, [startDate, endDate, onChange]);

  const handleMonthYearChange = useCallback((month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  }, []);

  useEffect(() => {
    if (startDate && endDate && endDate < startDate) {
      setEndDate(null);
    }
  }, [startDate, endDate]);

  return (
    <div>
      <h1 className={styles.header}>Date Range Picker</h1>
      <div className={styles.dateRangePicker}>
        <h2>Select Weekday Date Range</h2>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthYearChange={handleMonthYearChange}
        />
        <div className={styles.predefinedRanges}>
          {predefinedRanges.map((range, index) => (
            <button 
              key={index} 
              onClick={() => handleDateChange(range.range[0], range.range)}
              className={styles.predefinedRangeButton}
            >
              {range.label}
            </button>
          ))}
        </div>
        {startDate && endDate && (
          <div className={styles.selectedRange}>
            Selected Range: {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        )}
      </div>
    </div>
  );
}

export default DateRangePicker;
