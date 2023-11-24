import { Moment } from "moment";

export type FormDataType = {
  title: string;
  date: Moment;
  time?: string;
  description?: string;
};
