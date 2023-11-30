import React from 'react';
import { AiFillCode } from 'react-icons/ai';
import { IoReload } from 'react-icons/io5';
import SimulationCard from '../SimulationCard';
import theme from '@/theme/theme';

const SimulationSelection = () => {
  const wrapperStyle = { padding: theme.padding.l };

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
};

export default SimulationSelection;
