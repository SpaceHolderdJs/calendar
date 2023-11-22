import { Dispatch } from "react";

export interface CalendarEvent {
  title: string;
  description?: string;
  date: string;
  time?: string;
}

export interface CalendarContexInterface {
  cellsData: Record<string, Array<CalendarEvent>>;
  dateDetails: { d: number; m: number; y: number };

  actions?: {
    setCurrentMonth: (m: number) => void;
    setCurrentDay: (d: number) => void;
    setCurrentYear: (y: number) => void;
    addEvent: (date: string, event: CalendarEvent) => void;
    setDateDetails: Dispatch<{ d: number; m: number; y: number }>;
  };
}
