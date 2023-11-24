import {
  ChangeEvent,
  FC,
  MouseEventHandler,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FlexColumn, TextArea } from "react-ui-expert";
import { CalendarContext } from "../../../context/CalendatContext/Provider";
import { Button, Typography } from "@mui/material";
import { CreateEventProps, FormDataType } from "./types";
import { initialFormData } from "./utils";
import { Field } from "./styled";
import { ModalContext } from "../Modal";
import moment, { Moment } from "moment";
import { v4 as uuid } from "uuid";

export const CreateEvent: FC<CreateEventProps> = ({ eventToDisplay }) => {
  const { currentDate, actions } = useContext(CalendarContext)!;
  const { closeModal } = useContext(ModalContext)!;

  const [formData, setFormData] = useState<FormDataType>(
    eventToDisplay || {
      ...initialFormData,
      date: currentDate,
    }
  );

  const { date, title, time, description } = formData;

  const setFormDataValue = useCallback<
    <T = string>(key: keyof FormDataType, value: T) => void
  >((key, value) => {
    setFormData((prevValues) => ({ ...prevValues, [key]: value }));
  }, []);

  const isDisabled = useMemo(() => !title || !date, [date, title]);

  const onEventCreate = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.stopPropagation();
      if (actions) {
        const action: keyof typeof actions = eventToDisplay
          ? "updateEvent"
          : "addEvent";

        actions[action](date.format(`YYYY-MM-DD`), {
          ...formData,
          id: eventToDisplay ? eventToDisplay.id : uuid(),
        });
      }
      closeModal();
    },
    [actions, closeModal, eventToDisplay, date, formData]
  );

  return (
    <FlexColumn width="100%" gap="20px">
      <Typography variant="h6" textAlign="center">
        {eventToDisplay ? "Edit" : "Create"} an event
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
        value={title}
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
