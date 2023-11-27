import React from 'react';
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
  const handleModelChange = () => {
    console.log(`Selected Model`);
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
        return <>Edit LLM Template Content</>;

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
