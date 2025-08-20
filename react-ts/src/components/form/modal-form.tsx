import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';

import SubmitButton from '../buttons/submit/submit-button';

export type FieldType = {
  name: string;
  date: string;
  number: number;
};

interface ModalFormProps {
  onSubmit: (values: FieldType) => void;
}

const ModalForm = ({ onSubmit }: ModalFormProps) => {
  const [form] = Form.useForm();

  const handleFinish = (values: FieldType) => {
    form.resetFields();
    onSubmit(values);
  };

  return (
    <Form form={form} name="modal_form" onFinish={handleFinish}>
      <Form.Item<FieldType>
        label="name"
        name="name"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="date"
        name="date"
        getValueProps={(value) => ({
          value: value && dayjs(Number(value)),
        })}
        normalize={(value) => value && `${dayjs(value).format('YYYY-MM-DD')}`}
        rules={[{ required: true, message: 'Please input date!' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item<FieldType>
        label="number"
        name="number"
        rules={[{ required: true, message: 'Please input number!' }]}
      >
        <Input />
      </Form.Item>
      <SubmitButton form={form}>Add</SubmitButton>
    </Form>
  );
};

export default ModalForm;
