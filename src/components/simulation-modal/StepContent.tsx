import React from 'react';
import Button from '../generic/Button';
import SimulationCard from './SimulationCard';
interface StepContentProps {
  stepNumber: number;
  enterWildStep: () => void;
  isLastStep: boolean;
}

const StepContent: React.FC<StepContentProps> = ({
  stepNumber,
  enterWildStep,
  isLastStep
}) => {
  const renderContentForStep = () => {
    switch (stepNumber) {
      case 1:
        return (
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '20px' }}>
              <SimulationCard
                mode="manual"
                onClick={() => console.log('Manual Simulation Card Clicked')}
              />
            </div>
            <div style={{ padding: '20px' }}>
              <SimulationCard
                mode="automated"
                onClick={() => console.log('Automated Simulation Card Clicked')}
              />
            </div>
          </div>
        );

      case 2:
        // Content for step 2
        break;

      case 3:
        // Content for step 3
        return isLastStep ? (
          <Button onClick={enterWildStep}>Go to Wild Step</Button>
        ) : (
          // Other content for step 3 if it's not the last step
          <p>{`Step ${stepNumber}`}</p>
        );

      default:
        // Default content if none of the above cases match
        return <p>{`Step ${stepNumber}`}</p>;
    }
  };

  return (
    <div
      style={{
        height: '50vh',
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
