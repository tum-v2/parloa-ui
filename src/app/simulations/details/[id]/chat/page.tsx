'use client';
import React, { useEffect, useState } from 'react';
import Chat from '@/app/simulations/details/[id]/chat/Chat';
import Sidebar from '@/app/simulations/details/[id]/chat/Sidebar';
import theme from '@/theme/theme';
import { useParams } from 'next/navigation';
import useSimulation from '@/hooks/useSimulation';
import { Empty, Spin } from 'antd';
import Content from '@/components/generic/Content';

const ChatPage = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const { data, isLoading } = useSimulation(id);
  const [selectedChat, setSelectedChat] = useState<string>('');

  useEffect(() => {
    if (data && data.conversations && data.conversations.length > 0) {
      setSelectedChat(data.conversations[0]);
    }
  }, [data]);

  if (isLoading) {
    return <Spin fullscreen size="large" />;
  }

  if (!data) {
    return <Empty description="Simulation not found" />;
  }

  const pageContainerStyle: React.CSSProperties = {
    display: 'flex',
    height: `calc(100vh - ${theme.navbar.height}px)`,
    width: '100%'
  };

  return (
    <div style={pageContainerStyle}>
      <Sidebar
        simulation={data}
        selectedChat={selectedChat}
        onSelectionChange={setSelectedChat}
      />
      <Content>
        <Chat
          simulationId={id}
          chatId={selectedChat}
          interactive={data.type === 'CHAT'}
        />
      </Content>
    </div>
  );
};

export default ChatPage;
