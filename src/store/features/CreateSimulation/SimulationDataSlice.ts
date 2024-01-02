import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { PromptPart, Goal } from './simulationDefinitions';
import { serviceAgentFlight } from './prompts';
import { Dropdown } from './simulationDefinitions';

// Define a type for the slice state
interface SimulationDataState {
  serviceAgents: Dropdown[];
  userAgents: Dropdown[];
  llms: string[];
  prompts: PromptPart[];
  domains: string[];
  goals: Goal[];
}

// Define the initial state using that type
const initialState: SimulationDataState = {
  serviceAgents: [],
  userAgents: [],
  llms: ['GPT35', 'GPT35TURBO', 'GPT4', 'LLAMA2', 'FAKE'],
  prompts: serviceAgentFlight,
  domains: ['FLIGHT', 'INSURANCE'],
  goals: []
};

export const simulationDataSlice = createSlice({
  name: 'simulationData',
  initialState,
  reducers: {
    // Setters
    setServiceAgents: (state, action: PayloadAction<Dropdown[]>) => {
      state.serviceAgents = action.payload;
    },
    setUserAgents: (state, action: PayloadAction<Dropdown[]>) => {
      state.userAgents = action.payload;
    },
    setLLMs: (state, action: PayloadAction<string[]>) => {
      state.llms = action.payload;
    },
    setPrompts: (state, action: PayloadAction<PromptPart[]>) => {
      state.prompts = action.payload;
    },
    setDomains: (state, action: PayloadAction<[]>) => {
      state.domains = action.payload;
    },
    setGoals: (state, action: PayloadAction<Goal[]>) => {
      state.goals = action.payload;
    },

    // Resetters
    resetServiceAgents: state => {
      state.serviceAgents = [];
    },
    resetUserAgents: state => {
      state.userAgents = [];
    },
    resetLLMs: state => {
      state.llms = [];
    },
    resetPrompts: state => {
      state.prompts = [];
    },
    resetDomains: state => {
      state.domains = [];
    },
    resetGoals: state => {
      state.goals = [];
    }
  }
});

// Exporting actions
export const {
  setServiceAgents,
  setUserAgents,
  setLLMs,
  setPrompts,
  setDomains,
  setGoals,
  resetServiceAgents,
  resetUserAgents,
  resetLLMs,
  resetPrompts,
  resetDomains,
  resetGoals
} = simulationDataSlice.actions;

// Selector
export const selectSimulationData = (state: RootState) => state.simulationData;

export default simulationDataSlice.reducer;
