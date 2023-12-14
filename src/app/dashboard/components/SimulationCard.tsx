import React from 'react';
import { Flex, Typography, Card, Skeleton } from 'antd';
import theme from '@/theme/theme';
import Pill from '@/components/generic/Pill';
import { IoPerson } from 'react-icons/io5';
import { formatLongDateTimeString } from '@/lib/utils/dateTime';
import { Simulation } from '@/api/schemas/simulation';

const { Text, Title } = Typography;

const skeletonData = [1, 2, 3, 4, 5];

export interface SimulationCardProps {
  simulation: Simulation;
  onClick?: () => void;
  value?: number;
}

const SimulationCard = ({
  simulation,
  onClick,
  value
}: SimulationCardProps) => {
  return (
    <Card
      style={{
        marginBottom: theme.padding.m,
        borderRadius: theme.borderRadius.m,
        cursor: 'pointer'
      }}
      onClick={onClick}
      className="ease-in-out duration-300 hover:backdrop-blur-lg hover:bg-gray-100"
    >
      <Flex justify="space-between" gap={'large'} vertical>
        <div>
          <Title style={{ margin: 0 }} ellipsis={{ rows: 1 }} level={4}>
            {simulation.name}
          </Title>
          <Text style={{ margin: 0, color: theme.color.gray }}>
            {formatLongDateTimeString(simulation.createdAt)}
          </Text>
        </div>

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
              Domain Placeholder
            </Text>
          </Pill>
          {value && (
            <Title style={{ margin: 0 }} level={1}>
              {Math.trunc(value * 100)}%
            </Title>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

const SkeletonSimulationCard = () => {
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

export { SimulationCard, SkeletonSimulationCard };
