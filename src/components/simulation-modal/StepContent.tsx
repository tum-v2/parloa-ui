import React from 'react';
import SimulationSelection from './Steps/SimulationSelection';
import SimulationName from './Steps/SimulationNameStep';
import SimulationAgent from './Steps/SimulationAgentSelectStep';
import SimulationAgentConfigurationStep from './Steps/SimulationAgentConfigurationStep';
import SimulationGoalEditStep from './Steps/SimulationGoalEditStep';

interface StepContentProps {
  stepNumber: number;
  enterWildStep: () => void;
}

const StepContent = ({ stepNumber, enterWildStep }: StepContentProps) => {
  const renderContentForStep = () => {
    switch (stepNumber) {
      case 0:
        return <SimulationSelection />;

      case 1:
        return <SimulationName />;

      case 2:
        return <SimulationAgent enterWildStep={enterWildStep} />;
      case 3:
        return <SimulationAgentConfigurationStep type="user" />;
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
