import {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FlexColumn, TextArea } from "react-ui-expert";
import { CalendarContext } from "../../../context/CalendatContext/Provider";
import { Button, Typography } from "@mui/material";
import { FormDataType } from "./types";
import { initialFormData } from "./utils";
import { Field } from "./styled";
import { ModalContext } from "../Modal";
import moment, { Moment } from "moment";

export const CreateEvent: FC = () => {
  const { currentDate, actions } = useContext(CalendarContext)!;
  const { closeModal } = useContext(ModalContext)!;

  const [formData, setFormData] = useState<FormDataType>({
    ...initialFormData,
    date: currentDate,
  });

  const { date, title, time, description } = formData;

  const setFormDataValue = useCallback<
    <T = string>(key: keyof FormDataType, value: T) => void
  >((key, value) => {
    setFormData((prevValues) => ({ ...prevValues, [key]: value }));
  }, []);

  const isDisabled = useMemo(() => !title || !date, [date, title]);

  const onEventCreate = useCallback(() => {
    actions?.addEvent(date.format(`YYYY-MM-DD`), formData);
    closeModal();
  }, [actions, date, formData, closeModal]);

  return (
    <FlexColumn width="100%" gap="20px">
      <Typography variant="h6" textAlign="center">
        Create an event
      </Typography>
      <Field
        type="date"
        value={date.format(`YYYY-MM-DD`)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormDataValue<Moment>("date", moment(e.target.value, `YYYY-MM-DD`))
        }
      />
      <Field
        type="time"
        value={time}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormDataValue("time", e.target.value)
        }
      />
      <Field
        type="text"
        placeholder="Title"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormDataValue("title", e.target.value)
        }
      />
      <TextArea
        as={Field}
        placeholder="Description"
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormDataValue("description", e.target.value)
        }
      />
      <Button
        disabled={isDisabled}
        variant="contained"
        sx={{ marginTop: "10px" }}
        onClick={onEventCreate}>
        Done!
      </Button>
    </FlexColumn>
  );
};
