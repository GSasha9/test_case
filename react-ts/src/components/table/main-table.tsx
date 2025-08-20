import type { TableProps } from 'antd';
import { Modal, Space, Table } from 'antd';
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
    date: '2025-11-05',
    number: 42,
  },
  {
    key: '2',
    name: 'John',
    date: '2025-06-14',
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
