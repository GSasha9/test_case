import { Button, Form, Input } from 'antd';

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

  return (
    <Form
      form={form}
      name="modal_form"
      onFinish={(values) => {
        onSubmit(values);
        form.resetFields();
      }}
    >
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
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="number"
        name="number"
        rules={[{ required: true, message: 'Please input number!' }]}
      >
        <Input />
      </Form.Item>
      <Button type="default" htmlType="submit">
        add
      </Button>
    </Form>
  );
};

export default ModalForm;
