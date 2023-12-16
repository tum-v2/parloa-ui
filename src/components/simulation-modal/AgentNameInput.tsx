import React from 'react';
import { Input } from 'antd';
import theme from '@/theme/theme';

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  marginBottom: theme.margin.m
};

const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return <Input value={value} style={inputStyle} onChange={handleChange} />;
};

export default InputField;
