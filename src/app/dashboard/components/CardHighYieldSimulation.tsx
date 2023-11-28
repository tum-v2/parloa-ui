import React from 'react';
import Card from '../../../components/generic/Card';
import { Typography } from 'antd';
import theme from '@/theme/theme';
import Pill from '@/components/generic/Pill';
import { IoPerson } from 'react-icons/io5';

const { Text, Title } = Typography;

export interface CardHighYieldSimulationProps {
  id: number;
  title: string;
  date: string;
  successRateNumber: number;
  agentType: string;
}

const CardHighYieldSimulation = ({
  title,
  date,
  successRateNumber,
  agentType
}: CardHighYieldSimulationProps) => {
  const bottomPartStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };
  const topPartStyle: React.CSSProperties = {
    height: 80
  };

  return (
    <Card margin="none" style={{ marginBottom: theme.padding.m }}>
      <div style={topPartStyle}>
        <Title style={{ margin: 0 }} level={4}>
          {title}
        </Title>
        <Text style={{ margin: 0, color: theme.color.gray }}>{date}</Text>
      </div>
      <div style={bottomPartStyle}>
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
        </Pill>
        <Title style={{ margin: 0 }} level={1}>
          {successRateNumber}%
        </Title>
      </div>
    </Card>
  );
};

export default CardHighYieldSimulation;
