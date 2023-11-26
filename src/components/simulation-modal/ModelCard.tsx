import React from 'react';
import { Card, Select, Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

interface ModelCardProps {
  models: string[];
  scenarios: string[];
  onModelChange: () => void;
  onScenarioChange: () => void;
  onButtonClick: () => void;
  icon: React.ReactNode; // Icon prop
  title: string; // Title text prop
}

const cardStyle: React.CSSProperties = {
  width: 300,
  height: 400,
  border: '1px solid',
  padding: 20
};

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  justifyContent: 'space-between'
};

const textStyle: React.CSSProperties = { fontSize: 22 };

const iconStyle: React.CSSProperties = { margin: 24 }; // Style for the icon

const selectStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: 20,
  height: 40
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 8,
  fontSize: 13
};

const scenarioWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  width: '100%'
};

const scenarioSelectStyle: React.CSSProperties = {
  flex: 1,
  marginRight: 10,
  height: 40
};

const ModelCard: React.FC<ModelCardProps> = ({
  models,
  scenarios,
  onModelChange,
  onScenarioChange,
  onButtonClick,
  icon, // Icon prop
  title // Title text prop
}) => {
  return (
    <Card style={cardStyle}>
      <div style={wrapperStyle}>
        <Text style={textStyle}>{title}</Text> {/* Use title prop */}
        <div style={iconStyle}>{icon}</div> {/* Use icon prop */}
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
          Instruction Template / Scenario
        </label>
        <div style={scenarioWrapperStyle}>
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
        </div>
      </div>
    </Card>
  );
};

export default ModelCard;
