import React from 'react';
import { Card, Select, Button, Typography, Flex } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import theme from '@/theme/theme';

const { Option } = Select;
const { Title } = Typography;

interface ModelCardProps {
  models: string[];
  scenarios: string[];
  onModelChange: () => void;
  onScenarioChange: () => void;
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

const iconStyle: React.CSSProperties = { margin: theme.margin.l };

const selectStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: theme.margin.m
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: theme.margin.s,
  fontSize: theme.fontSize.m
};

const scenarioSelectStyle: React.CSSProperties = {
  flex: 1,
  marginRight: theme.margin.m
};

const ModelCard = ({
  models,
  scenarios,
  onModelChange,
  onScenarioChange,
  onButtonClick,
  icon,
  title
}: ModelCardProps) => {
  return (
    <Card style={cardStyle} bodyStyle={{ height: '100%' }}>
      <Flex justify="center" align="center" className="h-full" vertical>
        <Title level={4}>{title}</Title>
        <div style={iconStyle}>{icon}</div>
        <Select
          defaultValue={models[0]}
          style={selectStyle}
          onChange={onModelChange}
        >
          {models.map(model => (
            <Option key={model} value={model}>
              {model}
            </Option>
          ))}
        </Select>
        <label htmlFor="scenario" style={labelStyle}>
          Instruction Template
        </label>
        <Flex align="center" className="w-full">
          <Select
            id="scenario"
            defaultValue={scenarios[0]}
            style={scenarioSelectStyle}
            onChange={onScenarioChange}
          >
            {scenarios.map(scenario => (
              <Option key={scenario} value={scenario}>
                {scenario}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={onButtonClick}
          />
        </Flex>
      </Flex>
    </Card>
  );
};

export default ModelCard;
