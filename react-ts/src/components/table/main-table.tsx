import { Table, Space, Modal } from 'antd';
import type { TableProps } from 'antd';
import { useState } from 'react';
import ModalForm from '../form/modal-form';

interface DataType {
  key: string;
  name: string;
  date: string;
  number: number;
}

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'Mike',
    date: '11.05.2025',
    number: 42,
  },
  {
    key: '2',
    name: 'John',
    date: '15.06.2025',
    number: 42,
  },
];

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Number',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

interface MainTableProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainTable = ({ isOpen, onClose }: MainTableProps) => {
  const [tableData, setTableData] = useState(dataSource);

  console.log(tableData);

  return (
    <>
      <Table<DataType> dataSource={tableData} columns={columns} />
      <Modal open={isOpen} onCancel={onClose} footer={null}>
        <ModalForm
          onSubmit={(values) => {
            setTableData([
              ...tableData,
              { key: Date.now().toString(), ...values },
            ]);
            onClose();
          }}
        />
      </Modal>
    </>
  );
};

export default MainTable;
