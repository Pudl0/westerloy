import { CalendarDate } from '@/components/calender/types/calender-types';
import { cn } from '@/lib/utils/utils';

interface CalendarGridProps {
  calendarDays: CalendarDate[];
  onDayClick: (day: CalendarDate) => void;
}

export function CalendarGrid({ calendarDays, onDayClick }: CalendarGridProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow">
      <div className="grid grid-cols-7 gap-px border-b border-gray-200 bg-gray-50">
        {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
          <div key={day} className="py-2 text-center text-sm font-semibold text-gray-700">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {calendarDays.map((day, index) => (
          <button
            key={index}
            onClick={() => onDayClick(day)}
            className={cn(
              'flex h-14 flex-col items-center justify-center p-1 text-sm transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500',
              day.isCurrentMonth ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 text-gray-400',
              day.isToday && 'font-bold',
              day.event ? 'bg-red-100 text-red-800 hover:bg-red-200' : 'bg-green-100 text-green-800 hover:bg-green-200'
            )}
          >
            <time
              dateTime={day.date.toISOString().split('T')[0]}
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full',
                day.isToday && 'bg-blue-500 text-white'
              )}
            >
              {day.date.getDate()}
            </time>
            {day.event && <span className="mt-1 h-1 w-1 rounded-full bg-red-600" aria-hidden="true"></span>}
          </button>
        ))}
      </div>
    </div>
  );
}
