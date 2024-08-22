// src/components/DateRangePicker/Calendar.tsx
import React, { useState } from 'react';
import { isWeekend, daysInMonth } from '../../utils/dateUtils';
import styles from '../../styles/DateRangePicker.module.css';

interface CalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (date: Date) => void;
}

function Calendar({ startDate, endDate, onDateChange }: CalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  function isSelected(date: Date) {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  }

  function renderDays() {
    const numberOfDays = daysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const startDayOffset = (firstDayOfMonth + 6) % 7; // Align Monday as 0, Sunday as 6

    const days = [];

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
        <div
          key={i}
          className={`${styles.day} ${isCurrentDayWeekend ? styles.weekend : ''} ${isCurrentDaySelected ? styles.selected : ''}`}
          onClick={() => !isCurrentDayWeekend && onDateChange(date)}
          style={{ cursor: isCurrentDayWeekend ? 'not-allowed' : 'pointer' }}
        >
          {i}
        </div>
      );
    }
    return days;
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button onClick={() => setCurrentMonth(currentMonth - 1)}>&lt;</button>
        <span>{`${currentMonth + 1} / ${currentYear}`}</span>
        <button onClick={() => setCurrentMonth(currentMonth + 1)}>&gt;</button>
      </div>
      <div className={styles.weekdayLabels}>
        {daysOfWeek.map((day, index) => (
          <div key={index} className={styles.weekdayLabel}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.calendarGrid}>
        {renderDays()}
      </div>
    </div>
  );
}

export default Calendar;
