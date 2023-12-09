import {
  IoAnalyticsOutline,
  IoDiceOutline,
  IoSwapHorizontalOutline
} from 'react-icons/io5';
import React from 'react';
import { Dashboard } from '@/api/schemas/dashboard';
// import { ChartData } from '@/components/charts/LineChart';

const metricsCardIconStyle: React.CSSProperties = {
  width: '2rem',
  height: '2rem'
};

// type SimulationSuccessRateGraph = {
//   _id: string;
//   successRate: number;
// };

export const metricCardData = (data?: Dashboard) => {
  return [
    {
      title: 'Total Number of Interractions',
      icon: <IoSwapHorizontalOutline style={metricsCardIconStyle} />,
      numberType: 'number',
      number: data?.interactions ? data.interactions : 0,
      trendNumber: undefined
    },
    {
      title: 'Simulation Ran ',
      icon: <IoDiceOutline style={metricsCardIconStyle} />,
      numberType: 'number',
      number: data?.simulationRuns ? data.simulationRuns : 0,
      trendNumber: undefined
    },
    {
      title: 'Average Success Rate',
      icon: <IoAnalyticsOutline style={metricsCardIconStyle} />,
      numberType: 'percentage',
      number: data?.successRate ? Math.trunc(data.successRate * 100) : 0,
      trendNumber: undefined
    }
  ];
};

// TODO: Find the right way for parsing LineChart data

// export const successRateGraphData = (data: SimulationSuccessRateGraph[]) => {
//   const newSuccessRate: ChartData = [];
//   data.forEach(item => {
//     newSuccessRate.push({
//       x: item._id,
//       y: item.successRate
//     });
//   });
//   return newSuccessRate;
// };
