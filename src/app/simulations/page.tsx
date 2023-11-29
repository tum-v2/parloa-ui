'use client';
// import { InputField } from '@/components/generic/InputField';
// import { BsFillSendFill } from 'react-icons/bs';
// import { Flex } from 'antd';

import { Typography } from 'antd';
import SimulationTable from './SimulationTable';

const { Title } = Typography;

// eslint-disable-next-line require-jsdoc
export default function Page() {
  return (
    <>
      <Title level={2}>Simulations</Title>
      {/* <Flex vertical gap={32}>
        <InputField
          type="text"
          placeholder="This is a sample input"
          size="large"
          suffix={<BsFillSendFill />}
        />
        <InputField
          type="textarea"
          placeholder="This is a sample textarea"
          size="large"
        />
        <InputField
          type="password"
          placeholder="This is a sample password"
          size="large"
        />
      </Flex> */}
      <SimulationTable />
    </>
  );
}
