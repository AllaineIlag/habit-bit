import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { SYSTEM_TIMEZONE } from '@/config/timeline';

/**
 * Returns the current date in the system's defined timezone as an 'yyyy-MM-dd' string.
 */
export function getZonedToday(): string {
  return format(toZonedTime(new Date(), SYSTEM_TIMEZONE), 'yyyy-MM-dd');
}

/**
 * Converts any date or timestamp to a 'yyyy-MM-dd' string in the system's timezone.
 */
export function formatInSystemTimezone(date: Date | string | number): string {
  return format(toZonedTime(new Date(date), SYSTEM_TIMEZONE), 'yyyy-MM-dd');
}

/**
 * Generates the last N days as 'yyyy-MM-dd' strings, aligned with the system timezone.
 */
export function getLastNDays(n: number): string[] {
  const days: string[] = [];
  const today = toZonedTime(new Date(), SYSTEM_TIMEZONE);
  
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(format(d, 'yyyy-MM-dd'));
  }
  
  return days;
}
