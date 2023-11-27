import React, { useEffect, useRef, useState } from 'react';
import theme from '@/theme/theme';
import ChatBubble, { Position } from '@/components/chat-bubble/ChatBubble';
import { InputField } from '@/components/generic/InputField';
import Button from '@/components/generic/Button';
import { IoSend } from 'react-icons/io5';

interface ChatProps {
  chatId: number;
}

const Chat = ({ chatId }: ChatProps) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: 'Hi',
      position: 'right'
    },
    {
      id: 2,
      message: 'Hello, how may I help you today?',
      position: 'left'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.length === 0) {
      return;
    }

    setMessages([
      ...messages,
      {
        id: 13,
        message: inputValue,
        position: 'right'
      }
    ]);

    setInputValue('');
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  };

  const chatContainerStyle: React.CSSProperties = {
    overflowY: 'auto',
    padding: theme.padding.l,
    flex: 1
  };

  const chatStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.padding.s
  };

  const inputFieldStyle: React.CSSProperties = {
    paddingLeft: theme.padding.xl,
    paddingRight: theme.padding.xl,
    paddingBottom: theme.padding.m
  };

  return (
    <div style={containerStyle}>
      <div style={chatContainerStyle}>
        <div style={chatStyle}>
          {messages.map(message => (
            <div key={message.id} style={{ flexGrow: 1 }}>
              <ChatBubble
                key={message.id}
                position={
                  message.position === 'left' ? Position.Left : Position.Right
                }
              >
                {message.message}
              </ChatBubble>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div style={inputFieldStyle}>
        <InputField
          type={'text'}
          value={inputValue}
          onChange={handleInputChange}
          onPressEnter={handleSubmit}
          suffix={
            <Button
              icon={<IoSend />}
              onClick={handleSubmit}
              disabled={inputValue.length === 0}
            />
          }
        />
      </div>
    </div>
  );
};

export default Chat;