import React from 'react';
import { useAppSelector } from '@/store/hooks';

export const STEP_TITLES = [
  'Create a New Simulation',
  'Name & Description',
  'Configure Simulation',
  'Agent Configuration',
  'Goal Configuration'
];

const ModalTitle = () => {
  const { currentStep } = useAppSelector(state => state.simulationControl);
  return <>{STEP_TITLES[currentStep] || ''}</>;
};

export default ModalTitle;
