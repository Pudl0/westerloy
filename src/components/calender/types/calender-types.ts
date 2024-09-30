export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  event?: CalendarEvent;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  details: string;
}

export interface CalendarProps {
  currentDate: Date;
  calendarDays: CalendarDate[];
  changeMonth: (delta: number) => void;
  goToCurrentMonth: () => void;
  isCurrentMonth: boolean;
}

export interface CalendarHeaderProps {
  currentDate: Date;
  isCurrentMonth: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onGoToCurrentMonth: () => void;
}

export interface CalendarGridProps {
  calendarDays: CalendarDate[];
  onDayClick: (day: CalendarDate) => void;
}

export interface EventFormProps {
  onSubmit: (values: Omit<CalendarEvent, 'id'>) => Promise<void>;
  initialDate?: Date;
}
