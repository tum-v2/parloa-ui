'use client';
import ModelCard from '@/components/simulation-modal/ModelCard';
import SimulationModal from '@/components/simulation-modal/SimulationModal';

// Dummy data for the models and scenarios dropdowns
const models = ['GPT-3', 'GPT-4', 'BERT', 'XLNet'];
const scenarios = ['Flight Agent', 'Customer Service', 'Tech Support', 'Sales'];

// Dummy functions to handle dropdown changes and button click
const handleModelChange = () => {
  console.log(`Selected Model`);
};

const handleScenarioChange = () => {
  console.log(`Selected Scenario:`);
};

const handleButtonClick = () => {
  console.log('Button clicked!');
};

// eslint-disable-next-line require-jsdoc
export default function Page() {
  return (
    <>
      <h1>Hello, Simulations Page!</h1>
      <SimulationModal />
      <ModelCard
        models={models}
        scenarios={scenarios}
        onModelChange={handleModelChange}
        onScenarioChange={handleScenarioChange}
        onButtonClick={handleButtonClick}
      />
    </>
  );
}
