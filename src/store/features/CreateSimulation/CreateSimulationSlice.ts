import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import {
  AgentState,
  SimulationState,
  SimulationType
} from './simulationDefinitions';

const AgentInitialState: AgentState = {
  name: '',
  type: 'userAgent',
  llm: 'FAKE',
  temperature: 0.7,
  maxTokens: 512,
  domain: 'FLIGHT',
  temporary: false,
  userGoal: undefined,
  prompt: [
    { name: 'DefaultPrompt', content: 'Default Content', optimizable: false }
  ]
};

// Define the initial state using that type
const initialState: SimulationState = {
  type: '',
  name: '',
  description: '',
  numConversations: 1,
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
    setType: (state, action: PayloadAction<SimulationType>) => {
      state.type = action.payload;
    },
    setNumConversations: (state, action: PayloadAction<number>) => {
      state.numConversations = action.payload;
    },
    setServiceAgent: (state, action: PayloadAction<AgentState>) => {
      state.serviceAgentConfig = action.payload;
    },
    setUserAgent: (state, action: PayloadAction<AgentState>) => {
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
