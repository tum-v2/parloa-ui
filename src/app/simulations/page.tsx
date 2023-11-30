'use client';

import SimulationTable from './SimulationTable';
import Content from '@/components/generic/Content';
import Header from '@/components/generic/Header';

const Page = () => {
  return (
    <Content>
      <Header title="Simulations" />
      <SimulationTable />
    </Content>
  );
};

export default Page;
