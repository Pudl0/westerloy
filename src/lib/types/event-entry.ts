export interface EventEntry {
  id: number;
  attributes: {
    Title: string;
    Description: string;
    TimeOfEvent: Date;
    Location: string;
    Picture: string;
  };
}
