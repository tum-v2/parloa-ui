import React, { useCallback, useEffect, useState } from 'react';
import SimulationTypeCard from '../SimulationTypeCard';
import ModelCard from '../ModelCard';
import { FaHeadphones, FaUser } from 'react-icons/fa';
// import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setType,
  setUserAgent,
  setServiceAgent,
  setNumConversations
} from '@/store/features/CreateSimulation/CreateSimulationSlice';
import { Form, InputNumber, Switch, Space, Flex } from 'antd';
import InputField from '../AgentNameInput';
import { SimulationMode } from '../SimulationTypeCard';

const models = ['FAKE', 'GPT35', 'GPT35TURBO', 'GPT4', 'LLAMA2'];

interface SimulationAgentProps {
  enterWildStep: () => void;
}

const SimulationAgent = ({ enterWildStep }: SimulationAgentProps) => {
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();
  const serviceAgentConfig = simulation.serviceAgentConfig;
  const userAgentConfig = simulation.userAgentConfig;

  const [mode, setMode] = useState<SimulationMode>(SimulationMode.CHAT);
  const [Title, setTitle] = useState<string>('');

  useEffect(() => {
    if (simulation.type === 'CHAT') {
      setMode(SimulationMode.CHAT);
      setTitle('Manual');
    } else {
      setMode(SimulationMode.AUTOMATED);
      setTitle('Automated');
    }
  }, [simulation.type]);

  const handleUserAgentChange = useCallback(
    (value: string) => {
      dispatch(
        setUserAgent({
          ...userAgentConfig,
          llm: value
        })
      );
    },
    [dispatch, userAgentConfig]
  );

  const handleServiceAgentChange = useCallback(
    (value: string) => {
      dispatch(
        setServiceAgent({
          ...serviceAgentConfig,
          llm: value
        })
      );
    },
    [dispatch, serviceAgentConfig]
  );

  const handleServiceAgentNameChange = (value: string) => {
    dispatch(
      setServiceAgent({
        ...serviceAgentConfig,
        name: value
      })
    );
  };

  const handleUserAgentNameChange = (value: string) => {
    dispatch(
      setUserAgent({
        ...userAgentConfig,
        name: value
      })
    );
  };

  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      dispatch(setType('OPTIMIZATION'));
    } else {
      dispatch(setType('AUTOMATED'));
    }
  };

  const renderContent = () => {
    switch (mode) {
      case SimulationMode.AUTOMATED:
        return (
          <Flex justify="center" align="center" className="h-3/4 w-full">
            <div className="h-full aspect-[3/4] px-6 max-w-sm">
              <SimulationTypeCard selectable={false} title={Title} mode={mode}>
                {mode === SimulationMode.AUTOMATED ? (
                  <>
                    <Form.Item label="Simulations">
                      <InputNumber
                        value={simulation.numConversations}
                        onChange={value =>
                          dispatch(setNumConversations(value as number))
                        }
                      />
                    </Form.Item>
                    <Space direction="vertical">
                      <div>
                        <Switch
                          checkedChildren="On"
                          unCheckedChildren="Off"
                          onChange={handleSwitchChange}
                        />
                        {' Optimization'}
                      </div>
                    </Space>
                  </>
                ) : null}
              </SimulationTypeCard>
            </div>
            <div className="h-full aspect-[3/4] px-6 max-w-sm">
              <ModelCard
                models={models}
                inputField={
                  <InputField
                    value={simulation.serviceAgentConfig.name}
                    onChange={handleServiceAgentNameChange}
                  />
                }
                onModelChange={handleServiceAgentChange}
                onButtonClick={enterWildStep}
                icon={<FaHeadphones size={100} />}
                title="Agent LLM"
              />
            </div>
            <div className="h-full aspect-[3/4] px-6 max-w-sm">
              <ModelCard
                inputField={
                  <InputField
                    value={simulation.userAgentConfig.name}
                    onChange={handleUserAgentNameChange}
                  />
                }
                models={models}
                onModelChange={handleUserAgentChange}
                onButtonClick={enterWildStep}
                icon={<FaUser size={100} />}
                title="User LLM"
              />
            </div>
          </Flex>
        );
      case SimulationMode.CHAT:
        return (
          <Flex justify="center" align="center" className="h-3/4 w-full">
            <div className="h-full aspect-[3/4] px-6 max-w-sm">
              <SimulationTypeCard
                selectable={false}
                title={Title}
                mode={mode}
              />
            </div>
            <div className="h-full aspect-[3/4] px-6 max-w-sm">
              <ModelCard
                inputField={
                  <InputField
                    value={simulation.serviceAgentConfig.name}
                    onChange={handleServiceAgentNameChange}
                  />
                }
                models={models}
                onModelChange={handleServiceAgentChange}
                onButtonClick={enterWildStep}
                icon={<FaHeadphones size={100} />}
                title="Agent LLM"
              />
            </div>
          </Flex>
        );
      default:
        return null;
    }
  };

  return renderContent();
};

export default SimulationAgent;
