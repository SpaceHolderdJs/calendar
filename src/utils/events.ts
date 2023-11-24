import moment from "moment";
import { CalendarEvent } from "../context/CalendatContext/types";

export const sortEvents = (events: CalendarEvent[]) => {
  const eventsWithTime = events.filter(({ time }) => time);
  const eventsWithoutTime = events.filter(({ time }) => !time);

  eventsWithTime.sort((e1, e2) => {
    const e1MomentTime = moment(e1.time, "hh:mm");
    const e2MomentTime = moment(e2.time, "hh:mm");

    return e1MomentTime.isAfter(e2MomentTime) ? 1 : -1;
  });

  return [...eventsWithTime, ...eventsWithoutTime];
};
