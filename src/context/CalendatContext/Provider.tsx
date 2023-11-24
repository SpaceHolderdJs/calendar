import {
  PropsWithChildren,
  FC,
  useState,
  useCallback,
  createContext,
} from "react";
import moment, { Moment } from "moment";
import { CalendarContexInterface, CalendarEvent } from "./types";
import { generateCellsDataForYear } from "../../utils/cellData";
import { sortEvents } from "../../utils/events";

export const CalendarContext = createContext<CalendarContexInterface | null>(
  null
);

export const CalendarContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

  console.log(currentDate);

  const [cellsData, setCellsData] = useState<
    Record<string, Array<CalendarEvent>>
  >(generateCellsDataForYear(currentDate));

  const addEvent = useCallback<(date: string, event: CalendarEvent) => void>(
    (date, event) => {
      setCellsData((prevData) => ({
        ...prevData,
        [date]: sortEvents([...(prevData[date] || []), event]),
      }));
    },
    []
  );

  const removeEvent = useCallback<(date: string, event: CalendarEvent) => void>(
    (date, event) => {
      setCellsData((prevData) => ({
        ...prevData,
        [date]: [...(prevData[date] || []).filter(({ id }) => id !== event.id)],
      }));
    },
    []
  );

  const updateEvent = useCallback<(date: string, event: CalendarEvent) => void>(
    (date, event) => {
      setCellsData((prevData) => ({
        ...prevData,
        [date]: sortEvents([
          ...(prevData[date] || []).map(({ id }, i, arr) =>
            id === event.id ? event : arr[i]
          ),
        ]),
      }));
    },
    []
  );

  console.log(cellsData);

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        cellsData,
        actions: {
          setCurrentDate,
          addEvent,
          removeEvent,
          updateEvent,
        },
      }}>
      {children}
    </CalendarContext.Provider>
  );
};
