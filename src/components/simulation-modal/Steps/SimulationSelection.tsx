import React from 'react';
import SimulationCard from '../SimulationCard';
import theme from '@/theme/theme';

const SimulationSelection = () => {
  const wrapperStyle = { padding: theme.padding.l };

  return (
    <div style={{ display: 'flex' }}>
      <div style={wrapperStyle}>
        <SimulationCard selectable={true} title="Manual" mode="manual" />
      </div>
      <div style={wrapperStyle}>
        <SimulationCard selectable={true} title="Automated" mode="automated" />
      </div>
    </div>
  );
};

export default SimulationSelection;
