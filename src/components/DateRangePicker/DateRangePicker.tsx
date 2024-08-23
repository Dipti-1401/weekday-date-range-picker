import React, { useState, useCallback } from "react";
import Calendar from "./Calendar";
import {
  getWeekendDatesInRange,
  formatDate,
  resetTime,
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
      const normalizedDate = resetTime(date);

      if (predefinedRange) {
        const [start, end] = predefinedRange.map(resetTime);
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
            setEndDate(normalizedDate);
            const weekendDates = getWeekendDatesInRange(
              startDate,
              normalizedDate
            );
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

  const handleMonthYearChange = (month: number, year: number) => {
    if (month < 0) {
      month = 11;
      year -= 1;
    } else if (month > 11) {
      month = 0;
      year += 1;
    }
    setCurrentMonth(month);
    setCurrentYear(year);
  };

  const handlePredefinedRangeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedRange = predefinedRanges.find(
      (range) => range.label === e.target.value
    );
    if (selectedRange) {
      handleDateChange(selectedRange.range[0], selectedRange.range);
    }
  };

  return (
    <div>
      <h1 className={styles.header}>Date Range Picker</h1>
      <div className={styles.dateRangePicker}>
        <div className={styles.predefinedRanges}>
          <select
            onChange={handlePredefinedRangeChange}
            className={styles.dropdown}
          >
            <option value="">Select a Range</option>
            {predefinedRanges.map((range, index) => (
              <option key={index} value={range.label}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        <h2>Select Weekday Date Range</h2>
        <Calendar
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleDateChange}
          currentMonth={currentMonth}
          currentYear={currentYear}
          onMonthYearChange={handleMonthYearChange}
        />
        {startDate && endDate && (
          <div className={styles.selectedRange}>
            Selected Range: {formatDate(startDate)} - {formatDate(endDate)}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(DateRangePicker);
