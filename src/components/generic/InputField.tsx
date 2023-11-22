import React from 'react';
import { Input } from 'antd';

interface InputFieldProps {
  type: 'text' | 'password' | 'textarea';
  size?: 'small' | 'middle' | 'large';
  placeholder?: string;
  suffix?: React.ReactNode;
  id?: string;
  value?: string;
  onChange?: () => void;
  onPressEnter?: () => void;
  maxLength?: number;
  disabled?: boolean;
  showCount?: boolean;
  rows?: number;
  iconRender?: () => React.ReactNode;
}

const { TextArea } = Input;
const { Password } = Input;
// eslint-disable-next-line require-jsdoc
const InputField = (props: InputFieldProps) => {
  if (props.type === 'textarea') {
    return (
      <>
        <TextArea
          rows={props.rows}
          placeholder={props.placeholder}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onPressEnter={props.onPressEnter}
          maxLength={props.maxLength}
          disabled={props.disabled}
          showCount={props.showCount}
        />
      </>
    );
  } else if (props.type === 'password') {
    return (
      <>
        <Password
          size={props.size}
          placeholder={props.placeholder}
          suffix={props.suffix}
          id={props.id}
          value={props.value}
          onChange={props.onChange}
          onPressEnter={props.onPressEnter}
          maxLength={props.maxLength}
          disabled={props.disabled}
          showCount={props.showCount}
          iconRender={props.iconRender}
        />
      </>
    );
  } else {
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
}

export default InputField
