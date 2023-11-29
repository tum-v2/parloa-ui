import React, { useEffect, useRef, useState } from 'react';
import theme from '@/theme/theme';
import ChatBubble, { Position } from '@/components/chat-bubble/ChatBubble';
import { InputField } from '@/components/generic/InputField';
import Button from '@/components/generic/Button';
import { IoSend } from 'react-icons/io5';
import useConversation from '@/hooks/useConversation';
import { Message } from '@/api/schemas/conversation';

interface ChatProps {
  chatId: number;
}

const Chat = ({ chatId }: ChatProps) => {
  const {
    data: conversation,
    isLoading,
    isError,
    error
  } = useConversation(chatId);

  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, messages]);

  useEffect(() => {
    if (conversation) {
      setMessages(conversation.messages);
    }
  }, [conversation, conversation?.messages]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!conversation) {
    return <div>Error</div>;
  }

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
        _id: 13,
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
            <div key={message._id} style={{ flexGrow: 1 }}>
              <ChatBubble
                key={message._id}
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
