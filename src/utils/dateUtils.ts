export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function daysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getWeekendDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (isWeekend(currentDate)) {
      dates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

export function resetTime(date: Date): Date {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

export function formatDate(date: Date): string {
  const normalizedDate = new Date(date.getTime());
  normalizedDate.setHours(0, 0, 0, 0);
  return normalizedDate.toISOString().split('T')[0];
}

export const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

export function formatDateForDisplay(date: Date): string {
  return date.toISOString().split('T')[0];  // Or use a more user-friendly format
}


