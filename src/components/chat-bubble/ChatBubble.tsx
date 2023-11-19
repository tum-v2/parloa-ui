import React from 'react';
import { Card } from 'antd';
import theme from '@/theme/theme';

export enum Position {
  Left = 'left',
  Right = 'right'
}

interface ChatBubbleProps {
  position: Position;
  children: React.ReactNode;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ position, children }) => {
  const bubbleStyle: React.CSSProperties = {
    borderBottomLeftRadius:
      position === Position.Left ? theme.borderRadius.xs : 'auto',
    borderBottomRightRadius:
      position === Position.Right ? theme.borderRadius.xs : 'auto',
    backgroundColor:
      position === Position.Left ? theme.color.gray : theme.color.primary,
    maxWidth: 'min(500px, 60%)',
    float: position
  };

  const textStyle: React.CSSProperties = {
    color: 'white'
  };

  return (
    <Card style={bubbleStyle}>
      <span style={textStyle}>{children}</span>
    </Card>
  );
};

export default ChatBubble;
