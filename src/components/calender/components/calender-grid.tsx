import { WEEKDAYS } from '@/components/calender/constants';
import { CalendarDate } from '@/components/calender/types/calender-types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/utils';

interface CalendarGridProps {
  calendarDays: CalendarDate[];
  onDayClick: (date: Date) => void;
}

export function CalendarGrid({ calendarDays, onDayClick }: CalendarGridProps) {
  return (
    <div className="mb-4 grid grid-cols-7 gap-2">
      {WEEKDAYS.map((day) => (
        <div key={day} className="pb-2 text-center font-bold">
          {day.slice(0, 2)}
        </div>
      ))}
      {calendarDays.map((day, index) => (
        <Button
          key={index}
          onClick={() => onDayClick(day.date)}
          variant="outline"
          className={cn(
            'h-16',
            day.isCurrentMonth ? 'bg-background' : 'bg-muted text-muted-foreground',
            day.isToday && 'ring-2 ring-primary',
            day.isAvailable ? 'bg-green-100 hover:bg-green-200' : 'bg-red-100 hover:bg-red-200'
          )}
        >
          {day.date.getDate()}
        </Button>
      ))}
    </div>
  );
}
