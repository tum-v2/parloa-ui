import React from 'react';
import { Card, Select, Button, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import theme from '@/theme/theme';

const { Option } = Select;
const { Text } = Typography;

interface ModelCardProps {
  models: string[];
  templates: string[];
  onModelChange: (value: string) => void;
  onTemplateChange: (value: string) => void;
  onButtonClick: () => void;
  icon: React.ReactNode;
  title: string;
}

const cardStyle: React.CSSProperties = {
  width: 300,
  height: 400,
  border: '1px solid',
  padding: theme.padding.l
};

const wrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  justifyContent: 'space-between'
};

const textStyle: React.CSSProperties = { fontSize: theme.fontSize.xl };

const iconStyle: React.CSSProperties = { margin: theme.margin.l };

const selectStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: theme.margin.m,
  height: 40
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: theme.margin.s,
  fontSize: theme.fontSize.m
};

const scenarioWrapperStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  width: '100%'
};

const scenarioSelectStyle: React.CSSProperties = {
  flex: 1,
  marginRight: theme.margin.m,
  height: 40
};

const ModelCard = ({
  models,
  templates,
  onModelChange,
  onTemplateChange,
  onButtonClick,
  icon,
  title
}: ModelCardProps) => {
  return (
    <Card style={cardStyle}>
      <div style={wrapperStyle}>
        <Text style={textStyle}>{title}</Text>
        <div style={iconStyle}>{icon}</div>
        <Select
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
        <label htmlFor="scenario" style={labelStyle}>
          Instruction Template
        </label>
        <div style={scenarioWrapperStyle}>
          <Select
            id="scenario"
            defaultValue={templates[0]}
            style={scenarioSelectStyle}
            onChange={value => onTemplateChange(value)}
          >
            {templates.map(scenario => (
              <Option key={scenario} value={scenario}>
                {scenario}
              </Option>
            ))}
          </Select>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => onButtonClick()}
          />
        </div>
      </div>
    </Card>
  );
};

export default ModelCard;
