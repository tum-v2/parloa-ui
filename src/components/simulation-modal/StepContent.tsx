import React from 'react';

interface StepContentProps {
  stepNumber: number;
}

const StepContent: React.FC<StepContentProps> = ({ stepNumber }) => (
  <div
    style={{
      height: '50vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <p>{`Step ${stepNumber}`}</p>
  </div>
);

export default StepContent;
