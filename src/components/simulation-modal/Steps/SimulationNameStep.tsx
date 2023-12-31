import React, { useEffect, useState } from 'react';
import SimulationTypeCard from '../SimulationTypeCard';
import { InputField } from '../../generic/InputField';
import theme from '@/theme/theme';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  setName,
  setDescription
} from '@/store/features/CreateSimulation/CreateSimulationSlice';
import { Flex } from 'antd';
import { SimulationMode } from '../SimulationTypeCard';

const SimulationName = () => {
  //Simulation State
  const simulation = useAppSelector(state => state.simulation);
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState<SimulationMode>(SimulationMode.CHAT);
  const [Title, setTitle] = useState<string>('');

  useEffect(() => {
    if (simulation.type === 'CHAT') {
      setMode(SimulationMode.CHAT);
      setTitle('Manual');
    } else {
      setMode(SimulationMode.AUTOMATED);
      setTitle('Automated');
    }
  }, [simulation.type]);

  return (
    <Flex justify="center" align="flex-start" className="h-3/4 w-full">
      <div className="aspect-[3/4] h-full px-6 max-w-sm">
        <SimulationTypeCard selectable={false} title={Title} mode={mode} />
      </div>
      <Flex vertical className="w-1/3 px-6" gap={'middle'}>
        <div>
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
      </Flex>
    </Flex>
  );
};

export default SimulationName;
