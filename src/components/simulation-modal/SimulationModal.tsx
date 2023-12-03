import React, { useState } from 'react';
import { Modal, Steps, Popover, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import StepContent from './StepContent';
import BackButton from '../generic/BackButton';
import NextButton from '../generic/NextButton';
import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { resetState } from '@/store/features/CreateSimulation/CreateSimulationSlice';
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

// Styles
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

const SimulationModal = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isWildStep, setIsWildStep] = useState(false);

  //simulation type state
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(resetState());
    setOpen(true);
    setCurrentStep(0);
    setIsWildStep(false);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const handleNext = () => {
    if (currentStep === 0) {
      if (simulation.type === '') {
        messageApi.open({
          type: 'error',
          content: 'Please select a simulation type.'
        });
        return;
      }
    }
    if (currentStep === 1) {
      if (simulation.name === '') {
        messageApi.open({
          type: 'error',
          content: 'Please enter a simulation name.'
        });
        return;
      }
    }
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
    const request = {
      scenario: 'SLOT_FILLING',
      type: simulation.type,
      name: simulation.name,
      numConversations: simulation.numConversations || 1,
      serviceAgentConfig: {
        llm: 'FAKE',
        temperature: 0,
        maxTokens: 260,
        prompt: 'you are an helpful bot',
        domain: 'FLIGHT'
      },
      userAgentConfig: {
        llm: 'FAKE',
        temperature: 1,
        maxTokens: 260,
        prompt: 'nonative',
        domain: 'FLIGHT'
      }
    };

    console.log(request);

    //API call to start simulation
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
        <Step />
        <Step />
        <Step />
      </Steps>
      <div style={rightAlignStyle}>
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
      <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
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
        {contextHolder}
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
