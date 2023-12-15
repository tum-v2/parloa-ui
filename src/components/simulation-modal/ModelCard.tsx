import React from 'react';
import { Card, Select, Input, Button, Typography, Flex } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setSimulationFlag } from '@/store/features/CreateSimulation/CreateSimulationSlice';

const { Option } = Select;
const { Title } = Typography;

interface ModelCardProps {
  models: string[];
  onInputChange: (value: string) => void;
  onModelChange: (value: string) => void;
  onButtonClick: () => void;
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

const inputStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: theme.margin.m
};

const selectStyle: React.CSSProperties = {
  flex: 1,
  marginRight: theme.margin.m
};

const ModelCard = ({
  models,
  onInputChange,
  onModelChange,
  onButtonClick,
  icon,
  title
}: ModelCardProps) => {
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  const handleButtonClick = () => {
    onButtonClick();
    if (title == 'Agent LLM') {
      dispatch(setSimulationFlag('ServiceAgent'));
    } else {
      dispatch(setSimulationFlag('UserAgent'));
    }
    console.log(`Simulation Flag changed to: ${simulation.Flag}`);
  };

  return (
    <Card style={cardStyle} bodyStyle={{ height: '100%' }}>
      <Flex justify="center" align="center" className="h-full" vertical>
        <Title level={4}>{title}</Title>
        <div style={iconStyle}>{icon}</div>
        <Input
          placeholder="Please Name your Agent"
          style={inputStyle}
          onChange={e => onInputChange(e.target.value)}
        />
        <label htmlFor="model" style={labelStyle}>
          Chose a LLM Model
        </label>
        <Flex align="center" className="w-full">
          <Select
            id="model"
            defaultValue={models[0]}
            style={selectStyle}
            onChange={value => onModelChange(value)}
          >
            {models.map(model => (
              <Option key={model} value={model}>
                {model}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={handleButtonClick}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ModelCard;
