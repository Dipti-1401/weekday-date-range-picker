import React, { useCallback } from 'react';
import { isWeekend, daysInMonth } from '../../utils/dateUtils';
import styles from '../../styles/DateRangePicker.module.css';

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (date: Date) => void;
  currentMonth: number;
  currentYear: number;
  onMonthYearChange: (month: number, year: number) => void;
}

function Calendar({
  startDate,
  endDate,
  onDateChange,
  currentMonth,
  currentYear,
  onMonthYearChange,
}: CalendarProps) {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const isSelected = useCallback(
    (date: Date) => {
      if (!startDate) return false;
      if (endDate) {
        return date >= startDate && date <= endDate;
      }
      return date.getTime() === startDate.getTime();
    },
    [startDate, endDate]
  );

  const renderDay = useCallback(
    (day: number, offset: number) => {
      const date = new Date(currentYear, currentMonth, day);
      const isCurrentDaySelected = isSelected(date);

      return (
        <div
          key={day + offset}
          className={`${styles.day} ${
            isWeekend(date) ? styles.weekend : ''
          } ${isCurrentDaySelected ? styles.selected : ''}`}
          onClick={() => !isWeekend(date) && onDateChange(date)}
          style={{ cursor: isWeekend(date) ? 'not-allowed' : 'pointer' }}
        >
          {day}
        </div>
      );
    },
    [currentYear, currentMonth, onDateChange, isSelected]
  );

  const renderDays = useCallback(() => {
    const numberOfDays = daysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const startDayOffset = (firstDayOfMonth + 6) % 7;

    const days: JSX.Element[] = [];
    for (let i = 0; i < startDayOffset; i++) {
      days.push(<div key={`blank-${i}`} className={styles.day}></div>);
    }

    for (let i = 1; i <= numberOfDays; i++) {
      days.push(renderDay(i, startDayOffset));
    }
    return days;
  }, [currentMonth, currentYear, renderDay]);

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button
          onClick={() => onMonthYearChange(currentMonth - 1, currentYear)}
        >
          &lt;
        </button>
        <span>{`${currentMonth + 1} / ${currentYear}`}</span>
        <button
          onClick={() => onMonthYearChange(currentMonth + 1, currentYear)}
        >
          &gt;
        </button>
      </div>
      <div className={styles.weekdayLabels}>
        {daysOfWeek.map((day, index) => (
          <div key={index} className={styles.weekdayLabel}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.calendarGrid}>{renderDays()}</div>
    </div>
  );
}

export default Calendar;
