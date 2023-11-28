import React, { useState } from 'react';
import { Modal, Steps, Popover } from 'antd';
import theme from '@/theme/theme';
import StepContent from './StepContent';
import { Button } from 'antd';
import BackButton from '../generic/BackButton';
import NextButton from '../generic/NextButton';

const { Step } = Steps;

const STEP_TITLES = [
  'Create a New Simulation',
  'Name & Configuration',
  'Configure Simulation'
];

const customDot = (dot: React.ReactNode, { index }: { index: number }) => {
  const content = STEP_TITLES[index] || '';
  return <Popover content={<span>{content}</span>}>{dot}</Popover>;
};

const SimulationModal = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isWildStep, setIsWildStep] = useState(false);

  const showModal = () => {
    setOpen(true);
    setCurrentStep(0);
    setIsWildStep(false);
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (isWildStep) {
      setIsWildStep(false);
      setCurrentStep(2);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setOpen(false);
  };

  const getModalTitle = () => {
    if (isWildStep) {
      return 'Edit LLM Template';
    } else {
      return STEP_TITLES[currentStep] || '';
    }
  };

  const getNextStepTitle = () => {
    return STEP_TITLES[currentStep + 1] || 'Start Simulation';
  };

  const getPrevStepTitle = () => {
    return STEP_TITLES[currentStep - 1] || 'Configure Simulation';
  };

  const modalFooter = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: theme.padding.xs,
        width: '100%'
      }}
    >
      <div style={{ flex: 1, textAlign: 'left' }}>
        {' '}
        {/* Adjusted for flexible sizing and alignment */}
        {(currentStep > 0 || isWildStep) && (
          <BackButton onClick={handlePrev}>{getPrevStepTitle()}</BackButton>
        )}
      </div>
      <Steps
        current={currentStep}
        size="small"
        progressDot={customDot}
        style={{
          flex: 2,
          justifyContent: 'center',
          maxWidth: '20%'
        }}
      >
        <Step />
        <Step />
        <Step />
      </Steps>
      <div style={{ flex: 1, textAlign: 'right' }}>
        {' '}
        {/* Adjusted for flexible sizing and alignment */}
        {isWildStep ? (
          <Button type="primary" onClick={handlePrev}>
            Save
          </Button>
        ) : currentStep === 2 ? (
          <Button type="primary" onClick={handleFinish}>
            Start Simulation
          </Button>
        ) : (
          <NextButton onClick={handleNext}>{getNextStepTitle()}</NextButton>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add New
      </Button>
      <Modal
        title={getModalTitle()}
        centered
        width={1500}
        open={open}
        onCancel={() => setOpen(false)}
        footer={modalFooter}
      >
        <StepContent
          stepNumber={currentStep + 1}
          enterWildStep={() => {
            setCurrentStep(8);
            setIsWildStep(true);
          }}
        />
      </Modal>
    </>
  );
};

export default SimulationModal;
