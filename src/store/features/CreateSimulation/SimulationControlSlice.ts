import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { SimulationControlState } from './simulationDefinitions';

const initialState: SimulationControlState = {
  currentStep: 0,
  isWildStep: false,
  agentFlag: 'userAgent'
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
    setAgentFlag: (
      state,
      action: PayloadAction<'serviceAgent' | 'userAgent'>
    ) => {
      state.agentFlag = action.payload;
    },
    resetControlState: () => initialState
  }
});

// Export actions
export const {
  setCurrentStep,
  setIsWildStep,
  setAgentFlag,
  resetControlState
} = simulationControlSlice.actions;

// Selector to access the state
export const selectSimulationControl = (state: RootState) =>
  state.simulationControl;

export default simulationControlSlice.reducer;
