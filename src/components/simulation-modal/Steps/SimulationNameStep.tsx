import React from 'react';
import SimulationCard from '../SimulationCard';
import { InputField } from '../../generic/InputField';
import { AiFillCode } from 'react-icons/ai';
import theme from '@/theme/theme';

const SimulationName = () => {
  const cardStyle = {
    width: '300px',
    padding: theme.padding.l
  };
  const inputFieldStyle = { marginBottom: theme.margin.l };

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
};

export default SimulationName;
