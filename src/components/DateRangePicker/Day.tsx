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
      className={`${styles.day} ${isSelected ? styles.selected : ''} ${isWeekend ? styles.weekend : ''}`}
      onClick={onClick}
      style={{
        cursor: isWeekend ? 'not-allowed' : 'pointer',
      }}
      role="button"
      aria-selected={isSelected}
      tabIndex={0}
    >
      {date.getDate()}
    </div>
  );
}

export default React.memo(Day);
