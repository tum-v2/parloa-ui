import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state based on SimulationSchema
interface SimulationState {
  type: 'AUTOMATED' | 'MANUAL' | 'OPTIMIZATION' | 'A/B TESTING' | '';
  name: string;
  description?: string;
  numConversations: number;
  serviceAgentConfig: AgentSchema;
  userAgentConfig: AgentSchema;
}
interface AgentSchema {
  domain: string;
  name: string;
  llm: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
}

const AgentInitialState: AgentSchema = {
  domain: 'FLIGHT',
  name: 'FAKE AGENT',
  llm: 'FAKE',
  temperature: 0,
  maxTokens: 0,
  prompt: 'FAKE PROMPT'
};

// Define the initial state using that type
const initialState: SimulationState = {
  name: '',
  description: '',
  type: '',
  numConversations: 0,
  serviceAgentConfig: AgentInitialState,
  userAgentConfig: AgentInitialState
};

export const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setType: (
      state,
      action: PayloadAction<
        'AUTOMATED' | 'MANUAL' | 'OPTIMIZATION' | 'A/B TESTING' | ''
      >
    ) => {
      state.type = action.payload;
    },
    setNumConversations: (state, action: PayloadAction<number>) => {
      state.numConversations = action.payload;
    },
    setServiceAgent: (state, action: PayloadAction<AgentSchema>) => {
      state.serviceAgentConfig = action.payload;
    },
    setUserAgent: (state, action: PayloadAction<AgentSchema>) => {
      state.userAgentConfig = action.payload;
    },
    resetState: () => initialState
  }
});

// Export actions
export const {
  setName,
  setDescription,
  setType,
  setNumConversations,
  setServiceAgent,
  setUserAgent,
  resetState
} = simulationSlice.actions;

// Selector to access the state
export const selectSimulation = (state: RootState) => state.simulation;

export default simulationSlice.reducer;
