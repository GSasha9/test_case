import type { FormInstance } from 'antd';
import { Button, DatePicker, Form, Input, Space } from 'antd';
import { Dayjs } from 'dayjs';

import SubmitButton from '../buttons/submit/submit-button';

import TABLE_DATA from '@/shared/constants/table-data';

export type FieldType = {
  name: string;
  date: Dayjs;
  number: number;
};

interface ModalFormProps {
  form: FormInstance;
  onSubmit: (values: FieldType) => void;
}

const ModalForm = ({ form, onSubmit }: ModalFormProps) => {
  const handleFinish = (values: FieldType) => {
    form.resetFields();
    onSubmit(values);
  };

  return (
    <Form form={form} name="modal_form" onFinish={handleFinish}>
      <Form.Item<FieldType>
        label={TABLE_DATA.name.dataIndex}
        name="name"
        rules={[
          { required: true, message: TABLE_DATA.name.inputPlaceholder },
          {
            pattern: /^[A-Za-z]+$/,
            message: TABLE_DATA.name.errorMessage,
          },
        ]}
      >
        <Input placeholder={TABLE_DATA.name.inputPlaceholder} />
      </Form.Item>
      <Form.Item<FieldType>
        label={TABLE_DATA.date.dataIndex}
        name="date"
        rules={[{ required: true, message: TABLE_DATA.date.errorMessage }]}
      >
        <DatePicker placeholder={TABLE_DATA.date.inputPlaceholder} />
      </Form.Item>
      <Form.Item<FieldType>
        label={TABLE_DATA.number.dataIndex}
        name="number"
        rules={[
          { required: true, message: TABLE_DATA.number.inputPlaceholder },
          { pattern: /^[0-9]+$/, message: TABLE_DATA.number.errorMessage },
        ]}
      >
        <Input placeholder={TABLE_DATA.number.inputPlaceholder} />
      </Form.Item>
      <Space size={'middle'}>
        {' '}
        <SubmitButton form={form}>Add</SubmitButton>
        <Button htmlType="reset" onClick={() => form.resetFields()}>
          Reset
        </Button>
      </Space>
    </Form>
  );
};

export default ModalForm;
