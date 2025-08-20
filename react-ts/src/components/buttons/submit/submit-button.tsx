import type { FormInstance } from 'antd';
import { Button, Form } from 'antd';
import { useEffect, useState } from 'react';

interface SubmitButtonProps {
  form: FormInstance;
  children: React.ReactNode;
}

const SubmitButton = ({ form, children }: SubmitButtonProps) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      {children}
    </Button>
  );
};

export default SubmitButton;
