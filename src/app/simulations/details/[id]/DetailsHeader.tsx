import Header from '@/components/generic/Header';
import React from 'react';
import { Flex, Typography, Button } from 'antd';
import Pill from '@/components/generic/Pill';
import {
  getAgentLLMColor,
  getSimulationTypeStyle
} from '@/lib/utils/simulations/simulationStyles';
import theme from '@/theme/theme';
import {
  FileTextOutlined,
  FolderOpenOutlined,
  CustomerServiceOutlined,
  UserOutlined
} from '@ant-design/icons';
import { formatLongDateTimeString } from '@/lib/utils/dateTime';
import { Simulation } from '@/api/schemas/simulation';

interface DetailsHeaderProps {
  simulation: Simulation;
}

const DetailsHeader = ({ simulation }: DetailsHeaderProps) => {
  const { name, createdAt, agents, scenario, domain, type } = simulation;

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
          {type}
        </Pill>
        {agents.map((agent, i) => (
          <Pill
            key={agent._id}
            color={getAgentLLMColor(agent.llm)}
            icon={i === 0 ? <CustomerServiceOutlined /> : <UserOutlined />}
          >
            {agent.llm}
          </Pill>
        ))}
        <Pill icon={<FolderOpenOutlined />} color={theme.color.green}>
          {domain}
        </Pill>
        <Pill icon={<FileTextOutlined />} color={theme.color.cyan}>
          {scenario}
        </Pill>
      </Flex>
    </Flex>
  );
};

export default DetailsHeader;
