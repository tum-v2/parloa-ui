'use client';

import React from 'react';
import { Typography, Card } from 'antd';
import MetricsCardTrend from './MetricsCardTrend';

const { Title } = Typography;

export type NumberType = 'number' | 'percentage';

interface MetricsCardProps {
  title: string;
  icon: React.ReactNode;
  numberType: NumberType;
  number: number;
  trendNumber?: number;
}

const MetricsCard = ({
  title,
  icon,
  number,
  trendNumber
}: MetricsCardProps) => {
  const topPartStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '5rem'
  };

  return (
    <Card style={{ width: '100%', height: '100% ' }}>
      <div style={topPartStyle}>
        <Title style={{ margin: 0 }} ellipsis={{ rows: 2 }} level={4}>
          {title}
        </Title>
        {icon}
      </div>
      <div>
        <Title style={{ margin: 0 }} level={1}>
          {number}
        </Title>
        <MetricsCardTrend trendNumber={trendNumber} />
      </div>
    </Card>
  );
};

export default MetricsCard;
