export interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  isAvailable: boolean;
  details: string;
}

export interface CalendarDate {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent: boolean;
  isAvailable?: boolean;
}
