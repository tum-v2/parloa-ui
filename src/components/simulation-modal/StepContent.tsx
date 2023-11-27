import React, { useState } from 'react';
import { Select, Slider, Segmented } from 'antd';
import SimulationCard from './SimulationCard';
import { InputField } from '../generic/InputField';
import { FaHeadphones } from 'react-icons/fa';
import ModelCard from './ModelCard';
import { AiFillCode } from 'react-icons/ai';
import { IoReload } from 'react-icons/io5';
// Dummy data for the models and scenarios dropdowns
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
  // Dummy functions to handle dropdown changes and button click
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
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '20px' }}>
              <SimulationCard
                selectable={true}
                title="Manual"
                mode="manual"
                icon={<AiFillCode size={100} />}
              />
            </div>
            <div style={{ padding: '20px' }}>
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
        // Content for step 2
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}
          >
            <div style={{ width: '300px', padding: '20px' }}>
              {' '}
              {/* Set a fixed width equal to the SimulationCard */}
              <SimulationCard
                selectable={false}
                title="Automated"
                mode="automated"
                icon={<AiFillCode size={100} />}
              />
            </div>
            <div style={{ width: '400px', padding: '20px' }}>
              {/* Set a fixed width equal to the SimulationCard */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  htmlFor="simulation-name"
                  style={{ display: 'block', marginBottom: '8px' }}
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
                  style={{ display: 'block', marginBottom: '8px' }}
                >
                  Description
                </label>
                <InputField
                  id="simulation-description"
                  type="textarea"
                  size="large"
                  placeholder="Description"
                  minRows={6}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        // Content for step 3
        return (
          <>
            <div style={{ display: 'flex' }}>
              <div style={{ padding: '20px' }}>
                <SimulationCard
                  selectable={false}
                  title="Automated"
                  mode="automated"
                  icon={<AiFillCode size={100} />}
                />
              </div>
              <div style={{ padding: '20px' }}>
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
              <div style={{ padding: '20px' }}>
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
            </div>
          </>
        );
      case 9:
        return (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between', // Changed to 'space-between' to evenly space the inner divs
                alignItems: 'center',
                height: '100%',
                width: '80%' // Make the outer div occupy the full width of its container
              }}
            >
              <div
                style={{
                  width: '40%',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ marginBottom: '16px' }}>
                  <label
                    htmlFor="template-name"
                    style={{ display: 'block', marginBottom: '8px' }}
                  >
                    Template Name
                  </label>
                  <InputField id="template-name" type="text" size="large" />
                </div>
                <div>
                  <label
                    htmlFor="instructions"
                    style={{ display: 'block', marginBottom: '8px' }}
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
              <div
                style={{
                  width: '40%',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
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
                <div>
                  <div>
                    <label>Temperature (0 - 1):</label>
                    <Slider
                      min={0}
                      max={1}
                      step={0.01}
                      value={temperature}
                      onChange={value => setTemperature(value as number)}
                    />
                  </div>
                  <div>
                    <label>Max Tokens (1024 - 4096):</label>
                    <Slider
                      min={1024}
                      max={4096}
                      step={1}
                      value={maxTokens}
                      onChange={value => setMaxTokens(value as number)}
                    />
                  </div>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <label>Overwrite Template:</label>
                  <br />
                  <Segmented options={['Yes', 'No']} />
                </div>
              </div>
            </div>
          </>
        );

      default:
        // Default content if none of the above cases match
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
