'use client';
import SimulationModal from '@/components/simulation-modal/SimulationModal';
import SimulationCard from '@/components/simulation-modal/SimulationCard';
// eslint-disable-next-line require-jsdoc
export default function Page() {
  return (
    <>
      <h1>Hello, Simulations Page!</h1>
      <SimulationModal />
      <SimulationCard
        mode="manual"
        onClick={() => console.log('Manual Simulation Card Clicked')}
      />
      <SimulationCard
        mode="automated"
        onClick={() => console.log('Automated Simulation Card Clicked')}
      />
    </>
  );
}
