import React, { useCallback } from 'react';
import SimulationCard from '../SimulationCard';
import ModelCard from '../ModelCard';
import { FaHeadphones, FaUser } from 'react-icons/fa';
import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setUserAgent,
  setServiceAgent,
  setScenario,
  setNumConversations
} from '@/store/features/CreateSimulation/CreateSimulationSlice';
import { Form, InputNumber } from 'antd';

const models = ['GPT-3', 'GPT-4', 'BERT', 'XLNet'];
const scenarios = ['Flight Agent', 'Customer Service', 'Tech Support', 'Sales'];

interface SimulationAgentProps {
  enterWildStep: () => void;
}

const wrapperStyle = { padding: theme.padding.l };

const SimulationAgent = ({ enterWildStep }: SimulationAgentProps) => {
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  const [mode, setMode] = React.useState<'manual' | 'automated'>('manual');
  const [Title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    if (simulation.type === 'MANUAL') {
      setMode('manual');
      setTitle('Manual');
    } else {
      setMode('automated');
      setTitle('Automated');
    }
  }, [simulation.type]);

  const handleUserAgentChange = useCallback(
    (value: string) => {
      dispatch(setUserAgent(value));
    },
    [dispatch]
  );

  const handleServiceAgentChange = useCallback(
    (value: string) => {
      dispatch(setServiceAgent(value));
    },
    [dispatch]
  );

  const handleTemplateChange = useCallback(
    (value: string) => {
      dispatch(setScenario(value));
    },
    [dispatch]
  );

  const renderContent = () => {
    switch (mode) {
      case 'automated':
        return (
          <>
            <div style={wrapperStyle}>
              <SimulationCard selectable={false} title={Title} mode={mode}>
                {mode === 'automated' ? (
                  <Form.Item label="Simulations">
                    <InputNumber
                      value={simulation.numConversations}
                      onChange={value =>
                        dispatch(setNumConversations(value as number))
                      }
                    />
                  </Form.Item>
                ) : null}
              </SimulationCard>
            </div>
            <div style={wrapperStyle}>
              <ModelCard
                models={models}
                templates={scenarios}
                onModelChange={handleServiceAgentChange}
                onTemplateChange={handleTemplateChange}
                onButtonClick={enterWildStep}
                icon={<FaHeadphones size={100} />}
                title="Agent LLM"
              />
            </div>
            <div style={wrapperStyle}>
              <ModelCard
                models={models}
                templates={scenarios}
                onModelChange={handleUserAgentChange}
                onTemplateChange={handleTemplateChange}
                onButtonClick={enterWildStep}
                icon={<FaUser size={100} />}
                title="User LLM"
              />
            </div>
          </>
        );
      case 'manual':
        return (
          <>
            <div style={wrapperStyle}>
              <SimulationCard selectable={false} title={Title} mode={mode} />
            </div>
            <div style={wrapperStyle}>
              <ModelCard
                models={models}
                templates={scenarios}
                onModelChange={handleServiceAgentChange}
                onTemplateChange={handleTemplateChange}
                onButtonClick={enterWildStep}
                icon={<FaHeadphones size={100} />}
                title="Agent LLM"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return <div style={{ display: 'flex' }}>{renderContent()}</div>;
};

export default SimulationAgent;
