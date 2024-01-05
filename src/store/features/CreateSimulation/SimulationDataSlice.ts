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
  userAgentsWithConfig: AgentState[];
  userAgents: Dropdown[];
  prompts: PromptPart[];
  goals: Goal[];
}

// Define the initial state using that type
const initialState: SimulationDataState = {
  serviceAgentsWithConfig: serviceAgentsWithConfig,
  serviceAgents: serviceAgents,
  userAgentsWithConfig: userAgentswithConfig,
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
    setServiceAgentsWithConfig: (
      state,
      action: PayloadAction<AgentState[]>
    ) => {
      state.serviceAgentsWithConfig = action.payload;
    },
    setUserAgents: (state, action: PayloadAction<Dropdown[]>) => {
      state.userAgents = action.payload;
    },
    setUserAgentsWithConfig: (state, action: PayloadAction<AgentState[]>) => {
      state.userAgentsWithConfig = action.payload;
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
    resetServiceAgentsWithConfig: state => {
      state.serviceAgentsWithConfig = [];
    },
    resetUserAgents: state => {
      state.userAgents = [];
    },
    resetUserAgentsWithConfig: state => {
      state.userAgentsWithConfig = [];
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
  setServiceAgentsWithConfig,
  setUserAgents,
  setUserAgentsWithConfig,
  setLLMs,
  setPrompts,
  setDomains,
  setGoals,
  resetServiceAgents,
  resetServiceAgentsWithConfig,
  resetUserAgents,
  resetUserAgentsWithConfig,
  resetLLMs,
  resetPrompts,
  resetDomains,
  resetGoals
} = simulationDataSlice.actions;

// Selector
export const selectSimulationData = (state: RootState) => state.simulationData;

export default simulationDataSlice.reducer;
