// src/utils/dateUtils.ts
export const isWeekend = (date: Date): boolean => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };
  
  export const daysInMonth = (month: number, year: number): number => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  export const getWeekendDatesInRange = (startDate: Date, endDate: Date): Date[] => {
    const weekends = [];
    const date = new Date(startDate);
  
    while (date <= endDate) {
      if (isWeekend(date)) {
        weekends.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
    }
  
    return weekends;
  };
  