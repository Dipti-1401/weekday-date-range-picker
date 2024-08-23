import React, { useCallback, useMemo } from "react";
import styles from "../../styles/DateRangePicker.module.css";

interface DayProps {
  date: Date;
  isSelected: boolean;
  isWeekend: boolean;
  onClick: () => void;
}

function Day({ date, isSelected, isWeekend, onClick }: DayProps) {
  const dayNumber = useMemo(() => date.getDate(), [date]);

  const handleClick = useCallback(() => {
    if (!isWeekend) {
      onClick();
    }
  }, [isWeekend, onClick]);

  return (
    <div
      className={`${styles.day} ${isSelected ? styles.selected : ""} ${
        isWeekend ? styles.weekend : ""
      }`}
      onClick={handleClick}
      style={{
        cursor: isWeekend ? "not-allowed" : "pointer",
      }}
      role="button"
      aria-selected={isSelected}
      aria-disabled={isWeekend}
      tabIndex={0}
    >
      {dayNumber}
    </div>
  );
}

export default React.memo(Day);
