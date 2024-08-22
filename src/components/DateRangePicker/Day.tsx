// src/components/DateRangePicker/Day.tsx
import React from 'react';
import styles from '../../styles/DateRangePicker.module.css';

interface DayProps {
  date: Date;
  isSelected: boolean;
  isWeekend: boolean;
  onClick: () => void;
}

function Day({ date, isSelected, isWeekend, onClick }: DayProps) {
  return (
    <div
      className={`${styles.day} ${isWeekend ? styles.weekend : ''} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
      style={{ cursor: isWeekend ? 'not-allowed' : 'pointer' }}
      role="button"
      aria-selected={isSelected}
    >
      {date.getDate()}
    </div>
  );
}

export default Day;
