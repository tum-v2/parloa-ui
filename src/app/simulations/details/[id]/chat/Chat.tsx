import React, { useEffect, useRef, useState } from 'react';
import theme from '@/theme/theme';
import ChatBubble, { Position } from '@/components/chat-bubble/ChatBubble';
import { InputField } from '@/components/generic/InputField';
import Button from '@/components/generic/Button';
import { IoSend } from 'react-icons/io5';
import { Spin } from 'antd';
import { Message } from '@/api/schemas/conversation';
import { postMessage } from '@/api/conversation';
import useChatMessages from '@/hooks/useChatMessages';

interface ChatProps {
  simulationId: string;
  chatId: string;
  interactive?: boolean;
}

const Chat = ({ simulationId, chatId, interactive = false }: ChatProps) => {
  const {
    messages,
    setMessages,
    initiallyLoading,
    displayAgentLoading,
    error
  } = useChatMessages(simulationId, chatId, interactive);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = () => {
    if (!canSend()) {
      return;
    }

    if (inputValue.length === 0) {
      return;
    }

    const now = new Date();
    const message: Message = {
      sender: 'USER',
      text: inputValue,
      timestamp: now.toISOString(),
      userCanReply: false
    };

    setMessages([...messages, message]);

    postMessage(simulationId, inputValue).then((replyMessage: Message) => {
      setMessages([...messages, message, replyMessage]);
    });

    setInputValue('');
  };

  const canSend = () => {
    if (inputValue.length === 0) {
      return false;
    }

    const lastMessage = messages.at(-1);
    if (lastMessage === undefined) {
      return true;
    }

    return lastMessage.userCanReply;
  };

  if (initiallyLoading) {
    return <Spin fullscreen size="large" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%'
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
          {messages.map((message, index) => (
            <div key={index} style={{ flexGrow: 1 }}>
              <ChatBubble
                position={
                  message.sender === 'USER' ? Position.Right : Position.Left
                }
              >
                {message.text}
              </ChatBubble>
            </div>
          ))}
          {displayAgentLoading && (
            <div style={{ flexGrow: 1 }}>
              <ChatBubble position={Position.Left}>
                <Spin size={'small'} />
              </ChatBubble>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {interactive && (
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
                disabled={!canSend()}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default Chat;
