import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { Goal } from './simulationDefinitions';

const GoalInitialState: Goal = {
  name: '',
  description: '',
  scenarios: []
};

export const goalSlice = createSlice({
  name: 'goal',
  initialState: GoalInitialState,
  reducers: {
    setGoalName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setGoalDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setGoalScenarios: (state, action: PayloadAction<string[]>) => {
      state.scenarios = action.payload;
    },
    resetGoalState: () => GoalInitialState,
    setGoal: (state, action: PayloadAction<Goal>) => {
      return action.payload;
    }
  }
});

// Export actions
export const {
  setGoalName,
  setGoalDescription,
  setGoalScenarios,
  resetGoalState,
  setGoal
} = goalSlice.actions;

// Export selectors
export const selectGoal = (state: RootState) => state.goal;

// Export reducer
export default goalSlice.reducer;
