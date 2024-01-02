import React from 'react';
import { Card, Select, Button, Typography, Flex } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import theme from '@/theme/theme';
import { useAppDispatch } from '@/store/hooks';
import {
  setCurrentStep,
  setAgentFlag
} from '@/store/features/CreateSimulation/SimulationControlSlice';
import { Dropdown } from '@/store/features/CreateSimulation/simulationDefinitions';

const { Title, Text } = Typography;

interface ModelCardProps {
  agents: Dropdown[];
  onAgentChange: (value: string) => void;
  onButtonClick: () => void;
  icon: React.ReactNode;
  type: 'serviceAgent' | 'userAgent'; // Replaced title with type
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

const textStyle: React.CSSProperties = {
  marginTop: theme.margin.s // Adding top margin for spacing
};

const buttonStyle: React.CSSProperties = {
  marginRight: theme.margin.s // Adding right margin for spacing between buttons
};

const ModelCard = ({
  agents,
  onAgentChange,
  onButtonClick,
  icon,
  type // Using type prop
}: ModelCardProps) => {
  const dispatch = useAppDispatch();

  const getTitle = () => {
    switch (type) {
      case 'serviceAgent':
        return 'Agent LLM'; // Title for serviceAgent
      case 'userAgent':
        return 'User LLM'; // Title for userAgent
      default:
        return 'Unknown'; // Default title
    }
  };

  const handleButtonClick = () => {
    onButtonClick();
    dispatch(setAgentFlag(type));
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
                onClick={handleButtonClick}
              />
            </Flex>
          </>
        )}

        <Button icon={<PlusOutlined />} onClick={handleButtonClick}>
          Create New Agent
        </Button>
        {agents.length > 0 && (
          <>
            <Text style={textStyle}>Domain: Flight</Text>
            <Text style={textStyle}>LLM Model: GPT 4</Text>
          </>
        )}
      </Flex>
    </Card>
  );
};

export default ModelCard;
