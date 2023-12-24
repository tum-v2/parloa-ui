import React, { useState } from 'react';
import { Modal, Steps, Popover, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import StepContent from './StepContent';
import BackButton from '../generic/BackButton';
import NextButton from '../generic/NextButton';
import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { resetState } from '@/store/features/CreateSimulation/CreateSimulationSlice';
import useCreateSimulation from '@/hooks/useCreateSimulation';
import useCreateOptimizedSimulation from '@/hooks/useCreateOptimizedSimulation';
import { CreateSimulation } from '@/api/schemas/simulation';
import useCreateChatSimulation from '@/hooks/useCreateChatSimulation';
import {
  setCurrentStep,
  setIsWildStep,
  resetControlState
} from '@/store/features/CreateSimulation/SimulationControlSlice';

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
  // const [currentStep, setCurrentStep] = useState(0);
  // const [isWildStep, setIsWildStep] = useState(false);

  //simulation type state
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  const { currentStep, isWildStep } = useAppSelector(
    state => state.simulationControl
  );

  const showModal = () => {
    dispatch(resetState());
    setOpen(true);
    // setCurrentStep(0);
    // setIsWildStep(false);
    dispatch(resetControlState());
  };
  const [messageApi, contextHolder] = message.useMessage();

  const createSimulationMutation = useCreateSimulation();
  const createOptimizedSimulationMutation = useCreateOptimizedSimulation();
  const createChatSimulationMutation = useCreateChatSimulation();

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

    dispatch(setCurrentStep(currentStep + 1));
  };

  const handlePrev = () => {
    if (isWildStep) {
      dispatch(setIsWildStep(false));
      dispatch(setCurrentStep(2));
    } else {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  const handleFinish = () => {
    if (simulation.numConversations <= 0) {
      messageApi.open({
        type: 'error',
        content: 'Please enter a number of conversations.'
      });
      return;
    }

    const request: CreateSimulation = {
      type: simulation.type,
      name: simulation.name,
      description: simulation.description,
      numConversations: simulation.numConversations,
      serviceAgentConfig: simulation.serviceAgentConfig,
      userAgentConfig: simulation.userAgentConfig
    };

    switch (simulation.type) {
      case 'CHAT':
        createChatSimulationMutation.mutate({
          name: request.name,
          agentConfig: request.serviceAgentConfig
        });
        break;
      case 'OPTIMIZATION':
        createOptimizedSimulationMutation.mutate(request);
        break;
      default:
        createSimulationMutation.mutate(request);
        break;
    }

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
          stepNumber={currentStep}
          enterWildStep={() => {
            dispatch(setCurrentStep(8));
            dispatch(setIsWildStep(true));
          }}
        />
      </Modal>
    </>
  );
};

export default SimulationModal;
