import React from 'react';

import {
  IoAnalyticsOutline,
  IoDiceOutline,
  IoSwapHorizontalOutline
} from 'react-icons/io5';
import { HighYieldSimulationCardProps } from './HighYieldSimulationCard';

const metricsCardIconStyle: React.CSSProperties = {
  width: '2rem',
  height: '2rem'
};

const dummyDashboardData = [
  {
    title: 'Total Number of Interractions',
    icon: <IoSwapHorizontalOutline style={metricsCardIconStyle} />,

    numberType: 'number',
    number: 23540,
    trend: 'up',
    trendNumber: 58.2
  },
  {
    title: 'Simulation Ran ',
    icon: <IoDiceOutline style={metricsCardIconStyle} />,

    numberType: 'number',
    number: 54,
    trend: 'up',
    trendNumber: 58.2
  },
  {
    title: 'Average Success Rate',
    icon: <IoAnalyticsOutline style={metricsCardIconStyle} />,

    numberType: 'percentage',
    number: 78,
    trend: 'up',
    trendNumber: 58.2
  }
];

const dummyHighYieldSimulationData: HighYieldSimulationCardProps[] = [
  {
    id: 1,
    title:
      'High Yield Simulation 1 with a very long title to test the ellipsis now I need longer',
    date: '2021-01-01',
    successRateNumber: 99,
    agentType: 'Flight Service Agent'
  },
  {
    id: 2,
    title:
      'High Yield Simulation 2 with a very long title to test the ellipsis',
    date: '2021-01-01',
    successRateNumber: 95,
    agentType: 'Flight Service Agent'
  },
  {
    id: 3,
    title: 'High Yield Simulation 3',
    date: '2021-01-01',
    successRateNumber: 94,
    agentType: 'Flight Service Agent'
  },
  {
    id: 4,
    title: 'High Yield Simulation 4',
    date: '2021-01-01',
    successRateNumber: 90,
    agentType: 'Flight Service Agent'
  },
  {
    id: 5,
    title: 'High Yield Simulation 5',
    date: '2021-01-01',
    successRateNumber: 88,
    agentType: 'Flight Service Agent'
  },
  {
    id: 6,
    title: 'High Yield Simulation 6',
    date: '2021-01-01',
    successRateNumber: 87,
    agentType: 'Flight Service Agent'
  },
  {
    id: 7,
    title: 'High Yield Simulation 7',
    date: '2021-01-01',
    successRateNumber: 87,
    agentType: 'Flight Service Agent'
  },
  {
    id: 8,
    title: 'High Yield Simulation 8',
    date: '2021-01-01',
    successRateNumber: 70,
    agentType: 'Flight Service Agent'
  },
  {
    id: 9,
    title: 'High Yield Simulation 9',
    date: '2021-01-01',
    successRateNumber: 58,
    agentType: 'Flight Service Agent'
  },
  {
    id: 10,
    title: 'High Yield Simulation 10',
    date: '2021-01-01',
    successRateNumber: 56,
    agentType: 'Flight Service Agent'
  }
];

const dummyChartData = [
  [
    { x: 1, y: 12 },
    { x: 2, y: 23 },
    { x: 3, y: 43 },
    { x: 4, y: 54 },
    { x: 5, y: 65 },
    { x: 6, y: 32 },
    { x: 7, y: 43 },
    { x: 8, y: 76 }
  ]
];

export { dummyDashboardData, dummyHighYieldSimulationData, dummyChartData };
