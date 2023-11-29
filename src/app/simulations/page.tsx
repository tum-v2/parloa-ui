'use client';

import { Typography } from 'antd';
import SimulationTable from './SimulationTable';

const { Title } = Typography;

const Page = () => {
  return (
    <>
      <Title level={2}>Simulations</Title>
      <SimulationTable />
    </>
  );
};

export default Page;
