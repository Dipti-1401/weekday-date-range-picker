import React, { useCallback } from "react";
import { isWeekend, daysInMonth, normalizeDate } from "../../utils/dateUtils";
import Day from "./Day";
import styles from "../../styles/DateRangePicker.module.css";

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
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const isSelected = useCallback(
    (date: Date) => {
      if (!startDate) return false;
      const normalizedDate = normalizeDate(date);
      if (endDate) {
        return (
          normalizedDate >= normalizeDate(startDate) &&
          normalizedDate <= normalizeDate(endDate)
        );
      }
      return normalizedDate.getTime() === normalizeDate(startDate).getTime();
    },
    [startDate, endDate]
  );

  const renderDays = useCallback(() => {
    const numberOfDays = daysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const startDayOffset = (firstDayOfMonth + 6) % 7;

    const days: JSX.Element[] = [];
    for (let i = 0; i < startDayOffset; i++) {
      days.push(
        <div key={`blank-${i}`} className={styles.day} aria-hidden="true"></div>
      );
    }

    for (let i = 1; i <= numberOfDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isCurrentDaySelected = isSelected(date);

      days.push(
        <Day
          key={i}
          date={date}
          isSelected={isCurrentDaySelected}
          isWeekend={isWeekend(date)}
          onClick={() => !isWeekend(date) && onDateChange(date)}
        />
      );
    }
    return days;
  }, [currentMonth, currentYear, isSelected, onDateChange]);

  return (
    <div className={styles.calendar} role="grid">
      <div className={styles.calendarHeader}>
        <button
          onClick={() => onMonthYearChange(currentMonth - 1, currentYear)}
          aria-label="Previous month"
        >
          &lt;
        </button>
        <span aria-live="polite">{`${currentMonth + 1} / ${currentYear}`}</span>
        <button
          onClick={() => onMonthYearChange(currentMonth + 1, currentYear)}
          aria-label="Next month"
        >
          &gt;
        </button>
      </div>
      <div className={styles.weekdayLabels} role="row">
        {daysOfWeek.map((day, index) => (
          <div key={index} className={styles.weekdayLabel} role="columnheader">
            {day}
          </div>
        ))}
      </div>
      <div className={styles.calendarGrid} role="rowgroup">
        {renderDays()}
      </div>
    </div>
  );
}

export default React.memo(Calendar);
