import React from 'react';
import { Typography } from 'antd';

interface HeaderProps {
  title: string;
}

const { Title } = Typography;

const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <Title level={2}>{title}</Title>
    </>
  );
};

export default Header;
