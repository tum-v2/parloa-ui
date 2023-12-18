'use client';

import SimulationTable from './SimulationTable';
import Content from '@/components/generic/Content';
import Header from '@/components/generic/Header';
import { InputField } from '@/components/generic/InputField';
import SimulationModal from '@/components/simulation-modal/SimulationModal';
import { SearchOutlined } from '@ant-design/icons';
import { Flex, DatePicker, Space } from 'antd';
import { useState } from 'react';

const { RangePicker } = DatePicker;

const Page = () => {
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
      <SimulationTable search={search} />
    </Content>
  );
};

export default Page;
