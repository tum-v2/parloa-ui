import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { AgentState, AgentType, PromptPart } from './simulationDefinitions';

const AgentInitialState: AgentState = {
  name: '',
  type: 'userAgent',
  llm: 'FAKE',
  temperature: 0.7,
  maxTokens: 512,
  domain: 'FLIGHT',
  temporary: false,
  goal: '',
  prompt: [
    { name: 'DefaultPrompt', content: 'Default Content', optimizable: false }
  ]
};

export const agentSlice = createSlice({
  name: 'agent',
  initialState: AgentInitialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setType: (state, action: PayloadAction<AgentType>) => {
      state.type = action.payload;
    },
    setLLM: (state, action: PayloadAction<string>) => {
      state.llm = action.payload;
    },
    setTemperature: (state, action: PayloadAction<number>) => {
      state.temperature = action.payload;
    },
    setMaxTokens: (state, action: PayloadAction<number>) => {
      state.maxTokens = action.payload;
    },
    setDomain: (state, action: PayloadAction<string>) => {
      state.domain = action.payload;
    },
    setTemporary: (state, action: PayloadAction<boolean>) => {
      state.temporary = action.payload;
    },
    setUserGoal: (state, action: PayloadAction<string>) => {
      state.goal = action.payload;
    },
    setPrompt: (state, action: PayloadAction<PromptPart[]>) => {
      state.prompt = action.payload;
    },
    resetAgentState: () => AgentInitialState
  }
});

// Export actions
export const {
  setName,
  setType,
  setLLM,
  setTemperature,
  setMaxTokens,
  setDomain,
  setTemporary,
  setUserGoal,
  setPrompt,
  resetAgentState
} = agentSlice.actions;

// Selector to access the state
export const selectAgent = (state: RootState) => state.agent;

export default agentSlice.reducer;
