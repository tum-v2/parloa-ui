import React, { useState } from 'react';
import theme from '@/theme/theme';
import BackButton from '@/components/generic/BackButton';
import SelectableButton from '@/components/generic/SelectableButton';
import { Simulation, SimulationSchema } from '@/api/schemas/simulation';
import Button from '@/components/generic/Button';

interface SidebarProps {
  simulation: Simulation;
  selectedChat: number;
  onSelectionChange: (number) => void;
}

// eslint-disable-next-line no-unused-vars
enum SidebarContent {
  // eslint-disable-next-line no-unused-vars
  Simulations,
  // eslint-disable-next-line no-unused-vars
  Chats
}

const Sidebar = ({
  simulation,
  selectedChat,
  onSelectionChange
}: SidebarProps) => {
  const [sidebarContent, setSidebarContent] = useState<SidebarContent>(
    SidebarContent.Chats
  );

  const [displayedSimulation, setDisplayedSimulation] =
    useState<Simulation>(simulation);

  const sidebarStyle: React.CSSProperties = {
    width: '350px',
    maxWidth: '40%',
    borderRight: `${theme.strokeWidth.xs}px solid ${theme.color.ligthGray}`,
    padding: theme.padding.m,
    overflowY: 'auto'
  };

  const selectSimulation = (simulation: Simulation) => {
    setDisplayedSimulation(simulation);
    setSidebarContent(SidebarContent.Chats);
  };

  return (
    <div style={sidebarStyle}>
      {sidebarContent === SidebarContent.Chats ? (
        <>
          <BackButton
            onClick={() => {
              setSidebarContent(SidebarContent.Simulations);
            }}
          >
            Simulations
          </BackButton>
          <SidebarChats
            title={displayedSimulation.name}
            chatIds={displayedSimulation.conversations}
            selectedChat={selectedChat}
            onSelectionChange={onSelectionChange}
          />
        </>
      ) : (
        <SidebarSimulations onChangeSelection={selectSimulation} />
      )}
    </div>
  );
};

interface SidebarSimulationsProps {
  onChangeSelection: (Simulation) => void;
}

const SidebarSimulations = ({ onChangeSelection }: SidebarSimulationsProps) => {
  const simulations = [
    SimulationSchema.parse({
      _id: '123',
      _v: 1,
      user: 'user',
      name: 'Flight Agent Booking',
      scenario: 'Slot Filling',
      domain: 'Domain',
      type: 'Automated',
      numConversations: 3,
      agents: [],
      conversations: [0, 1, 2],
      status: 'OK',
      createdAt: '2023-11-27T12:00:00.000Z',
      updatedAt: '2023-11-27T12:00:00.000Z'
    })
  ];

  return (
    <>
      <h1>Simulations</h1>
      {simulations.map(simulation => (
        <Button
          key={simulation._id}
          onClick={() => {
            onChangeSelection(simulation);
          }}
        >
          {simulation.name}
        </Button>
      ))}
    </>
  );
};

interface SidebarChatsProps {
  title: string;
  chatIds: number[];
  selectedChat: number;
  onSelectionChange: (number) => void;
}

const SidebarChats = ({
  title,
  chatIds,
  selectedChat,
  onSelectionChange
}: SidebarChatsProps) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.padding.m
  };

  const selectableButtonStyle: React.CSSProperties = {
    width: '100%'
  };

  return (
    <>
      <h1>{title}</h1>
      <div style={containerStyle}>
        {chatIds.map((id, index) => (
          <div key={id} style={selectableButtonStyle}>
            <SelectableButton
              selected={selectedChat === id}
              onClick={() => {
                onSelectionChange(id);
              }}
            >
              Chat {index + 1}
            </SelectableButton>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
