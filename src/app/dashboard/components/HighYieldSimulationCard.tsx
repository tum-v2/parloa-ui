import React from 'react';
import { Flex, Typography, Card, Skeleton } from 'antd';
import theme from '@/theme/theme';
import Pill from '@/components/generic/Pill';
import { IoPerson } from 'react-icons/io5';
import { formatLongDateTimeString } from '@/lib/utils/dateTime';

const { Text, Title } = Typography;

const skeletonData = [1, 2, 3, 4, 5];
export interface HighYieldSimulationCardProps {
  _id: string;
  name: string;
  createdAt: string;
  successRate: number;
  domain: string;
}

const HighYieldSimulationCard = ({
  name,
  createdAt,
  domain,
  successRate
}: HighYieldSimulationCardProps) => {
  const titleStyle: React.CSSProperties = {
    height: '5rem'
  };

  return (
    <Card
      style={{
        marginBottom: theme.padding.m,
        borderRadius: theme.borderRadius.m
      }}
    >
      <div style={titleStyle}>
        <Title style={{ margin: 0 }} ellipsis={{ rows: 2 }} level={4}>
          {name}
        </Title>
      </div>
      <Text style={{ margin: 0, color: theme.color.gray }}>
        {formatLongDateTimeString(createdAt)}
      </Text>
      <Flex justify="space-between" align="center">
        <Pill>
          <IoPerson />
          <Text
            style={{
              margin: 0,
              marginLeft: theme.padding.xs,
              color: theme.color.white
            }}
          >
            {domain}
          </Text>
        </Pill>
        <div></div>
        <Title style={{ margin: 0 }} level={1}>
          {Math.trunc(successRate * 100)}%
        </Title>
      </Flex>
    </Card>
  );
};

const SkeletonHighYieldSimulationCard = () => {
  return skeletonData.map(item => (
    <Card
      key={item}
      style={{
        marginBottom: theme.padding.m,
        borderRadius: theme.borderRadius.m
      }}
    >
      <Skeleton active />
    </Card>
  ));
};

export { HighYieldSimulationCard, SkeletonHighYieldSimulationCard };
