import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/Counter/CounterSlice';
import simulationReducer from './features/CreateSimulation/CreateSimulationSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      simulation: simulationReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
