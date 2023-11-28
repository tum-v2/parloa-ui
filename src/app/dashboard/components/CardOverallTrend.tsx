import React from 'react';
import { Trend } from './CardOverall';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { Typography } from 'antd';
import theme from '@/theme/theme';

const { Text } = Typography;

interface CardOverallTrendProps {
  trend: Trend;
  trendNumber: number;
}

const CardOverallTrend = ({ trend, trendNumber }: CardOverallTrendProps) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center'
  };

  if (trend === 'up')
    return (
      <div style={{ ...containerStyle, color: theme.token.colorSuccess }}>
        <IoCaretUp style={{ marginRight: theme.padding.xs }} />
        <Text style={{ margin: 0, color: theme.token.colorSuccess }}>
          {trendNumber}
        </Text>
      </div>
    );
  else if (trend === 'down')
    return (
      <div style={{ ...containerStyle, color: theme.token.colorError }}>
        <IoCaretDown style={{ marginRight: theme.padding.xs }} />
        <Text style={{ margin: 0, color: theme.token.colorError }}>
          {trendNumber}
        </Text>
      </div>
    );
  else
    return (
      <div style={{ ...containerStyle, color: theme.color.gray }}>
        <IoCaretUp style={{ marginRight: theme.padding.xs }} />
        <Text style={{ margin: 0, color: theme.color.gray }}>
          {trendNumber}
        </Text>
      </div>
    );
};

export default CardOverallTrend;
