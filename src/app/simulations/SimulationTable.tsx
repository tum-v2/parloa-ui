'use client';
import { Simulation, SimulationType } from '@/api/schemas/simulation';
import Pill from '@/components/generic/Pill';
import useSimulations from '@/hooks/useSimulations';
import {
  getSimulationStatusBadgeStatus,
  getSimulationTypeStyle
} from '@/lib/utils/simulations/simulationStyles';
import { firstLetterToUpperCase } from '@/lib/utils/text';
import { Badge, Button, Popconfirm, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useRouter } from 'next/navigation';
import { DeleteOutlined } from '@ant-design/icons';
import useDeleteSimulation from '@/hooks/useDeleteSimulation';

const SimulationTable = () => {
  const { data, isLoading } = useSimulations();
  const router = useRouter();
  const deleteSimulation = useDeleteSimulation();

  const columns: ColumnsType<Simulation> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, record) => (
        <a onClick={() => handleRowClick(record)}>{record.name}</a>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.type.localeCompare(b.type),
      render: (type: SimulationType) => {
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
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => a.status.localeCompare(b.status),
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
      defaultSortOrder: 'descend',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
      },
      render: (createdAt: string) => {
        return <span>{new Date(createdAt).toLocaleString()}</span>; // TODO: Change to appropiate format (ask client)
      }
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sortDirections: ['ascend', 'descend'],
      sorter: (a, b) => {
        return Date.parse(a.updatedAt) - Date.parse(b.updatedAt);
      },
      render: (updatedAt: string) => {
        return <span>{new Date(updatedAt).toLocaleString()}</span>;
      }
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Confirm to delete?"
          onConfirm={() => {
            deleteSimulation.mutate({ _id: record._id });
          }}
        >
          <Space size="middle">
            <Button type="link" danger>
              <DeleteOutlined />
            </Button>
          </Space>
        </Popconfirm>
      )
    }
  ];

  //Handle row click
  const handleRowClick = (record: Simulation) => {
    //Route to simulation chat page if simulation is of type CHAT
    if (record.type === 'CHAT') {
      router.push(`/simulations/details/${record._id}/chat`);
    } else {
      router.push(`/simulations/details/${record._id}`);
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={data}
      loading={isLoading}
      rowKey={record => record._id}
      className="cursor-pointer"
    />
  );
};

export default SimulationTable;
