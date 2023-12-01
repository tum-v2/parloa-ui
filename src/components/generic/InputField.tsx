import React from 'react';
import { Input } from 'antd';

interface InputFieldProps {
  type: 'text' | 'password' | 'textarea';
  size?: 'small' | 'middle' | 'large';
  placeholder?: string;
  suffix?: React.ReactNode;
  id?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onPressEnter?: () => void;
  maxLength?: number;
  disabled?: boolean;
  showCount?: boolean;
  minRows?: number;
  maxRows?: number;
  iconRender?: () => React.ReactNode;
}

const { TextArea } = Input;
const { Password } = Input;

export const InputField = (props: InputFieldProps) => {
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
    // Call the original onPressEnter if defined and shift key is pressed
    if (e.key === 'Enter' && e.shiftKey && props.onPressEnter) {
      props.onPressEnter();
    }
  };

  if (props.type === 'textarea') {
    return (
      <TextArea
        size={props.size}
        autoSize={{ minRows: props.minRows, maxRows: 10 || props.maxRows }}
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={handleKeyPress} // Modified to use onKeyDown
        maxLength={props.maxLength}
        disabled={props.disabled}
        showCount={props.showCount}
      />
    );
  } else if (props.type === 'password') {
    return (
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
    );
  } else {
    return (
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
    );
  }
};
