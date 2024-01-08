'use client';

import SimulationTable from './SimulationTable';
import Content from '@/components/generic/Content';
import Header from '@/components/generic/Header';
import { InputField } from '@/components/generic/InputField';
import SimulationModal from '@/components/simulation-modal/SimulationModal';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, DatePicker, Space } from 'antd';
import { useState } from 'react';
import useSimulations from '@/hooks/useSimulations';
import { Simulation } from '@/api/schemas/simulation';
import SimulationTypePill from '@/components/generic/SimulationTypePill';
import theme from '@/theme/theme';
import Pill from '@/components/generic/Pill';
import { simulationStatusDescription } from '@/lib/utils/text';

const { RangePicker } = DatePicker;

const Page = () => {
  const [search, setSearch] = useState<string>('');
  const { data: simulations, isLoading } = useSimulations();
  const [filterRunning, setFilterRunning] = useState<boolean>(true);
  const [filterFinished, setFilterFinished] = useState<boolean>(true);
  const [filterFailed, setFilterFailed] = useState<boolean>(true);
  const [filterAutomated, setFilterAutomated] = useState<boolean>(true);
  const [filterChat, setFilterChat] = useState<boolean>(true);
  const [filterOptimization, setFilterOptimization] = useState<boolean>(true);
  const [filterAb, setFilterAb] = useState<boolean>(true);

  const filteredSimulations: Simulation[] = (simulations ?? []).filter(
    simulation => {
      if (!simulation.name.toLowerCase().startsWith(search.toLowerCase())) {
        return false;
      }

      if (!filterRunning && simulation.status === 'RUNNING') {
        return false;
      }

      if (!filterFinished && simulation.status === 'FINISHED') {
        return false;
      }

      if (!filterFailed && simulation.status === 'FAILED') {
        return false;
      }

      if (!filterAutomated && simulation.type === 'AUTOMATED') {
        return false;
      }

      if (!filterChat && simulation.type === 'CHAT') {
        return false;
      }

      if (!filterOptimization && simulation.type === 'OPTIMIZATION') {
        return false;
      }

      if (!filterAb && simulation.type === 'A/B TESTING') {
        return false;
      }

      return true;
    }
  );

  const disabledColor = theme.color.ligthGray;

  return (
    <Content>
      <Header title="Simulations" />
      <Flex
        justify="space-between"
        align="center"
        className="mb-5"
        gap={'small'}
      >
        <Space direction="horizontal" size={'small'}>
          <InputField
            placeholder="Search"
            type="text"
            prefix={<SearchOutlined />}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <RangePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
          />
        </Space>
        <SimulationModal />
      </Flex>

      <Space
        direction="horizontal"
        size={'small'}
        style={{ flexWrap: 'wrap', marginBottom: theme.margin.l }}
      >
        <SimulationTypePill
          customColor={!filterAutomated ? disabledColor : undefined}
          type={'AUTOMATED'}
          onClick={() => setFilterAutomated(!filterAutomated)}
        />

        <SimulationTypePill
          customColor={!filterChat ? disabledColor : undefined}
          type={'CHAT'}
          onClick={() => setFilterChat(!filterChat)}
        />

        <SimulationTypePill
          customColor={!filterOptimization ? disabledColor : undefined}
          type={'OPTIMIZATION'}
          onClick={() => setFilterOptimization(!filterOptimization)}
        />

        <SimulationTypePill
          customColor={!filterAb ? disabledColor : undefined}
          type={'A/B TESTING'}
          onClick={() => setFilterAb(!filterAb)}
        />

        <Pill
          color={!filterRunning ? disabledColor : theme.color.deepPurple}
          onClick={() => setFilterRunning(!filterRunning)}
        >
          {simulationStatusDescription('RUNNING')}
        </Pill>

        <Pill
          color={!filterFinished ? disabledColor : theme.color.green}
          onClick={() => setFilterFinished(!filterFinished)}
        >
          {simulationStatusDescription('FINISHED')}
        </Pill>

        <Pill
          color={!filterFailed ? disabledColor : theme.color.red}
          onClick={() => setFilterFailed(!filterFailed)}
        >
          {simulationStatusDescription('FAILED')}
        </Pill>
      </Space>
      <SimulationTable
        simulations={filteredSimulations}
        isLoading={isLoading}
      />
    </Content>
  );
};

export default Page;
