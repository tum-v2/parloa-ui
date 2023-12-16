import React from 'react';
import theme from '@/theme/theme';
import Card from '@/components/generic/Card';

export enum Position {
  Left = 'left',
  Right = 'right'
}

interface ChatBubbleProps {
  position: Position;
  children: React.ReactNode;
}

const ChatBubble = ({ position, children }: ChatBubbleProps) => {
  const bubbleStyle: React.CSSProperties = {
    borderBottomLeftRadius:
      position === Position.Left ? theme.borderRadius.xs : 'auto',
    borderBottomRightRadius:
      position === Position.Right ? theme.borderRadius.xs : 'auto',
    backgroundColor:
      position === Position.Left ? theme.color.gray : theme.color.primary,
    width: 'auto',
    maxWidth: 'min(500px, 60%)',
    float: position
  };

  const textStyle: React.CSSProperties = {
    color: 'white'
  };

  return (
    <Card style={bubbleStyle} padding={theme.padding.m}>
      <span style={textStyle}>{children}</span>
    </Card>
  );
};

export default ChatBubble;
