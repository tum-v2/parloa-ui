import React, { useState } from 'react';
import theme from '@/theme/theme';
import BackButton from '@/components/generic/BackButton';
import SelectableButton from '@/components/generic/SelectableButton';
import { Simulation } from '@/api/schemas/simulation';
import Button from '@/components/generic/Button';
import useSimulations from '@/hooks/useSimulations';

interface SidebarProps {
  simulation: Simulation;
  selectedChat: number;
  onSelectionChange: (simulationId: number) => void;
}

enum SidebarContent {
  Simulations,
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
  onChangeSelection: (simulation: Simulation) => void;
}

const SidebarSimulations = ({ onChangeSelection }: SidebarSimulationsProps) => {
  const { data: simulations, isLoading, isError, error } = useSimulations();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!simulations) {
    return <div>Error</div>;
  }

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
  onSelectionChange: (chatId: number) => void;
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
