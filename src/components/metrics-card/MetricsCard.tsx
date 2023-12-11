'use client';

import React from 'react';
import { Typography, Card, Progress } from 'antd';
import { scaleValueLinearly } from '@/lib/utils/math';

const { Title } = Typography;

interface ProgressOptions {
  min: number;
  max: number;
  color: string;
}

interface MetricsCardProps {
  title: string;
  icon: React.ReactNode;
  value: number | string;
  unit?: string;
  trendNumber?: number;
  progressOptions?: ProgressOptions;
}

const MetricsCard = ({
  title,
  icon,
  value,
  unit,
  progressOptions
}: MetricsCardProps) => {
  const topPartStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '5rem'
  };

  return (
    <Card style={{ width: '100%' }}>
      <div style={topPartStyle}>
        <Title style={{ margin: 0 }} ellipsis={{ rows: 2 }} level={4}>
          {title}
        </Title>
        {icon}
      </div>
      <div>
        <Title
          style={{
            margin: 0,
            color: progressOptions ? progressOptions.color : ''
          }}
          level={2}
        >
          {`${value}${unit ?? ''}`}
        </Title>
        {progressOptions && (
          <Progress
            percent={scaleValueLinearly(
              value as number,
              progressOptions.min,
              progressOptions.max
            )}
            showInfo={false}
            strokeColor={progressOptions.color}
          />
        )}
      </div>
    </Card>
  );
};

export default MetricsCard;
