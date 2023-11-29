'use client';
import { Simulation } from '@/api/schemas/simulation';
import useSimulations from '@/hooks/useSimulations';
import Table, { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';

const columns: ColumnsType<Simulation> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Scenario',
    dataIndex: 'scenario',
    key: 'scenario'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  }
];

const SimulationTable = () => {
  const { data, isLoading } = useSimulations();
  const router = useRouter();

  //Handle row click
  const handleRowClick = (record: Simulation) => {
    router.push(`/simulations/details/${record._id}`);
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      rowKey={record => record._id}
      onRow={record => {
        return {
          onClick: () => handleRowClick(record)
        };
      }}
    />
  );
};

export default SimulationTable;
