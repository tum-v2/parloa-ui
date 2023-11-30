import React from 'react';
import SimulationCard from '../SimulationCard';
import ModelCard from '../ModelCard';
import { FaHeadphones, FaUser } from 'react-icons/fa';
import { AiFillCode } from 'react-icons/ai';
import theme from '@/theme/theme';

const models = ['GPT-3', 'GPT-4', 'BERT', 'XLNet'];
const scenarios = ['Flight Agent', 'Customer Service', 'Tech Support', 'Sales'];

interface SimulationAgentProps {
  enterWildStep: () => void;
}
const SimulationAgent = ({ enterWildStep }: SimulationAgentProps) => {
  const wrapperStyle = { padding: theme.padding.l };

  const handleModelChange = () => {
    console.log(`Selected Model`);
  };

  const handleScenarioChange = () => {
    console.log(`Selected Scenario:`);
  };

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
};

export default SimulationAgent;
