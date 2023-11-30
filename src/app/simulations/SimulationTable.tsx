'use client';
import { Simulation } from '@/api/schemas/simulation';
import useSimulations from '@/hooks/useSimulations';
import { getSimulationStatusBadgeStatus } from '@/lib/utils/simulations/simulationStyles';
import { firstLetterToUpperCase, underscoresToSpaces } from '@/lib/utils/text';
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
    title: 'Scenario',
    dataIndex: 'scenario',
    key: 'scenario',
    render: (scenario: string) => {
      return (
        <span>{firstLetterToUpperCase(underscoresToSpaces(scenario))}</span>
      );
    }
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (type: string) => {
      return <span>{firstLetterToUpperCase(underscoresToSpaces(type))}</span>;
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
