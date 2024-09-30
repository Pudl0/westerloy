import { eachDayOfInterval, endOfMonth, endOfWeek, isSameMonth, isToday, startOfMonth, startOfWeek } from 'date-fns';
import { useCallback, useMemo, useState } from 'react';

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = useCallback((increment: number) => {
    setCurrentDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + increment, 1));
  }, []);

  const goToCurrentMonth = useCallback(() => {
    setCurrentDate(new Date());
  }, []);

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd }).map((date) => ({
      date,
      isCurrentMonth: isSameMonth(date, monthStart),
      isToday: isToday(date),
      hasEvent: false,
      isAvailable: undefined,
    }));
  }, [currentDate]);

  const isCurrentMonth = useMemo(() => {
    const now = new Date();
    return currentDate.getMonth() === now.getMonth() && currentDate.getFullYear() === now.getFullYear();
  }, [currentDate]);

  return {
    currentDate,
    calendarDays,
    changeMonth,
    goToCurrentMonth,
    isCurrentMonth,
  };
}
