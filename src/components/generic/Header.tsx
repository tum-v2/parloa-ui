import React from 'react';
import { Typography } from 'antd';

interface HeaderProps {
  title: string;
  style?: React.CSSProperties;
}

const { Title } = Typography;

const Header = ({ title, style }: HeaderProps) => {
  return (
    <>
      <Title level={2} style={style}>
        {title}
      </Title>
    </>
  );
};

export default Header;
