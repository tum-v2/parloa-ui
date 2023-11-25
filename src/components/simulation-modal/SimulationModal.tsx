import React, { useState } from 'react';
import { Modal, Steps, Popover } from 'antd';
import theme from '@/theme/theme';
import StepContent from './StepContent';
import Button from '../generic/Button';

const { Step } = Steps;

const customDot = (dot: React.ReactNode, { index }: { index: number }) => (
  <Popover content={<span>Step {index + 1}</span>}>{dot}</Popover>
);

const SimulationModal: React.FC = () => {
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
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    setOpen(false);
  };

  const getModalTitle = () => {
    return isWildStep
      ? 'Wild Step'
      : `Create Simulation - Step ${currentStep + 1}`;
  };

  const modalFooter = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.padding.xs,
        width: '100%'
      }}
    >
      <div style={{ width: '100px' }}>
        {(currentStep > 0 || isWildStep) && (
          <Button key="back" onClick={handlePrev}>
            Previous
          </Button>
        )}
      </div>
      <Steps
        current={currentStep}
        size="small"
        progressDot={customDot}
        style={{
          flex: 1,
          justifyContent: 'center',
          maxWidth: 'calc(100% - 20vh)'
        }}
      >
        <Step />
        <Step />
        <Step />
      </Steps>
      <div style={{ width: '100px' }}>
        {isWildStep ? (
          <Button key="save" onClick={handlePrev}>
            Save
          </Button>
        ) : currentStep === 2 ? (
          <Button key="finish" onClick={handleFinish}>
            Finish
          </Button>
        ) : (
          <Button key="next" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Button onClick={showModal}>Add New</Button>
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
          enterWildStep={() => setIsWildStep(true)}
          isLastStep={currentStep === 2}
        />
      </Modal>
    </>
  );
};

export default SimulationModal;
