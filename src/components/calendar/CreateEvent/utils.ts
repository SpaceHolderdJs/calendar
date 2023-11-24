import moment from "moment";
import { FormDataType } from "./types";

export const initialFormData: FormDataType = {
  date: moment(),
  time: moment().format("hh:mm"),
  description: "",
  title: "",
};
