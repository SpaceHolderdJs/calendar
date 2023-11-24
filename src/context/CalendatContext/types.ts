import { Moment } from "moment";
import { Dispatch } from "react";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  date: Moment;
  time?: string;
}

export interface CalendarContexInterface {
  cellsData: Record<string, Array<CalendarEvent>>;
  currentDate: Moment;

  actions?: {
    addEvent: (date: string, event: CalendarEvent) => void;
    removeEvent: (date: string, event: CalendarEvent) => void;
    updateEvent: (date: string, event: CalendarEvent) => void;
    setCurrentDate: Dispatch<Moment>;
  };
}
