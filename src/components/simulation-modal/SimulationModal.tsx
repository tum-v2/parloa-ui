import React, { useState } from 'react';
import { Button, Modal, Steps, Popover } from 'antd';
import theme from '@/theme/theme';
import StepContent from './StepContent';

const { Step } = Steps;

const customDot = (dot: React.ReactNode, { index }: { index: number }) => (
  <Popover content={<span>Step {index + 1}</span>}>{dot}</Popover>
);

const SimulationModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const showModal = () => {
    setOpen(true);
    setCurrentStep(0); // Reset to the first step when the modal is opened
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinish = () => {
    // Implement the finish action here
    setOpen(false);
  };

  // Function to return the modal title based on the current step
  const getModalTitle = () => `Create Simulation - Step ${currentStep + 1}`;

  // Custom footer
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
        {' '}
        {/* Fixed width for button alignment */}
        {currentStep > 0 && (
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
        <Step style={{ padding: 0, flex: 0 }} />
        <Step style={{ padding: 0, flex: 0 }} />
        <Step style={{ padding: 0, flex: 0 }} />
      </Steps>
      <div style={{ width: '100px' }}>
        {' '}
        {/* Fixed width for button alignment */}
        {currentStep < 2 ? (
          <Button key="next" type="primary" onClick={handleNext}>
            Next
          </Button>
        ) : (
          <Button key="finish" type="primary" onClick={handleFinish}>
            Finish
          </Button>
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
        <StepContent stepNumber={currentStep + 1} />
        {/* Render the StepContent component with the current step */}
      </Modal>
    </>
  );
};

export default SimulationModal;
