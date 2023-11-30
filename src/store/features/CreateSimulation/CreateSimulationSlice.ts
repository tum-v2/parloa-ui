import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

// Define a type for the slice state based on SimulationSchema
interface SimulationState {
  _id: string;
  __v?: number;
  name: string;
  description?: string;
  scenario: string;
  type: 'AUTOMATED' | 'MANUAL' | 'OPTIMIZATION' | 'A/B TESTING' | '';
  numConversations: number;
  serviceAgent: string;
  userAgent: string;
  conversations: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

// Define the initial state using that type
const initialState: SimulationState = {
  _id: '',
  __v: 0,
  name: '',
  description: '',
  scenario: '',
  type: '',
  numConversations: 0,
  serviceAgent: '',
  userAgent: '',
  conversations: [],
  status: '',
  createdAt: '',
  updatedAt: ''
};

export const simulationSlice = createSlice({
  name: 'simulation',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state._id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setScenario: (state, action: PayloadAction<string>) => {
      state.scenario = action.payload;
    },
    setType: (
      state,
      action: PayloadAction<
        'AUTOMATED' | 'MANUAL' | 'OPTIMIZATION' | 'A/B TESTING'
      >
    ) => {
      state.type = action.payload;
    },
    setNumConversations: (state, action: PayloadAction<number>) => {
      state.numConversations = action.payload;
    },
    setServiceAgent: (state, action: PayloadAction<string>) => {
      state.serviceAgent = action.payload;
    },
    setUserAgent: (state, action: PayloadAction<string>) => {
      state.userAgent = action.payload;
    },
    setConversations: (state, action: PayloadAction<string[]>) => {
      state.conversations = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setCreatedAt: (state, action: PayloadAction<string>) => {
      state.createdAt = action.payload;
    },
    setUpdatedAt: (state, action: PayloadAction<string>) => {
      state.updatedAt = action.payload;
    },
    resetState: () => initialState
  }
});

// Export actions
export const {
  setId,
  setName,
  setDescription,
  setScenario,
  setType,
  setNumConversations,
  setServiceAgent,
  setUserAgent,
  setConversations,
  setStatus,
  setCreatedAt,
  setUpdatedAt,
  resetState
} = simulationSlice.actions;

// Selector to access the state
export const selectSimulation = (state: RootState) => state.simulation;

export default simulationSlice.reducer;
