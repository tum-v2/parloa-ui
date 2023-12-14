import React, { useState } from 'react';
import theme from '@/theme/theme';
import BackButton from '@/components/generic/BackButton';
import SelectableButton from '@/components/generic/SelectableButton';
import { Simulation } from '@/api/schemas/simulation';
import Button from '@/components/generic/Button';
import useSimulations from '@/hooks/useSimulations';
import { SimulationCard } from '@/app/dashboard/components/SimulationCard';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  simulation: Simulation;
  selectedChat: string;
  onSelectionChange: (simulationId: string) => void;
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
    minWidth: '250px',
    width: '350px',
    maxWidth: '40%',
    borderRight: `${theme.strokeWidth.xs}px solid ${theme.color.ligthGray}`,
    padding: theme.padding.m,
    overflowY: 'auto'
  };

  const router = useRouter();

  const selectSimulation = (selectedSimulation: Simulation) => {
    if (selectedSimulation._id !== simulation._id) {
      router.push(`/simulations/details/${selectedSimulation._id}/chat`);
      return;
    }
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
      {simulations.map((simulation, index) => (
        <SimulationCard
          key={index}
          simulation={simulation}
          onClick={() => {
            onChangeSelection(simulation);
          }}
        />
      ))}
    </>
  );
};

interface SidebarChatsProps {
  title: string;
  chatIds: string[];
  selectedChat: string;
  onSelectionChange: (chatId: string) => void;
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
    gap: theme.padding.m,
    alignItems: 'center'
  };

  return (
    <>
      <h1>{title}</h1>
      <div style={containerStyle}>
        {chatIds.map((id, index) => (
          <SelectableButton
            key={id}
            selected={selectedChat === id}
            onClick={() => {
              onSelectionChange(id);
            }}
          >
            Chat {index + 1}
          </SelectableButton>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
