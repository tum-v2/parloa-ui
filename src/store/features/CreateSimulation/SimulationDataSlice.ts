import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { AgentState, PromptPart, Goal } from './simulationDefinitions';

// Define a type for the slice state
interface SimulationDataState {
  serviceAgents: AgentState[];
  userAgents: AgentState[];
  prompts: PromptPart[];
  domains: [];
  goals: Goal[];
}

// Define the initial state using that type
const initialState: SimulationDataState = {
  serviceAgents: [],
  userAgents: [],
  prompts: [],
  domains: [],
  goals: []
};

export const simulationDataSlice = createSlice({
  name: 'simulationData',
  initialState,
  reducers: {
    // Setters
    setServiceAgents: (state, action: PayloadAction<AgentState[]>) => {
      state.serviceAgents = action.payload;
    },
    setUserAgents: (state, action: PayloadAction<AgentState[]>) => {
      state.userAgents = action.payload;
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
  setPrompts,
  setDomains,
  setGoals,
  resetServiceAgents,
  resetUserAgents,
  resetPrompts,
  resetDomains,
  resetGoals
} = simulationDataSlice.actions;

// Selector
export const selectSimulationData = (state: RootState) => state.simulationData;

export default simulationDataSlice.reducer;
