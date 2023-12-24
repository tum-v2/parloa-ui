'use client';

import React from 'react';
import { Typography, Card, Progress, Flex } from 'antd';
import { scaleValueLinearly } from '@/lib/utils/math';
import MetricsCardTrend from './MetricsCardTrend';

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
  trendNumber,
  progressOptions
}: MetricsCardProps) => {
  const topPartStyle: React.CSSProperties = {
    height: '5rem'
  };

  return (
    <Card
      style={{ width: '100%' }}
      bodyStyle={{ height: '100%', width: '100%' }}
    >
      <Flex
        justify="space-between"
        align="flex-start"
        vertical
        className="w-full h-full"
        flex={1}
      >
        <Flex
          justify="space-between"
          align="flex-start"
          style={topPartStyle}
          className="w-full"
        >
          <Title style={{ margin: 0 }} ellipsis={{ rows: 2 }} level={4}>
            {title}
          </Title>
          {icon}
        </Flex>
        <div className="w-full">
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
          <Title
            style={{
              margin: 0,
              color: progressOptions ? progressOptions.color : ''
            }}
            level={2}
          >
            {`${value}${unit ?? ''}`}
          </Title>
          {typeof trendNumber === 'number' && (
            <MetricsCardTrend trendNumber={trendNumber} />
          )}
        </div>
      </Flex>
    </Card>
  );
};

export default MetricsCard;
