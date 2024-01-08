import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { SimulationControlState } from './simulationDefinitions';

const initialState: SimulationControlState = {
  currentStep: 0,
  isWildStep: false,
  agentFlag: 'SERVICE',
  GoalFlag: 'CREATE'
};

export const simulationControlSlice = createSlice({
  name: 'simulationControl',
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    setIsWildStep: (state, action: PayloadAction<boolean>) => {
      state.isWildStep = action.payload;
    },
    setAgentFlag: (state, action: PayloadAction<'SERVICE' | 'USER'>) => {
      state.agentFlag = action.payload;
    },
    setGoalFlag: (state, action: PayloadAction<'EDIT' | 'CREATE'>) => {
      state.GoalFlag = action.payload;
    },
    resetControlState: () => initialState
  }
});

// Export actions
export const {
  setCurrentStep,
  setIsWildStep,
  setAgentFlag,
  resetControlState,
  setGoalFlag
} = simulationControlSlice.actions;

// Selector to access the state
export const selectSimulationControl = (state: RootState) =>
  state.simulationControl;

export default simulationControlSlice.reducer;
