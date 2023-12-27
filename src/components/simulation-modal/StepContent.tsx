import React from 'react';
import SimulationSelection from './Steps/SimulationSelection';
import SimulationName from './Steps/SimulationNameStep';
import SimulationAgent from './Steps/SimulationAgentSelectStep';
import SimulationAgentConfigurationStep from './Steps/SimulationAgentConfigurationStep';
import SimulationGoalEditStep from './Steps/SimulationGoalEditStep';
import { useAppDispatch } from '@/store/hooks';
import { setCurrentStep } from '@/store/features/CreateSimulation/SimulationControlSlice';

interface StepContentProps {
  stepNumber: number;
  enterWildStep: () => void;
}

const StepContent = ({ stepNumber, enterWildStep }: StepContentProps) => {
  const dispatch = useAppDispatch();
  const onGoalAdd = () => {
    // Do something here
  };

  const onGoalEdit = () => {
    dispatch(setCurrentStep(4));
  };

  const onLoadPrompt = () => {
    // Do something here
  };
  const renderContentForStep = () => {
    switch (stepNumber) {
      case 0:
        return <SimulationSelection />;

      case 1:
        return <SimulationName />;

      case 2:
        return <SimulationAgent enterWildStep={enterWildStep} />;
      case 3:
        return (
          <SimulationAgentConfigurationStep
            type="user"
            onGoalAdd={onGoalAdd}
            onLoadPrompt={onLoadPrompt}
            onGoalEdit={onGoalEdit}
          />
        );
      case 4:
        return <SimulationGoalEditStep />;

      default:
        return <p>{`Step ${stepNumber}`}</p>;
    }
  };

  return (
    <div
      style={{
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {renderContentForStep()}
    </div>
  );
};

export default StepContent;
