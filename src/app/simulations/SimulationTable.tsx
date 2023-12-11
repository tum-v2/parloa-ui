'use client';
import { Simulation } from '@/api/schemas/simulation';
import Pill from '@/components/generic/Pill';
import useSimulations from '@/hooks/useSimulations';
import {
  getSimulationStatusBadgeStatus,
  getSimulationTypeStyle
} from '@/lib/utils/simulations/simulationStyles';
import { firstLetterToUpperCase } from '@/lib/utils/text';
import { Badge } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';

const columns: ColumnsType<Simulation> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => {
      const typeStyle = getSimulationTypeStyle(type);
      return (
        <Pill color={typeStyle.color} icon={<typeStyle.icon />}>
          {firstLetterToUpperCase(type)}
        </Pill>
      );
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      return (
        <Badge
          status={getSimulationStatusBadgeStatus(status)}
          text={firstLetterToUpperCase(status)}
        />
      );
    }
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (createdAt: string) => {
      return <span>{new Date(createdAt).toLocaleString()}</span>; // TODO: Change to appropiate format (ask client)
    }
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (updatedAt: string) => {
      return <span>{new Date(updatedAt).toLocaleString()}</span>;
    }
  }
];

const SimulationTable = () => {
  const { data, isLoading, error } = useSimulations();
  const router = useRouter();

  console.log(error);

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
      className="cursor-pointer"
    />
  );
};

export default SimulationTable;
