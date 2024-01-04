import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import StepContent from './StepContent';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { resetState } from '@/store/features/CreateSimulation/CreateSimulationSlice';
// import useCreateSimulation from '@/hooks/useCreateSimulation';
// import useCreateOptimizedSimulation from '@/hooks/useCreateOptimizedSimulation';
// import { CreateSimulation } from '@/api/schemas/simulation';
// import useCreateChatSimulation from '@/hooks/useCreateChatSimulation';
import {
  setCurrentStep,
  setIsWildStep,
  resetControlState
} from '@/store/features/CreateSimulation/SimulationControlSlice';
import ModalTitle from './components/SimulationModalTitle';
import SimulationModalFooter from './components/SimulationModalFooter';
import useCreateGoal from '@/hooks/goals/useCreateGoal';
import { CreateGoal } from '@/api/schemas/goal';

const SimulationModal = () => {
  const [open, setOpen] = useState(false);

  //simulation type state
  const simulation = useAppSelector(state => state.simulation);
  const goal = useAppSelector(state => state.goal);
  const dispatch = useAppDispatch();

  const { currentStep, isWildStep } = useAppSelector(
    state => state.simulationControl
  );

  const showModal = () => {
    dispatch(resetState());
    setOpen(true);
    dispatch(resetControlState());
  };
  const [messageApi, contextHolder] = message.useMessage();

  // const createSimulationMutation = useCreateSimulation();
  // const createOptimizedSimulationMutation = useCreateOptimizedSimulation();
  // const createChatSimulationMutation = useCreateChatSimulation();
  const createGoalMutation = useCreateGoal();

  const handleNext = () => {
    switch (currentStep) {
      case 0:
        if (simulation.type === '') {
          messageApi.open({
            type: 'error',
            content: 'Please select a simulation type.'
          });
          return;
        }
        break;
      case 1:
        if (simulation.name === '') {
          messageApi.open({
            type: 'error',
            content: 'Please enter a simulation name.'
          });
          return;
        }
        break;
      default:
        break;
    }

    dispatch(setCurrentStep(currentStep + 1));
  };

  const handlePrev = () => {
    switch (true) {
      case isWildStep && currentStep === 3:
        dispatch(setIsWildStep(false));
        dispatch(setCurrentStep(currentStep - 1));
        break;
      case isWildStep && currentStep === 4:
        dispatch(setCurrentStep(currentStep - 1));
        break;
      default:
        dispatch(setCurrentStep(currentStep - 1));
        break;
    }
  };

  const handleSave = () => {
    switch (currentStep) {
      case 3:
        dispatch(setIsWildStep(false));
        dispatch(setCurrentStep(currentStep - 1));
        break;
      case 4:
        {
          const goalRequest: CreateGoal = {
            name: goal.name,
            description: goal.description,
            scenarios: goal.scenarios
          };
          createGoalMutation.mutate(goalRequest);
          dispatch(setCurrentStep(currentStep - 1));
        }
        break;
      default:
        dispatch(setCurrentStep(currentStep - 1));
        break;
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

    // const request: CreateSimulation = {
    //   type: simulation.type,
    //   name: simulation.name,
    //   description: simulation.description,
    //   numConversations: simulation.numConversations,
    //   serviceAgentConfig: simulation.serviceAgentConfig,
    //   userAgentConfig: simulation.userAgentConfig
    // };

    // switch (simulation.type) {
    //   case 'CHAT':
    //     createChatSimulationMutation.mutate({
    //       name: request.name,
    //       agentConfig: request.serviceAgentConfig
    //     });
    //     break;
    //   case 'OPTIMIZATION':
    //     createOptimizedSimulationMutation.mutate(request);
    //     break;
    //   default:
    //     createSimulationMutation.mutate(request);
    //     break;
    // }

    setOpen(false);
  };

  return (
    <>
      <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
        Add New
      </Button>
      <Modal
        title={<ModalTitle />}
        centered
        width={2000}
        open={open}
        onCancel={() => setOpen(false)}
        footer={
          <SimulationModalFooter
            handleFinish={handleFinish}
            handleNext={handleNext}
            handlePrev={handlePrev}
            handleSave={handleSave}
          />
        }
      >
        {contextHolder}
        <StepContent
          stepNumber={currentStep}
          enterWildStep={() => {
            dispatch(setIsWildStep(true));
          }}
        />
      </Modal>
    </>
  );
};

export default SimulationModal;
