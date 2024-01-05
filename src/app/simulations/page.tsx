'use client';

import SimulationTable from './SimulationTable';
import Content from '@/components/generic/Content';
import Header from '@/components/generic/Header';
import { InputField } from '@/components/generic/InputField';
import SimulationModal from '@/components/simulation-modal/SimulationModal';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, DatePicker, Space } from 'antd';
import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import useGoals from '@/hooks/goals/useGoals';
import { setGoals } from '@/store/features/CreateSimulation/SimulationDataSlice';
import useAgents from '@/hooks/agents/useAgents';
import {
  setServiceAgents,
  setServiceAgentsWithConfig,
  setUserAgents,
  setUserAgentsWithConfig
} from '@/store/features/CreateSimulation/SimulationDataSlice';

const { RangePicker } = DatePicker;

const Page = () => {
  const dispatch = useAppDispatch();
  const { data: goals } = useGoals();
  if (goals !== undefined) {
    dispatch(setGoals(goals));
  }

  const { data: agents } = useAgents();
  if (agents !== undefined) {
    const serviceAgentsWithConfig = agents.filter(
      agent => agent.type === 'SERVICE'
    );
    const userAgentsWithConfig = agents.filter(agent => agent.type === 'USER');

    const serviceAgents = serviceAgentsWithConfig.map(agent => {
      return {
        value: agent._id,
        label: agent.name
      };
    });
    const userAgents = userAgentsWithConfig.map(agent => {
      return {
        value: agent._id,
        label: agent.name
      };
    });

    dispatch(setServiceAgents(serviceAgents));
    dispatch(setServiceAgentsWithConfig(serviceAgentsWithConfig));
    dispatch(setUserAgents(userAgents));
    dispatch(setUserAgentsWithConfig(userAgentsWithConfig));
  }

  // TODO: Handle Search
  const [search, setSearch] = useState<string>('');
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
      <SimulationTable />
    </Content>
  );
};

export default Page;
