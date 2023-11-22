// 'use client';
// import React, { useState } from 'react';
// import { InputField } from '@/components/generic/InputField';
// import { BsFillSendFill } from 'react-icons/bs';
// import { Flex } from 'antd';
// import { DropdownMenu } from '@/components/generic/Dropdown';
// import type { MenuProps } from 'antd';

// const items: MenuProps['items'] = [
//   {
//     label: 'GPT - 4',
//     key: 'GPT - 4'
//   },
//   {
//     label: 'LLAMA 2',
//     key: 'LLAMA 2'
//   },
//   {
//     label: 'GPT - 3.5',
//     key: 'GPT - 3.5'
//   }
// ];

// eslint-disable-next-line require-jsdoc
export default function Page() {
  // const [dropDownText, setDropDownText] = useState('Choose LLM');
  // const onClick: MenuProps['onClick'] = ({ key }) => {
  //   setDropDownText(key);
  //   console.log(key);
  // };
  return (
    <>
      <h1>Hello, Simulations Page!</h1>
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
          rows={4}
        />
        <InputField
          type="password"
          placeholder="This is a sample password"
          size="large"
        />
        <DropdownMenu menu={{ items, onClick }} text={dropDownText} />
      </Flex> */}
    </>
  );
}
