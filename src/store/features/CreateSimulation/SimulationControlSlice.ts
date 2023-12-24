import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface SimulationControlState {
  currentStep: number;
  isWildStep: boolean;
}

const initialState: SimulationControlState = {
  currentStep: 0,
  isWildStep: false
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
    resetControlState: () => initialState
  }
});

// Export actions
export const { setCurrentStep, setIsWildStep, resetControlState } =
  simulationControlSlice.actions;

// Selector to access the state
export const selectSimulationControl = (state: RootState) =>
  state.simulationControl;

export default simulationControlSlice.reducer;
