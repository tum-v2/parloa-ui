import React from 'react';
import { Card, Select, Button, Typography, Flex } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import theme from '@/theme/theme';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  setCurrentStep,
  setAgentFlag,
  setIsWildStep
} from '@/store/features/CreateSimulation/SimulationControlSlice';
import {
  setServiceAgentConfig,
  setUserAgentConfig
} from '@/store/features/CreateSimulation/CreateSimulationSlice';
import {
  resetAgentState,
  setType as setAgentType
} from '@/store/features/CreateSimulation/CreateAgentSlice';
import Pill from '@/components/generic/Pill';

const { Title } = Typography;

interface AgentCardProps {
  icon: React.ReactNode;
  type: 'SERVICE' | 'USER';
}

const cardStyle: React.CSSProperties = {
  border: '1px solid',
  height: '100%',
  width: '100%',
  minWidth: '200px'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: theme.margin.s,
  fontSize: theme.fontSize.m
};

const iconStyle: React.CSSProperties = { margin: theme.margin.l };

const selectStyle: React.CSSProperties = {
  flex: 1,
  marginRight: theme.margin.m
};

const buttonStyle: React.CSSProperties = {
  marginRight: theme.margin.s // Adding right margin for spacing between buttons
};

const AgentCard = ({
  icon,
  type // Using type prop
}: AgentCardProps) => {
  const simulation = useAppSelector(state => state.simulation);
  const simulationData = useAppSelector(state => state.simulationData);

  const agents =
    type === 'SERVICE'
      ? simulationData.serviceAgents
      : simulationData.userAgents;
  const domain =
    type === 'SERVICE'
      ? simulation.serviceAgentConfig.domain
      : simulation.userAgentConfig.domain;
  const llm =
    type === 'SERVICE'
      ? simulation.serviceAgentConfig.llm
      : simulation.userAgentConfig.llm;

  const dispatch = useAppDispatch();

  const getTitle = () => {
    switch (type) {
      case 'SERVICE':
        return 'Service Agent'; // Title for serviceAgent
      case 'USER':
        return 'User Agent'; // Title for userAgent
      default:
        return 'Unknown'; // Default title
    }
  };

  const onAgentChange = (value: string) => {
    if (type === 'SERVICE') {
      const serviceAgent = simulationData.serviceAgentsWithConfig.find(
        agent => agent._id === value
      );
      if (serviceAgent != undefined) {
        dispatch(setServiceAgentConfig(serviceAgent));
      }
    } else {
      const userAgent = simulationData.userAgentsWithConfig.find(
        agent => agent._id === value
      );
      if (userAgent != undefined) {
        dispatch(setUserAgentConfig(userAgent));
      }
    }
  };

  const handleEditClick = () => {
    dispatch(setIsWildStep(true));
    dispatch(setAgentFlag(type));
    dispatch(setCurrentStep(3));
  };

  const handleAddButtonClick = () => {
    dispatch(resetAgentState());
    dispatch(setIsWildStep(true));
    dispatch(setAgentFlag(type));
    dispatch(setAgentType(type));
    dispatch(setCurrentStep(3));
  };

  return (
    <Card style={cardStyle} bodyStyle={{ height: '100%' }}>
      <Flex justify="center" align="center" className="h-full" vertical>
        <Title level={4}>{getTitle()}</Title>
        <div style={iconStyle}>{icon}</div>

        {agents.length > 0 && (
          <>
            <label htmlFor="agent" style={labelStyle}>
              Choose an Agent
            </label>
            <Flex align="center" className="w-full mb-4">
              <Select
                placeholder="Select an agent"
                style={selectStyle}
                onChange={value => onAgentChange(value)}
                options={agents}
              />
              <Button
                style={buttonStyle}
                type="primary"
                icon={<EditOutlined />}
                onClick={handleEditClick}
              />
            </Flex>
          </>
        )}

        <Button icon={<PlusOutlined />} onClick={handleAddButtonClick}>
          Create New Agent
        </Button>
        {agents.length > 0 && (
          <div className="flex m-4">
            <Pill color={theme.color.blue}>{domain}</Pill>
            <Pill color={theme.color.pink}>{llm}</Pill>
          </div>
        )}
      </Flex>
    </Card>
  );
};

export default AgentCard;
