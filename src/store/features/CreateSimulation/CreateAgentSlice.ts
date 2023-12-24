import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface AgentState {
  name: string;
  type: string; // AgentType as string
  llm: string; // LLMModel as string
  temperature: number;
  maxTokens: number;
  domain: string; // ConversationDomain as string
  temporary?: boolean;
  userGoal?: Goal;
  prompt: PromptPart[];
}

interface PromptPart {
  name: string;
  content: string;
  optimizable?: boolean;
}

enum ConversationScenario {
  SEQUENCE = 'SEQUENCE',
  SLOT_FILLING = 'SLOT_FILLING',
  CALL_FORWARDING = 'CALL_FORWARDING'
}

interface Goal {
  name: string;
  description: string;
  scenarios: ConversationScenario[];
}

const AgentInitialState: AgentState = {
  name: '',
  type: '',
  llm: '',
  temperature: 0.7,
  maxTokens: 512,
  domain: '',
  temporary: false,
  userGoal: undefined,
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
    setType: (state, action: PayloadAction<string>) => {
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
    setUserGoal: (state, action: PayloadAction<Goal | undefined>) => {
      state.userGoal = action.payload;
    },
    setPrompt: (state, action: PayloadAction<PromptPart[]>) => {
      state.prompt = action.payload;
    },
    resetState: () => AgentInitialState
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
  resetState
} = agentSlice.actions;

// Selector to access the state
export const selectAgent = (state: RootState) => state.agent;

export default agentSlice.reducer;
