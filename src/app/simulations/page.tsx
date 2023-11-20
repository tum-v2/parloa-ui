'use client';
import InputField from '@/components/generic/InputField';
import { BsFillSendFill } from 'react-icons/bs';
import { Flex } from 'antd';
// eslint-disable-next-line require-jsdoc
export default function Page() {
  return (
    <>
      <h1>Hello, Simulations Page!</h1>
      <Flex vertical gap={32}>
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
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
        <InputField
          type="password"
          placeholder="This is a sample password"
          size="large"
        />
      </Flex>
    </>
  );
}
