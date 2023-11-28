'use client';

import React from 'react';
import Card from '../../../components/generic/Card';
import { Typography } from 'antd';
import CardOverallTrend from './CardOverallTrend';

const { Title } = Typography;

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

  return (
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
  );
};

export default CardOverall;
