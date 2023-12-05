import React from 'react';
import { Flex, Typography, Card } from 'antd';
import theme from '@/theme/theme';
// import Pill from '@/components/generic/Pill';
// import { IoPerson } from 'react-icons/io5';

const { Text, Title } = Typography;

export interface HighYieldSimulationCardProps {
  id: number;
  title: string;
  date: string;
  successRateNumber: number;
  agentType: string;
}

const HighYieldSimulationCard = ({
  title,
  date,
  // agentType,
  successRateNumber
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
          {title}
        </Title>
      </div>
      <Text style={{ margin: 0, color: theme.color.gray }}>{date}</Text>
      <Flex justify="space-between" align="center">
        {/* TODO: comment out this section for now as the backend data is not stable yet
         <Pill>
          <IoPerson />
          <Text
            style={{
              margin: 0,
              marginLeft: theme.padding.xs,
              color: theme.color.white
            }}
          >
            {agentType}
          </Text>
        </Pill> */}
        <div></div>
        <Title style={{ margin: 0 }} level={1}>
          {successRateNumber}%
        </Title>
      </Flex>
    </Card>
  );
};

export default HighYieldSimulationCard;
