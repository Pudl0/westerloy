export const WEEKDAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];

export const MONTHS = [
  'Januar',
  'Februar',
  'März',
  'April',
  'Mai',
  'Juni',
  'Juli',
  'August',
  'September',
  'Oktober',
  'November',
  'Dezember',
];

export const API_ROUTES = {
  CALENDAR_EVENTS: '/api/calenderevents',
};

export const FORM_VALIDATION = {
  TITLE_MIN_LENGTH: 2,
  DETAILS_MIN_LENGTH: 10,
};

export const TOAST_MESSAGES = {
  EVENT_CREATED: (title: string, date: string) => `"${title}" wurde erfolgreich für den ${date} erstellt.`,
  EVENT_CREATION_ERROR: 'Der Kalendereintrag konnte nicht erstellt werden. Bitte versuchen Sie es erneut.',
  EVENTS_FETCH_ERROR: 'Die Kalenderereignisse konnten nicht geladen werden.',
};
