import React, { useCallback, useEffect, useState } from 'react';
import SimulationTypeCard from '../components/SimulationTypeCard';
import AgentCard from '../components/AgentCard';
import { FaHeadphones, FaUser } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setType,
  setNumConversations
} from '@/store/features/CreateSimulation/CreateSimulationSlice';
import { Form, InputNumber, Switch, Space, Flex } from 'antd';
import { SimulationMode } from '../components/SimulationTypeCard';
import useAgents from '@/hooks/agents/useAgents';
import {
  setServiceAgents,
  setServiceAgentsWithConfig,
  setUserAgents,
  setUserAgentsWithConfig
} from '@/store/features/CreateSimulation/SimulationDataSlice';

const SimulationAgent = () => {
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  const { data: agents } = useAgents();

  useEffect(() => {
    if (agents !== undefined) {
      const serviceAgentsWithConfig = agents.filter(
        agent => agent.type === 'SERVICE'
      );
      const userAgentsWithConfig = agents.filter(
        agent => agent.type === 'USER'
      );

      const serviceAgents = serviceAgentsWithConfig.map(agent => {
        return {
          value: agent._id,
          label: agent.name
        };
      });
      const userAgents = userAgentsWithConfig.map(agent => {
        return {
          value: agent._id,
          label: agent.name
        };
      });

      dispatch(setServiceAgents(serviceAgents));
      dispatch(setServiceAgentsWithConfig(serviceAgentsWithConfig));
      dispatch(setUserAgents(userAgents));
      dispatch(setUserAgentsWithConfig(userAgentsWithConfig));
    }
  }, [agents, dispatch]);

  const [mode, setMode] = useState<SimulationMode>(SimulationMode.CHAT);
  const [Title, setTitle] = useState<string>('');
  const [isOptimizationOn, setIsOptimizationOn] = useState(
    simulation.type === 'OPTIMIZATION'
  );
  const [isABTestingOn, setIsABTestingOn] = useState(
    simulation.type === 'A/B TESTING'
  );

  useEffect(() => {
    setIsOptimizationOn(simulation.type === 'OPTIMIZATION');
    setIsABTestingOn(simulation.type === 'A/B TESTING');
    if (simulation.type === 'CHAT') {
      setMode(SimulationMode.CHAT);
      setTitle('Manual');
    } else {
      setMode(SimulationMode.AUTOMATED);
      setTitle('Automated');
    }
  }, [simulation.type]);

  const handleOptimizationSwitchChange = useCallback(
    (checked: boolean) => {
      setIsOptimizationOn(checked);
      dispatch(setType(checked ? 'OPTIMIZATION' : 'AUTOMATED'));
    },
    [dispatch]
  );

  const handleABTestingSwitchChange = useCallback(
    (checked: boolean) => {
      setIsABTestingOn(checked);
      dispatch(setType(checked ? 'A/B TESTING' : 'AUTOMATED'));
    },
    [dispatch]
  );

  const renderContent = () => {
    switch (mode) {
      case SimulationMode.AUTOMATED:
        return (
          <Flex justify="center" align="center" className="h-3/4 w-full">
            <div className="h-full aspect-[3/4] px-6 max-w-sm">
              <SimulationTypeCard selectable={false} title={Title} mode={mode}>
                {mode === SimulationMode.AUTOMATED && (
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
                          checked={isOptimizationOn}
                          onChange={handleOptimizationSwitchChange}
                        />
                        {' Optimization'}
                      </div>
                      <div>
                        <Switch
                          checkedChildren="On"
                          unCheckedChildren="Off"
                          checked={isABTestingOn}
                          onChange={handleABTestingSwitchChange}
                        />
                        {' A/B Testing'}
                      </div>
                    </Space>
                  </>
                )}
              </SimulationTypeCard>
            </div>
            <div className="h-full aspect-[3/4] px-6 max-w-sm">
              <AgentCard icon={<FaHeadphones size={100} />} type="SERVICE" />
            </div>
            {isABTestingOn && (
              <div className="h-full aspect-[3/4] px-6 max-w-sm">
                <AgentCard icon={<FaUser size={100} />} type="SERVICE" />
              </div>
            )}
            <div className="h-full aspect-[3/4] px-6 max-w-sm">
              <AgentCard icon={<FaUser size={100} />} type="USER" />
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
              <AgentCard icon={<FaHeadphones size={100} />} type="SERVICE" />
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
