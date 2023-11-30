'use client';
import React, { useState } from 'react';
import { Simulation, SimulationSchema } from '@/api/schemas/simulation';
import Chat from '@/app/chat/Chat';
import Sidebar from '@/app/chat/Sidebar';
import theme from '@/theme/theme';

interface ChatPageProps {
  simulation: Simulation;
}

const ChatPage = ({ simulation }: ChatPageProps) => {
  // TODO: remove
  simulation = SimulationSchema.parse({
    _id: '123',
    _v: 1,
    user: 'user',
    name: 'Flight Agent Booking',
    scenario: 'Slot Filling',
    domain: 'Domain',
    type: 'AUTOMATED',
    numConversations: 3,
    agents: [],
    conversations: [0, 1, 2],
    status: 'OK',
    createdAt: '2023-11-27T12:00:00.000Z',
    updatedAt: '2023-11-27T12:00:00.000Z'
  });

  const [selectedChat, setSelectedChat] = useState<number>(0);

  const pageContainerStyle: React.CSSProperties = {
    display: 'flex',
    height: `calc(100vh - ${theme.navbar.height}px)`
  };

  return (
    <div style={pageContainerStyle}>
      <Sidebar
        simulation={simulation}
        selectedChat={selectedChat}
        onSelectionChange={setSelectedChat}
      />
      <Chat chatId={selectedChat} />
    </div>
  );
};

export default ChatPage;
