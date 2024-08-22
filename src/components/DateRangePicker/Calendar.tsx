import React, { useCallback, useMemo } from 'react';
import { isWeekend, daysInMonth } from '../../utils/dateUtils';
import styles from '../../styles/DateRangePicker.module.css';
import Day from './Day';

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (date: Date) => void;
  currentMonth: number;
  currentYear: number;
  onMonthYearChange: (month: number, year: number) => void;
}

function Calendar({ startDate, endDate, onDateChange, currentMonth, currentYear, onMonthYearChange }: CalendarProps) {
  const daysOfWeek = useMemo(() => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], []);

  const handleMonthChange = useCallback((offset: number) => {
    let newMonth = currentMonth + offset;
    let newYear = currentYear;
    if (newMonth < 0) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth > 11) {
      newMonth = 0;
      newYear += 1;
    }
    onMonthYearChange(newMonth, newYear);
  }, [currentMonth, currentYear, onMonthYearChange]);

  const isSelected = useCallback(
    (date: Date) => {
      if (!startDate || !endDate) return false;
      return date >= startDate && date <= endDate;
    },
    [startDate, endDate]
  );

  const renderDays = useMemo(() => {
    const numberOfDays = daysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const startDayOffset = (firstDayOfMonth + 6) % 7; // Align Monday as 0, Sunday as 6

    const days: JSX.Element[] = [];

    // Fill in the blank days before the first day of the month
    for (let i = 0; i < startDayOffset; i++) {
      days.push(<div key={`blank-${i}`} className={styles.day}></div>);
    }

    // Fill in the actual days of the month
    for (let i = 1; i <= numberOfDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isCurrentDayWeekend = isWeekend(date);
      const isCurrentDaySelected = isSelected(date);

      days.push(
        <Day
          key={i}
          date={date}
          isSelected={isCurrentDaySelected}
          isWeekend={isCurrentDayWeekend}
          onClick={() => !isCurrentDayWeekend && onDateChange(date)}
        />
      );
    }
    return days;
  }, [currentMonth, currentYear, isSelected, onDateChange]);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button onClick={() => handleMonthChange(-1)}>&lt;</button>
        <span>{`${currentMonth + 1} / ${currentYear}`}</span>
        <button onClick={() => handleMonthChange(1)}>&gt;</button>
      </div>
      <div className={styles.weekdayLabels}>
        {daysOfWeek.map((day, index) => (
          <div key={index} className={styles.weekdayLabel}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.calendarGrid}>{renderDays}</div>
    </div>
  );
}

export default Calendar;
