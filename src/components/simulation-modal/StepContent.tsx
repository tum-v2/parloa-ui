import React, { useState } from 'react';
import { Select, Slider, Segmented } from 'antd';
import SimulationCard from './SimulationCard';
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

  const wrapperStyle: React.CSSProperties = { padding: theme.padding.l };
  const cardStyle: React.CSSProperties = {
    width: '300px',
    padding: theme.padding.l
  };
  const inputFieldStyle: React.CSSProperties = { marginBottom: theme.margin.l };
  const sliderContainerStyle: React.CSSProperties = {
    marginTop: theme.margin.l
  };

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
          <div style={{ display: 'flex' }}>
            <div style={wrapperStyle}>
              <SimulationCard
                selectable={true}
                title="Manual"
                mode="manual"
                icon={<AiFillCode size={100} />}
              />
            </div>
            <div style={wrapperStyle}>
              <SimulationCard
                selectable={true}
                title="Automated"
                mode="automated"
                icon={<IoReload size={100} />}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <div style={cardStyle}>
              <SimulationCard
                selectable={false}
                title="Automated"
                mode="automated"
                icon={<AiFillCode size={100} />}
              />
            </div>
            <div style={cardStyle}>
              <div style={inputFieldStyle}>
                <label
                  htmlFor="simulation-name"
                  style={{ display: 'block', marginBottom: theme.padding.s }}
                >
                  Simulation Name
                </label>
                <InputField
                  id="simulation-name"
                  type="text"
                  size="large"
                  placeholder="Simulation Name"
                />
              </div>
              <div>
                <label
                  htmlFor="simulation-description"
                  style={{ display: 'block', marginBottom: theme.padding.s }}
                >
                  Description
                </label>
                <InputField
                  id="simulation-description"
                  type="textarea"
                  size="large"
                  placeholder="Description"
                  minRows={10}
                  maxRows={10}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={{ display: 'flex' }}>
            <div style={wrapperStyle}>
              <SimulationCard
                selectable={false}
                title="Automated"
                mode="automated"
                icon={<AiFillCode size={100} />}
              />
            </div>
            <div style={wrapperStyle}>
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
            <div style={wrapperStyle}>
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
          </div>
        );

      case 9:
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
              width: '80%'
            }}
          >
            <div style={{ width: '40%', padding: theme.padding.l }}>
              <div style={inputFieldStyle}>
                <label
                  htmlFor="template-name"
                  style={{ display: 'block', marginBottom: theme.padding.s }}
                >
                  Template Name
                </label>
                <InputField id="template-name" type="text" size="large" />
              </div>
              <div style={inputFieldStyle}>
                <label
                  htmlFor="instructions"
                  style={{ display: 'block', marginBottom: theme.padding.s }}
                >
                  Instructions
                </label>
                <InputField
                  id="instructions"
                  type="textarea"
                  size="large"
                  minRows={6}
                />
              </div>
            </div>
            <div style={{ width: '40%', padding: theme.padding.l }}>
              <Select
                defaultValue="Sequence"
                style={{ width: 120 }}
                onChange={handleScenarioTypeChange}
                options={[
                  { value: 'Sequence', label: 'Sequence' },
                  { value: 'Slot Filling', label: 'Slot Filling' },
                  { value: 'Call Forward', label: 'Call Forward' }
                ]}
              />
              <div style={sliderContainerStyle}>
                <label>Temperature (0 - 1):</label>
                <Slider
                  min={0}
                  max={1}
                  step={0.01}
                  value={temperature}
                  onChange={value => setTemperature(value as number)}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label>Max Tokens (1024 - 4096):</label>
                <Slider
                  min={1024}
                  max={4096}
                  step={1}
                  value={maxTokens}
                  onChange={value => setMaxTokens(value as number)}
                />
              </div>
              <div style={sliderContainerStyle}>
                <label>Overwrite Template:</label>
                <br />
                <Segmented options={['Yes', 'No']} />
              </div>
            </div>
          </div>
        );

      default:
        return <p>{`Step ${stepNumber}`}</p>;
    }
  };

  return (
    <div
      style={{
        height: '50vh',
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
