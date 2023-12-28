import React from 'react';
import { Card, Select, Button, Typography, Flex } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import theme from '@/theme/theme';
import { useAppDispatch } from '@/store/hooks';
import { setSimulationFlag } from '@/store/features/CreateSimulation/CreateSimulationSlice';
import { setCurrentStep } from '@/store/features/CreateSimulation/SimulationControlSlice';

const { Title, Text } = Typography;

interface Agent {
  value: string;
  label: string;
}
interface ModelCardProps {
  agents: Agent[];
  onAgentChange: (value: string) => void;
  onButtonClick: () => void;
  onAddClick: () => void; // New prop for handling the click on the plus button
  icon: React.ReactNode;
  title: string;
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
  onAddClick,
  icon,
  title
}: ModelCardProps) => {
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    onButtonClick();
    if (title == 'Agent LLM') {
      dispatch(setSimulationFlag('ServiceAgent'));
    } else {
      dispatch(setSimulationFlag('UserAgent'));
    }
    dispatch(setCurrentStep(3));
  };

  return (
    <Card style={cardStyle} bodyStyle={{ height: '100%' }}>
      <Flex justify="center" align="center" className="h-full" vertical>
        <Title level={4}>{title}</Title>
        <div style={iconStyle}>{icon}</div>

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
        <Button
          icon={<PlusOutlined />}
          onClick={onAddClick} // Using the new click handler
        >
          Create New Agent
        </Button>
        <Text style={textStyle}>Domain: Flight</Text>
        <Text style={textStyle}>LLM Model: GPT 4</Text>
      </Flex>
    </Card>
  );
};

export default ModelCard;
