import moment from 'moment';
import { ChangeEvent, useCallback, useContext, useState } from 'react';
import { FlexColumn, TextArea } from 'react-ui-expert';
import { CalendarContext } from '../../../context/CalendatContext/Provider';
import { Button, Typography } from '@mui/material';
import { FormDataType } from './types';
import { initialFormData } from './utils';
import { Field } from './styled';

export const CreateEvent = () => {
  const { dateDetails } = useContext(CalendarContext)!;
  const { d, m, y } = dateDetails;

  const [formData, setFormData] = useState<FormDataType>({
    ...initialFormData,
    date: moment(`${y}-${m + 1}-${d}`, `YYYY-MM-DD`).format(`YYYY-MM-DD`),
  });

  const { date } = formData;

  const setFormDataValue = useCallback(
    (key: keyof FormDataType, value: string) => {
      setFormData((prevValues) => ({ ...prevValues, [key]: value }));
    },
    []
  );

  return (
    <FlexColumn width='100%' gap='20px'>
      <Typography variant='h6' textAlign='center'>
        Create an event
      </Typography>
      <Field
        type='date'
        value={moment(`${date}`, `YYYY-MM-DD`).format(`YYYY-MM-DD`)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormDataValue('date', e.target.value)
        }
      />
      <Field
        type='time'
        value={moment(`${y}-${m + 1}-${d}`, `YYYY-MM-DD`).format(`YYYY-MM-DD`)}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormDataValue('time', e.target.value)
        }
      />
      <Field
        type='text'
        placeholder='Title'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormDataValue('title', e.target.value)
        }
      />
      <TextArea
        as={Field}
        placeholder='Description'
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFormDataValue('description', e.target.value)
        }
      />
      <Button variant='contained' sx={{ marginTop: '10px' }}>
        Done!
      </Button>
    </FlexColumn>
  );
};
