import { Dayjs } from 'dayjs';

import type { FieldType } from '../modal-form';

export interface MyFormValues {
  date: Dayjs;
  name: string;
  number: number;
}

const onFinish = (fieldsValue: MyFormValues): FieldType => {
  return {
    name: fieldsValue.name,
    date: fieldsValue.date.format('YYYY-MM-DD'),
    number: fieldsValue.number,
  };
};

export default onFinish;
