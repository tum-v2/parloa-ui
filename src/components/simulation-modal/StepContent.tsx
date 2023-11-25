import React from 'react';
import Button from '../generic/Button';
import SimulationCard from './SimulationCard';
import { InputField } from '../generic/InputField';
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
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <div style={{ width: '300px', padding: '20px' }}>
              {' '}
              {/* Set a fixed width equal to the SimulationCard */}
              <SimulationCard
                mode="manual"
                onClick={() => console.log('Simulation Card Clicked')}
              />
            </div>
            <div style={{ width: '400px', padding: '20px' }}>
              {/* Set a fixed width equal to the SimulationCard */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="simulation-name"
                  style={{ display: 'block', marginBottom: '8px' }}
                >
                  Simulation Name
                </label>
                <InputField
                  id="simulation-name"
                  type="text"
                  size="large"
                  placeholder="Simulation Name"
                />
              </div>
              <div>
                <label
                  htmlFor="simulation-description"
                  style={{ display: 'block', marginBottom: '8px' }}
                >
                  Description
                </label>
                <InputField
                  id="simulation-description"
                  type="textarea"
                  size="large"
                  placeholder="Description"
                  minRows={6}
                />
              </div>
            </div>
          </div>
        );

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
