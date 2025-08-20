import type { TableProps } from 'antd';
import { Button, Form, Input, Modal, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import ModalForm, { type FieldType } from '../form/modal-form';

import { dataExample } from '@/shared/constants/data-example';
import TABLE_DATA from '@/shared/constants/table-data';
import type { DataType } from '@/shared/types/data-type';

const MainTable = () => {
  const [tableData, setTableData] = useState(dataExample);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    if (!isModalOpen) form.resetFields();
  }, [isModalOpen, form]);

  const handleButton = () => {
    setIsModalOpen(true);
  };

  const handleSearchInput = (searchText: string) => {
    setSearchValue(searchText);
  };

  const getFilteredData = () => {
    if (!searchValue) return tableData;

    return tableData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };

  const handleEdit = (record: DataType) => {
    setSearchValue('');
    setEditingRecord(record);
    form.setFieldsValue({
      name: record.name,
      date: dayjs(record.date),
      number: record.number,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (key: string) => {
    setTableData((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSubmit = (values: FieldType) => {
    setSearchValue('');

    if (editingRecord) {
      setTableData((prev) =>
        prev.map((item) =>
          item.key === editingRecord.key
            ? {
                ...item,
                name: values.name,
                date: values.date.format('YYYY-MM-DD'),
                number: values.number,
              }
            : item
        )
      );
      setEditingRecord(null);
    } else {
      setTableData((prev) => [
        ...prev,
        {
          key: String(prev.length + 1),
          name: values.name,
          date: values.date.format('YYYY-MM-DD'),
          number: values.number,
        },
      ]);
    }

    setIsModalOpen(false);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: TABLE_DATA.name.title,
      dataIndex: TABLE_DATA.name.dataIndex,
      key: TABLE_DATA.name.key,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: TABLE_DATA.date.title,
      dataIndex: TABLE_DATA.date.dataIndex,
      key: TABLE_DATA.date.key,
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: TABLE_DATA.number.title,
      dataIndex: TABLE_DATA.number.dataIndex,
      key: TABLE_DATA.number.key,
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: TABLE_DATA.action.title,
      key: TABLE_DATA.action.key,
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.key)} danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space size={'middle'}>
        <Input
          placeholder="search"
          value={searchValue ?? ''}
          onChange={(e) => handleSearchInput(e.target.value)}
        />{' '}
        <Button type="primary" onClick={handleButton}>
          {' '}
          Add new row{' '}
        </Button>
      </Space>

      <Table<DataType> dataSource={getFilteredData()} columns={columns} />
      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingRecord(null);
        }}
        footer={null}
      >
        <ModalForm form={form} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};

export default MainTable;
