import React from 'react';
import { IoCaretDown, IoCaretUp } from 'react-icons/io5';
import { Flex, Typography } from 'antd';
import theme from '@/theme/theme';

const { Text } = Typography;

interface CardMetricsTrendProps {
  trendNumber: number;
}

const MetricsCardTrend = ({ trendNumber }: CardMetricsTrendProps) => {
  return (
    <Flex gap={theme.margin.xs} align="center">
      {trendNumber > 0 ? (
        <IoCaretUp color={theme.token.colorSuccess} />
      ) : trendNumber < 0 ? (
        <IoCaretDown color={theme.token.colorError} />
      ) : (
        <IoCaretUp color={theme.color.gray} />
      )}
      {trendNumber !== 0 ? (
        <Text
          type={trendNumber > 0 ? 'success' : 'danger'}
          style={{ margin: 0 }}
        >
          {trendNumber}
        </Text>
      ) : (
        <Text style={{ margin: 0, color: theme.color.gray }}>
          {trendNumber}
        </Text>
      )}
    </Flex>
  );
};

export default MetricsCardTrend;
