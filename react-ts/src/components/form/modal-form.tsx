import { DatePicker, Form, Input } from 'antd';

import SubmitButton from '../buttons/submit/submit-button';
import onFinish, { type MyFormValues } from './utils/on-finish';

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

  const handleFinish = (values: MyFormValues) => {
    const formattedValues = onFinish(values);

    form.resetFields();
    onSubmit(formattedValues);
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
