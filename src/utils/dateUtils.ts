// src/utils/dateUtils.ts

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function daysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function addDays(date: Date, days: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

export function getWeekendDatesInRange(startDate: Date, endDate: Date): Date[] {
  const weekendDates: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (isWeekend(currentDate)) {
      weekendDates.push(new Date(currentDate));
    }
    currentDate = addDays(currentDate, 1);
  }

  return weekendDates;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
