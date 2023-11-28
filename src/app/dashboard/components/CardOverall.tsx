'use client';

import React from 'react';
import Card from '../../../components/generic/Card';
import { Flex, Typography } from 'antd';
import theme from '@/theme/theme';
import { IconContext } from 'react-icons';
import CardOverallTrend from './CardOverallTrend';

const { Text, Title } = Typography;

export type NumberType = 'number' | 'percentage';
export type Trend = 'up' | 'down';

interface CardOverallProps {
  title: string;
  icon: React.ReactNode;
  numberType: NumberType;
  number: number;
  trend: Trend;
  trendNumber: number;
}

const CardOverall = ({
  title,
  icon,
  numberType,
  number,
  trend,
  trendNumber
}: CardOverallProps) => {
  const topPartStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: 80
  };

  const insideCardStyle: React.CSSProperties = {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start'
  };

  return (
    // <div style={cardOverallStyle}>
    <Card margin="none">
      <div style={topPartStyle}>
        <Title style={{ margin: 0 }} level={4}>
          {title}
        </Title>
        {icon}
      </div>
      <div>
        <Title style={{ margin: 0 }} level={1}>
          {number}
        </Title>
        <CardOverallTrend trend={trend} trendNumber={trendNumber} />
      </div>
    </Card>
    // </div>
  );
};

export default CardOverall;
