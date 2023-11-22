import {
  PropsWithChildren,
  FC,
  useState,
  useCallback,
  createContext,
} from "react";
import moment from "moment";
import { CalendarContexInterface, CalendarEvent } from "./types";
import { generateCellsDataForYear } from "../../utils/cellData";

export const CalendarContext = createContext<CalendarContexInterface | null>(
  null
);

export const CalendarContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [dateDetails, setDateDetails] = useState({
    d: moment().date(),
    m: moment().month(),
    y: moment().year(),
  });

  const setCurrentDay = useCallback((d: number) => {
    setDateDetails((prev) => ({ ...prev, d }));
  }, []);

  const setCurrentMonth = useCallback((m: number) => {
    setDateDetails((prev) => ({ ...prev, m }));
  }, []);

  const setCurrentYear = useCallback((y: number) => {
    setDateDetails((prev) => ({ ...prev, y }));
  }, []);

  const [cellsData, setCellsData] = useState<
    Record<string, Array<CalendarEvent>>
  >(generateCellsDataForYear(dateDetails.y));

  const addEvent = useCallback<(date: string, event: CalendarEvent) => void>(
    (date, event) => {
      setCellsData((prevData) => ({
        ...prevData,
        [date]: [...prevData[date], event],
      }));
    },
    []
  );

  return (
    <CalendarContext.Provider
      value={{
        dateDetails,
        cellsData,
        actions: {
          setDateDetails,
          setCurrentDay,
          setCurrentMonth,
          setCurrentYear,
          addEvent,
        },
      }}>
      {children}
    </CalendarContext.Provider>
  );
};
