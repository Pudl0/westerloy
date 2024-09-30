import { ChevronLeft, ChevronRight } from 'lucide-react';

import { MONTHS } from '@/components/calender/constants';
import { Button } from '@/components/ui/button';

interface CalendarHeaderProps {
  currentDate: Date;
  isCurrentMonth: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToCurrentMonth: () => void;
}

export function CalendarHeader({
  currentDate,
  isCurrentMonth,
  onPrevMonth,
  onNextMonth,
  onGoToCurrentMonth,
}: CalendarHeaderProps) {
  return (
    <div className="mb-8 flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0">
      <Button
        onClick={onPrevMonth}
        variant="outline"
        size="lg"
        className="flex w-full items-center justify-center space-x-2 px-6 py-3 text-lg sm:w-auto"
        aria-label="Vorheriger Monat"
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sm:inline">Zurück</span>
      </Button>
      <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-6 sm:space-y-0">
        <h2 className="text-center text-2xl font-bold sm:text-left sm:text-3xl">
          {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        {!isCurrentMonth && (
          <Button onClick={onGoToCurrentMonth} variant="secondary" size="lg" className="w-full px-6 py-3 sm:w-auto">
            Dieser Monat
          </Button>
        )}
      </div>
      <Button
        onClick={onNextMonth}
        variant="outline"
        size="lg"
        className="flex w-full items-center justify-center space-x-2 px-6 py-3 text-lg sm:w-auto"
        aria-label="Nächster Monat"
      >
        <span className="sm:inline">Vor</span>
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
