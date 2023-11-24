import React from 'react';
import Button from '../generic/Button';

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
  return (
    <div
      style={{
        height: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {isLastStep ? (
        <Button onClick={enterWildStep}>Go to Wild Step</Button>
      ) : (
        <p>{`Step ${stepNumber}`}</p>
      )}
    </div>
  );
};

export default StepContent;
