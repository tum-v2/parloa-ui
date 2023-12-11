'use client';

import React from 'react';
import { Typography, Card, Skeleton } from 'antd';
import MetricsCardTrend from './MetricsCardTrend';

const { Title } = Typography;

const skeletonData = [1, 2, 3];

export type NumberType = 'number' | 'percentage';

export interface MetricsCardProps {
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
  numberType,
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
          {numberType === 'percentage' && <span>%</span>}
        </Title>
        <MetricsCardTrend trendNumber={trendNumber} />
      </div>
    </Card>
  );
};

const SkeletonMetricsCard = () => {
  return skeletonData.map(item => (
    <Card key={item} style={{ width: '100%', height: '100% ' }}>
      <Skeleton active />
    </Card>
  ));
};

export { MetricsCard, SkeletonMetricsCard };