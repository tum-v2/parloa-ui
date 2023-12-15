import Header from '@/components/generic/Header';
import React from 'react';
import { Flex, Typography, Button } from 'antd';
import Pill from '@/components/generic/Pill';
import { getSimulationTypeStyle } from '@/lib/utils/simulations/simulationStyles';
import { formatLongDateTimeString } from '@/lib/utils/dateTime';
import { Simulation } from '@/api/schemas/simulation';
import { firstLetterToUpperCase, underscoresToSpaces } from '@/lib/utils/text';
import { useRouter } from 'next/navigation';
import theme from '@/theme/theme';
import { SlidersOutlined } from '@ant-design/icons';

interface DetailsHeaderProps {
  simulation: Simulation;
}

const DetailsHeader = ({ simulation }: DetailsHeaderProps) => {
  const { name, createdAt, type } = simulation;

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
          {underscoresToSpaces(firstLetterToUpperCase(type))}
        </Pill>
        {simulation.type === 'OPTIMIZATION' && !simulation.optimization && (
          <Pill color={theme.color.cyan} icon={<SlidersOutlined />}>
            {'Child simulation'}
          </Pill>
        )}
      </Flex>
    </Flex>
  );
};

export default DetailsHeader;
