import React from "react";
import { isWeekend, daysInMonth, normalizeDate } from "../../utils/dateUtils";
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

  function isSelected(date: Date) {
    if (!startDate) return false;
    const normalizedDate = normalizeDate(date);
    if (endDate) {
      return (
        normalizedDate >= normalizeDate(startDate) &&
        normalizedDate <= normalizeDate(endDate)
      );
    }
    return normalizedDate.getTime() === normalizeDate(startDate).getTime();
  }

  function renderDays() {
    const numberOfDays = daysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const startDayOffset = (firstDayOfMonth + 6) % 7;

    const days = [];
    for (let i = 0; i < startDayOffset; i++) {
      days.push(<div key={`blank-${i}`} className={styles.day}></div>);
    }

    for (let i = 1; i <= numberOfDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isCurrentDaySelected = isSelected(date);

      days.push(
        <div
          key={i}
          className={`${styles.day} ${isWeekend(date) ? styles.weekend : ""} ${
            isCurrentDaySelected ? styles.selected : ""
          }`}
          onClick={() => !isWeekend(date) && onDateChange(date)}
          style={{ cursor: isWeekend(date) ? "not-allowed" : "pointer" }}
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
