import { Moment } from "moment";
import { CalendarEvent } from "../../../context/CalendatContext/types";

export type CreateEventProps = {
  eventToDisplay?: CalendarEvent;
};

export type FormDataType = {
  title: string;
  date: Moment;
  time?: string;
  description?: string;
};
