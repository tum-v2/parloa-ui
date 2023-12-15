import React, { useState } from 'react';
import { Select, Slider, Segmented, Flex } from 'antd';
import SimulationTypeCard from './SimulationTypeCard';
import ModelCard from './ModelCard';
import { InputField } from '../generic/InputField';
import { FaHeadphones, FaUser } from 'react-icons/fa';
import { AiFillCode } from 'react-icons/ai';
import { IoReload } from 'react-icons/io5';
import theme from '@/theme/theme';

const models = ['GPT-3', 'GPT-4', 'BERT', 'XLNet'];
const scenarios = ['Flight Agent', 'Customer Service', 'Tech Support', 'Sales'];

interface StepContentProps {
  stepNumber: number;
  enterWildStep: () => void;
}

const StepContent: React.FC<StepContentProps> = ({
  stepNumber,
  enterWildStep
}) => {
  const [temperature, setTemperature] = useState<number>(0.5);
  const [maxTokens, setMaxTokens] = useState<number>(2048);

  const handleModelChange = () => {
    console.log(`Selected Model`);
  };

  const handleScenarioTypeChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleScenarioChange = () => {
    console.log(`Selected Scenario:`);
  };

  const renderContentForStep = () => {
    switch (stepNumber) {
      case 1:
        return (
          <Flex className="w-full h-full" align="center" justify="center">
            <div className="w-1/5 h-3/4 px-6">
              <SimulationTypeCard
                selectable={true}
                title="Manual"
                mode="manual"
                icon={<AiFillCode size={100} />}
              />
            </div>
            <div className="w-1/5 h-3/4 px-6">
              <SimulationTypeCard
                selectable={true}
                title="Automated"
                mode="automated"
                icon={<IoReload size={100} />}
              />
            </div>
          </Flex>
        );

      case 2:
        return (
          <Flex justify="center" align="flex-start" className="h-3/4 w-full">
            <div className="w-1/5 h-full px-6">
              <SimulationTypeCard
                selectable={false}
                title="Automated"
                mode="automated"
                icon={<AiFillCode size={100} />}
              />
            </div>
            <Flex vertical className="w-1/3 px-6" gap={'middle'}>
              <div>
                <label
                  htmlFor="simulation-name"
                  style={{ display: 'block', marginBottom: theme.margin.s }}
                >
                  Simulation Name
                </label>
                <InputField
                  id="simulation-name"
                  type="text"
                  placeholder="Simulation Name"
                />
              </div>
              <div>
                <label
                  htmlFor="simulation-description"
                  style={{ display: 'block', marginBottom: theme.margin.s }}
                >
                  Description
                </label>
                <InputField
                  id="simulation-description"
                  type="textarea"
                  placeholder="Description"
                  minRows={10}
                  maxRows={10}
                />
              </div>
            </Flex>
          </Flex>
        );

      case 3:
        return (
          <Flex justify="center" align="center" className="h-3/4 w-full">
            <div className="w-1/5 h-full px-6">
              <SimulationTypeCard
                selectable={false}
                title="Automated"
                mode="automated"
                icon={<AiFillCode size={100} />}
              />
            </div>
            <div className="w-1/5 h-full px-6">
              <ModelCard
                models={models}
                scenarios={scenarios}
                onModelChange={handleModelChange}
                onScenarioChange={handleScenarioChange}
                onButtonClick={enterWildStep}
                icon={<FaHeadphones size={100} />}
                title="Agent LLM"
              />
            </div>
            <div className="w-1/5 h-full px-6">
              <ModelCard
                models={models}
                scenarios={scenarios}
                onModelChange={handleModelChange}
                onScenarioChange={handleScenarioChange}
                onButtonClick={enterWildStep}
                icon={<FaUser size={100} />}
                title="User LLM"
              />
            </div>
          </Flex>
        );

      case 9:
        return (
          <Flex justify="space-between" align="flex-start" className="w-full">
            <Flex
              vertical
              gap="middle"
              className="w-full"
              style={{ padding: theme.padding.l }}
            >
              <div>
                <label
                  htmlFor="template-name"
                  style={{ display: 'block', marginBottom: theme.margin.s }}
                >
                  Template Name
                </label>
                <InputField id="template-name" type="text" />
              </div>
              <div>
                <label
                  htmlFor="instructions"
                  style={{ display: 'block', marginBottom: theme.margin.s }}
                >
                  Instructions
                </label>
                <InputField id="instructions" type="textarea" minRows={6} />
              </div>
            </Flex>
            <Flex
              vertical
              gap="middle"
              className="w-full"
              style={{ padding: theme.padding.l }}
            >
              <div>
                <label
                  htmlFor="instructions"
                  style={{ display: 'block', marginBottom: theme.margin.s }}
                >
                  Scenario
                </label>
                <Select
                  defaultValue="Sequence"
                  onChange={handleScenarioTypeChange}
                  options={[
                    { value: 'Sequence', label: 'Sequence' },
                    { value: 'Slot Filling', label: 'Slot Filling' },
                    { value: 'Call Forward', label: 'Call Forward' }
                  ]}
                />
              </div>

              <div>
                <label>Temperature (0 - 1)</label>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={temperature}
                  onChange={value => setTemperature(value as number)}
                />
              </div>
              <div>
                <label>Max Tokens (1024 - 4096)</label>
                <Slider
                  min={1024}
                  max={4096}
                  step={1}
                  value={maxTokens}
                  onChange={value => setMaxTokens(value as number)}
                />
              </div>
              <div>
                <label
                  style={{ display: 'block', marginBottom: theme.margin.s }}
                >
                  Overwrite Template
                </label>
                <Segmented options={['Yes', 'No']} />
              </div>
            </Flex>
          </Flex>
        );

      default:
        return <p>{`Step ${stepNumber}`}</p>;
    }
  };

  return (
    <div
      style={{
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {renderContentForStep()}
    </div>
  );
};

export default StepContent;
