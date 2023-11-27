import React, { createContext, useState, ReactNode } from 'react';

// Define the type for your simulation state
interface SimulationState {
  user?: string | null;
  name: string;
  scenario: string;
  type: string;
  domain: string;
  numConversations: number;
  // ... other fields
}

// Define the type for the context value
interface SimulationContextValue {
  simulationState: SimulationState;
  setSimulationState: React.Dispatch<React.SetStateAction<SimulationState>>;
}

// Create the context
const SimulationContext = createContext<SimulationContextValue | undefined>(
  undefined
);

// Define the provider component
interface SimulationProviderProps {
  children: ReactNode;
}

export const SimulationProvider: React.FC<SimulationProviderProps> = ({
  children
}) => {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    name: '',
    scenario: '',
    type: '',
    domain: '',
    numConversations: 0
    // ... initialize other fields
  });

  return (
    <SimulationContext.Provider value={{ simulationState, setSimulationState }}>
      {children}
    </SimulationContext.Provider>
  );
};

// Custom hook for using simulation context
export const useSimulation = () => {
  const context = React.useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
