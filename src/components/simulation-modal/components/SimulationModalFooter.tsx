// SimulationModalFooter.tsx
import React from 'react';
import { Steps, Button, Popover } from 'antd';
import BackButton from '@/components/generic/BackButton';
import NextButton from '@/components/generic/NextButton';
import theme from '@/theme/theme';
import { useAppSelector } from '@/store/hooks';
import { STEP_TITLES } from './SimulationModalTitle';
import { CurrentStep } from '../SimulationModal';

const { Step } = Steps;

const customDot = (dot: React.ReactNode, { index }: { index: number }) => {
  const content = STEP_TITLES[index] || '';
  return <Popover content={<span>{content}</span>}>{dot}</Popover>;
};

const modalFooterStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: theme.padding.xs,
  width: '100%'
};

const leftAlignStyle: React.CSSProperties = {
  flex: 1,
  textAlign: 'left'
};

const stepsStyle: React.CSSProperties = {
  flex: 2,
  justifyContent: 'center',
  maxWidth: '20%'
};

const rightAlignStyle: React.CSSProperties = {
  flex: 1,
  textAlign: 'right'
};

interface SimulationModalFooterProps {
  handlePrev: () => void;
  handleNext: () => void;
  handleSave: () => void;
  handleFinish: () => void;
}

const SimulationModalFooter: React.FC<SimulationModalFooterProps> = ({
  handlePrev,
  handleNext,
  handleSave,
  handleFinish
}) => {
  const { currentStep, isWildStep } = useAppSelector(
    state => state.simulationControl
  );

  const NumberOfSteps = 3;

  const getNextStepTitle = () => {
    return STEP_TITLES[currentStep + 1] || 'Start Simulation';
  };

  const getPrevStepTitle = () => {
    return STEP_TITLES[currentStep - 1] || 'Configure Simulation';
  };
  return (
    <div style={modalFooterStyle}>
      <div style={leftAlignStyle}>
        {(currentStep > 0 || isWildStep) && (
          <BackButton onClick={handlePrev}>{getPrevStepTitle()}</BackButton>
        )}
      </div>
      <Steps
        current={currentStep}
        size="small"
        progressDot={customDot}
        style={stepsStyle}
      >
        {Array.from({ length: NumberOfSteps }, (_, index) => (
          <Step key={index} />
        ))}
      </Steps>
      <div style={rightAlignStyle}>
        {isWildStep ? (
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        ) : currentStep === CurrentStep.ConfigureSimulation ? (
          <Button type="primary" onClick={handleFinish}>
            Start Simulation
          </Button>
        ) : (
          <NextButton onClick={handleNext}>{getNextStepTitle()}</NextButton>
        )}
      </div>
    </div>
  );
};

export default SimulationModalFooter;
