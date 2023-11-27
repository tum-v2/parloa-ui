'use client';

import React from 'react';
import Card from '../../../components/generic/Card';
import { Flex, Typography } from 'antd';
import theme from '@/theme/theme';
import { IconContext } from 'react-icons';

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
  const cardOverallStyle: React.CSSProperties = {
    marginRight: theme.padding.s,
    width: 300
  };

  const cardOverallIconStyle: React.CSSProperties = {
    width: 30,
    height: 30
  };

  const topPartStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  };

  const insideCardStyle: React.CSSProperties = {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start'
  };

  return (
    <div style={cardOverallStyle}>
      <Card>
        <div style={insideCardStyle}>
          <div style={topPartStyle}>
            <Title style={{ margin: 0 }} level={3}>
              {title}
            </Title>
            <IconContext.Provider value={{ style: cardOverallIconStyle }}>
              <div>{icon}</div>
            </IconContext.Provider>
          </div>
          <div>
            <Title style={{ margin: 0 }} level={3}>
              {number}
            </Title>
            <Text>{trendNumber}</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CardOverall;
