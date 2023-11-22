import React from 'react';
import { Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface DropdownProps {
  menu: MenuProps;
  text: string;
}

// eslint-disable-next-line require-jsdoc
const DropdownMenu = (props: DropdownProps) => {
  return (
    <>
      <Dropdown menu={props.menu} trigger={['click']}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            {props.text}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default DropdownMenu;
