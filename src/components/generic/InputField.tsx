import React from 'react';
import { Input } from 'antd';

interface InputFieldProps {
  size?: 'small' | 'middle' | 'large';
  placeholder?: string;
  suffix?: React.ReactNode;
  id?: string;
  value?: string;
  type?: string;
  onChange?: () => void;
  onPressEnter?: () => void;
  maxLength?: number;
  disabled?: boolean;
  showCount?: boolean;
}
// eslint-disable-next-line require-jsdoc
export default function InputField(props: InputFieldProps) {
  return (
    <>
      <Input
        size={props.size}
        placeholder={props.placeholder}
        suffix={props.suffix}
        id={props.id}
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        onPressEnter={props.onPressEnter}
        maxLength={props.maxLength}
        disabled={props.disabled}
        showCount={props.showCount}
      />
    </>
  );
}
