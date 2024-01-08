import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import StepContent from './StepContent';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { resetState } from '@/store/features/CreateSimulation/CreateSimulationSlice';
import {
  setCurrentStep,
  setIsWildStep,
  resetControlState
} from '@/store/features/CreateSimulation/SimulationControlSlice';
import ModalTitle from './components/SimulationModalTitle';
import SimulationModalFooter from './components/SimulationModalFooter';
import useCreateGoal from '@/hooks/goals/useCreateGoal';
import { CreateGoal } from '@/api/schemas/goal';
import useCreateAgent from '@/hooks/agents/useCreateAgent';

export enum CurrentStep {
  CreateANewSimulation,
  NameAndDescription,
  ConfigureSimulation,
  AgentConfiguration,
  GoalConfiguration
}

const SimulationModal = () => {
  const [open, setOpen] = useState(false);

  //simulation type state
  const simulation = useAppSelector(state => state.simulation);
  const agent = useAppSelector(state => state.agent);
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

  const createGoalMutation = useCreateGoal();
  const createAgentMutation = useCreateAgent();

  const handleNext = () => {
    switch (currentStep) {
      case CurrentStep.CreateANewSimulation:
        if (simulation.type === '') {
          messageApi.open({
            type: 'error',
            content: 'Please select a simulation type.'
          });
          return;
        }
        break;
      case CurrentStep.NameAndDescription:
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
      case CurrentStep.AgentConfiguration:
        {
          switch (agent.type) {
            case 'SERVICE':
              {
                const { goal, temporary, ...serviceAgent } = agent; // eslint-disable-line @typescript-eslint/no-unused-vars
                createAgentMutation.mutate(serviceAgent);
              }

              break;
            case 'USER':
              {
                const { temporary, ...userAgent } = agent; // eslint-disable-line @typescript-eslint/no-unused-vars
                createAgentMutation.mutate(userAgent);
              }
              break;
            default:
              break;
          }

          dispatch(setIsWildStep(false));
          dispatch(setCurrentStep(currentStep - 1));
        }
        break;
      case CurrentStep.GoalConfiguration:
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
        <StepContent stepNumber={currentStep} />
      </Modal>
    </>
  );
};

export default SimulationModal;
