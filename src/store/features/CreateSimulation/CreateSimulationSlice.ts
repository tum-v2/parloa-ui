import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { SimulationType } from '@/api/schemas/simulation';

interface SimulationState {
  type: SimulationType;
  name: string;
  description?: string;
  numConversations: number;
  serviceAgentConfig: AgentSchema;
  userAgentConfig: AgentSchema;
  Flag?: 'ServiceAgent' | 'UserAgent' | '';
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
  maxTokens: 256,
  prompt: 'FAKE PROMPT'
};

// Define the initial state using that type
const initialState: SimulationState = {
  type: '',
  name: '',
  description: '',
  numConversations: 1,
  serviceAgentConfig: AgentInitialState,
  userAgentConfig: AgentInitialState,
  Flag: ''
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
    setServiceAgent: (state, action: PayloadAction<AgentSchema>) => {
      state.serviceAgentConfig = action.payload;
    },
    setUserAgent: (state, action: PayloadAction<AgentSchema>) => {
      state.userAgentConfig = action.payload;
    },
    setSimulationFlag: (
      state,
      action: PayloadAction<'ServiceAgent' | 'UserAgent' | ''>
    ) => {
      state.Flag = action.payload;
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
  setSimulationFlag,
  resetState
} = simulationSlice.actions;

// Selector to access the state
export const selectSimulation = (state: RootState) => state.simulation;

export default simulationSlice.reducer;
