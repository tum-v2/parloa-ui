import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/Counter/CounterSlice';
import simulationReducer from './features/CreateSimulation/CreateSimulationSlice';
import agentReducer from './features/CreateSimulation/CreateAgentSlice';
import simulationControlReducer from './features/CreateSimulation/SimulationControlSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      simulation: simulationReducer,
      agent: agentReducer,
      simulationControl: simulationControlReducer
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
