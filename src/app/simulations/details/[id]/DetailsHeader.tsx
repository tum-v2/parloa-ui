import Header from '@/components/generic/Header';
import React from 'react';
import { Flex, Typography, Button } from 'antd';
import Pill from '@/components/generic/Pill';
import { getSimulationTypeStyle } from '@/lib/utils/simulations/simulationStyles';
import theme from '@/theme/theme';
import { FileTextOutlined } from '@ant-design/icons';
import { formatLongDateTimeString } from '@/lib/utils/dateTime';
import { Simulation } from '@/api/schemas/simulation';
import { useRouter } from 'next/navigation';

interface DetailsHeaderProps {
  simulation: Simulation;
}

const DetailsHeader = ({ simulation }: DetailsHeaderProps) => {
  const { name, createdAt, scenario, type } = simulation;
  const typeStyle = getSimulationTypeStyle(type);
  const router = useRouter();

  const viewChatHistory = () => {
    router.push(`/simulations/details/${simulation._id}/chat`);
  };

  return (
    <Flex vertical gap={'small'}>
      <Flex justify="space-between" align="center" dir="row">
        <Header title={name} style={{ margin: 0 }} />
        <Button type="primary" onClick={viewChatHistory}>
          View chat history
        </Button>
      </Flex>
      <Typography.Text type="secondary">
        {formatLongDateTimeString(createdAt)}
      </Typography.Text>
      <Flex justify="flex-start" align="center" dir="row">
        <Pill color={typeStyle.color} icon={<typeStyle.icon />}>
          {type}
        </Pill>
        <Pill icon={<FileTextOutlined />} color={theme.color.cyan}>
          {scenario}
        </Pill>
      </Flex>
    </Flex>
  );
};

export default DetailsHeader;
