import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { PromptPart, Goal } from './simulationDefinitions';
import {
  llms,
  domains,
  serviceAgentsWithConfig,
  serviceAgents,
  userAgentswithConfig,
  userAgents,
  prompts,
  goals
} from './mockData';
import { Dropdown, AgentState } from './simulationDefinitions';

// Define a type for the slice state
interface SimulationDataState {
  domains: string[];
  llms: string[];
  serviceAgentsWithConfig: AgentState[];
  serviceAgents: Dropdown[];
  userAgentswithConfig: AgentState[];
  userAgents: Dropdown[];
  prompts: PromptPart[];
  goals: Goal[];
}

// Define the initial state using that type
const initialState: SimulationDataState = {
  serviceAgentsWithConfig: serviceAgentsWithConfig,
  serviceAgents: serviceAgents,
  userAgentswithConfig: userAgentswithConfig,
  userAgents: userAgents,
  llms: llms,
  prompts: prompts,
  domains: domains,
  goals: goals
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
