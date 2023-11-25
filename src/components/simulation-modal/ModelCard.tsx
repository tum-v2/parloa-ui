import React from 'react';
import { Card, Select, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { FaHeadphones } from 'react-icons/fa';

const { Text } = Typography;

const { Option } = Select;

interface ModelCardProps {
  models: string[];
  scenarios: string[];
  onModelChange: () => void;
  onScenarioChange: () => void;
  onButtonClick: () => void;
}

const cardStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 300,
  height: 400,
  border: '1px solid'
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '20px' // Maintain a bottom margin for spacing
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: '20px' // Optional: if you want to maintain bottom spacing
};

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between', // This will space out the children evenly
  width: '100%', // Ensure the wrapper fills the card horizontally
  height: '100%', // Ensure the wrapper fills the card vertically
  padding: '20px', // Add padding inside the card
  boxSizing: 'border-box' // Include padding in width and height calculations
};

const textStyle: React.CSSProperties = {
  fontWeight: 'normal',
  marginBottom: '4px',
  fontSize: '22px'
};
const iconStyle: React.CSSProperties = {
  marginBottom: '24px'
};

const ModelCard: React.FC<ModelCardProps> = ({
  models,
  scenarios,
  onModelChange,
  onScenarioChange,
  onButtonClick
}) => {
  return (
    <Card style={cardStyle}>
      <div style={wrapperStyle}>
        <Text style={textStyle}>Agent LLM</Text>
        <FaHeadphones size={100} style={iconStyle} />
        <Select
          size="large"
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
        <Select
          size="large"
          defaultValue={scenarios[0]}
          style={selectStyle}
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
          style={buttonStyle}
        >
          Instruction Template/Scenario
        </Button>
      </div>
    </Card>
  );
};

export default ModelCard;
