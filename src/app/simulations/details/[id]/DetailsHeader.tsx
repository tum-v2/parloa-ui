import Header from '@/components/generic/Header';
import React from 'react';
import { Flex, Typography, Button } from 'antd';
import Pill from '@/components/generic/Pill';
import { getSimulationTypeStyle } from '@/lib/utils/simulations/simulationStyles';
import theme from '@/theme/theme';
import { FileTextOutlined } from '@ant-design/icons';
import { formatLongDateTimeString } from '@/lib/utils/dateTime';
import { Simulation } from '@/api/schemas/simulation';
import { firstLetterToUpperCase, underscoresToSpaces } from '@/lib/utils/text';

interface DetailsHeaderProps {
  simulation: Simulation;
}

const DetailsHeader = ({ simulation }: DetailsHeaderProps) => {
  const { name, createdAt, scenario, type } = simulation;

  const typeStyle = getSimulationTypeStyle(type);

  return (
    <Flex vertical gap={'small'}>
      <Flex justify="space-between" align="center" dir="row">
        <Header title={name} style={{ margin: 0 }} />
        <Button type="primary">View chat history</Button>
      </Flex>
      <Typography.Text type="secondary">
        {formatLongDateTimeString(createdAt)}
      </Typography.Text>
      <Flex justify="flex-start" align="center" dir="row">
        <Pill color={typeStyle.color} icon={<typeStyle.icon />}>
          {underscoresToSpaces(firstLetterToUpperCase(type))}
        </Pill>
        <Pill icon={<FileTextOutlined />} color={theme.color.cyan}>
          {underscoresToSpaces(firstLetterToUpperCase(scenario))}
        </Pill>
      </Flex>
    </Flex>
  );
};

export default DetailsHeader;
