import React from 'react';
import SimulationSelection from './Steps/SimulationSelection';
import SimulationName from './Steps/SimulationNameStep';
import SimulationAgent from './Steps/SimulationAgentSelectStep';
import SimulationAgentConfigurationStep from './Steps/SimulationAgentConfigurationStep';
import SimulationGoalEditStep from './Steps/SimulationGoalEditStep';
import { useAppSelector } from '@/store/hooks';
import { CurrentStep } from './SimulationModal';

interface StepContentProps {
  stepNumber: number;
}

const StepContent = ({ stepNumber }: StepContentProps) => {
  const { agentFlag } = useAppSelector(state => state.simulationControl);
  const renderContentForStep = () => {
    switch (stepNumber) {
      case CurrentStep.CreateANewSimulation:
        return <SimulationSelection />;

      case CurrentStep.NameAndDescription:
        return <SimulationName />;

      case CurrentStep.ConfigureSimulation:
        return <SimulationAgent />;
      case CurrentStep.AgentConfiguration:
        return <SimulationAgentConfigurationStep type={agentFlag} />;
      case CurrentStep.GoalConfiguration:
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
