import React, { useState, useCallback } from "react";
import Calendar from "./Calendar";
import {
  getWeekendDatesInRange,
  formatDate,
  normalizeDate,
} from "../../utils/dateUtils";
import styles from "../../styles/DateRangePicker.module.css";

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
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  const handleDateChange = useCallback(
    (date: Date, predefinedRange?: [Date, Date]) => {
      const normalizedDate = normalizeDate(date);

      if (predefinedRange) {
        const [start, end] = predefinedRange.map(normalizeDate);
        const weekendDates = getWeekendDatesInRange(start, end);
        onChange([start, end], weekendDates);
        setStartDate(start);
        setEndDate(end);
        setCurrentMonth(start.getMonth());
        setCurrentYear(start.getFullYear());
      } else {
        if (!startDate || (startDate && endDate)) {
          setStartDate(normalizedDate);
          setEndDate(null);
        } else if (startDate && !endDate) {
          if (normalizedDate >= startDate) {
            const weekendDates = getWeekendDatesInRange(
              startDate,
              normalizedDate
            );
            setEndDate(normalizedDate);
            onChange([startDate, normalizedDate], weekendDates);
          } else {
            setStartDate(normalizedDate);
            setEndDate(null);
          }
        }
      }
    },
    [startDate, endDate, onChange]
  );

  const handleMonthYearChange = useCallback((month: number, year: number) => {
    setCurrentMonth(month);
    setCurrentYear(year);
  }, []);

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
              aria-label={`Select ${range.label}`}
            >
              {range.label}
            </button>
          ))}
        </div>
        {startDate && endDate && (
          <div className={styles.selectedRange} aria-live="polite">
            Selected Range: {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(DateRangePicker);
