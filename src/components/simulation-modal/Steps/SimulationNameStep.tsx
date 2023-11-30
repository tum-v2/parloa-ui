import React from 'react';
import SimulationCard from '../SimulationCard';
import { InputField } from '../../generic/InputField';
import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setName,
  setDescription
} from '@/store/features/CreateSimulation/CreateSimulationSlice';

const inputFieldStyle = { marginBottom: theme.margin.l };

const SimulationName = () => {
  const cardStyle = {
    width: '300px',
    padding: theme.padding.l
  };

  //Simulation State
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  const [mode, setMode] = React.useState<'manual' | 'automated'>('manual');
  const [Title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    if (simulation.type === 'MANUAL') {
      setMode('manual');
      setTitle('Manual');
    } else {
      setMode('automated');
      setTitle('Automated');
    }
  }, [simulation.type]);

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
        <SimulationCard selectable={false} title={Title} mode={mode} />
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
            value={simulation.name}
            onChange={e => dispatch(setName(e.target.value))}
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
            minRows={10}
            maxRows={10}
            value={simulation.description}
            onChange={e => dispatch(setDescription(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default SimulationName;
