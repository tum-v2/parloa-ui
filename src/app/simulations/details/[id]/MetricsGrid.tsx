import {
  ABTestingSimulation,
  AutomatedSimulation,
  OptimizationSimulation
} from '@/api/schemas/simulation';
import MetricsCard from '@/components/metrics-card/MetricsCard';
import { FormattedEvaluation } from '@/hooks/useSimulationEvaluation';
import { scaleValueToColor } from '@/lib/utils/color';
import { formatSecondsToMinutesAndSeconds } from '@/lib/utils/dateTime';
import { Flex } from 'antd';
import {
  IoAnalyticsOutline,
  IoBarChartOutline,
  IoChatboxEllipsesOutline,
  IoSpeedometerOutline,
  IoSwapHorizontalOutline,
  IoTimeOutline
} from 'react-icons/io5';

interface MetricsGridProps {
  simulation:
    | AutomatedSimulation
    | ABTestingSimulation
    | OptimizationSimulation;
  evaluation: FormattedEvaluation;
  evaluationScoreTrend?: number;
  timeToRunTrend?: number;
  messageCountTrend?: number;
}

const metricsCardIconStyle: React.CSSProperties = {
  width: '2rem',
  height: '2rem'
};

const RESPONSE_TIME_MAX = 500;
const MESSAGE_COUNT_MAX = 20;

const MetricsGrid = ({
  simulation,
  evaluation,
  evaluationScoreTrend,
  timeToRunTrend,
  messageCountTrend
}: MetricsGridProps) => {
  return (
    <Flex vertical gap={'small'} justify="space-between">
      <Flex gap={'small'} align="stretch" flex={1}>
        <MetricsCard
          title="Average score"
          icon={<IoAnalyticsOutline style={metricsCardIconStyle} />}
          value={Math.round(evaluation.averageScore * 100)}
          unit="%"
          progressOptions={{
            min: 0,
            max: 100,
            color: scaleValueToColor(
              Math.round(evaluation.averageScore * 100),
              100,
              0
            )
          }}
          trendNumber={evaluationScoreTrend}
        />
        <MetricsCard
          title="Time to run"
          icon={<IoTimeOutline style={metricsCardIconStyle} />}
          value={formatSecondsToMinutesAndSeconds(simulation.duration)}
          trendNumber={timeToRunTrend}
        />
        <MetricsCard
          title="Interactions"
          icon={<IoSwapHorizontalOutline style={metricsCardIconStyle} />}
          value={simulation.totalNumberOfInteractions}
          trendNumber={messageCountTrend}
        />
        {simulation.numConversations && simulation.type !== 'A/B TESTING' && (
          <MetricsCard
            title="Conversations"
            icon={<IoChatboxEllipsesOutline style={metricsCardIconStyle} />}
            value={simulation.numConversations}
          />
        )}
      </Flex>
      <Flex gap={'small'} align="stretch">
        <MetricsCard
          title="Average amount of steps to reach goal"
          icon={<IoBarChartOutline style={metricsCardIconStyle} />}
          value={evaluation.messageCount[0].dataPoints[0].y}
          unit=" steps"
          progressOptions={{
            min: 0,
            max: MESSAGE_COUNT_MAX,
            color: scaleValueToColor(
              evaluation.messageCount[0].dataPoints[0].y,
              0,
              MESSAGE_COUNT_MAX,
              true
            )
          }}
        />
        <MetricsCard
          title="Average response time"
          icon={<IoSpeedometerOutline style={metricsCardIconStyle} />}
          value={evaluation.responseTime[0].dataPoints[0].y}
          unit="ms"
          progressOptions={{
            min: 0,
            max: RESPONSE_TIME_MAX,
            color: scaleValueToColor(
              evaluation.responseTime[0].dataPoints[0].y,
              0,
              RESPONSE_TIME_MAX,
              true
            )
          }}
        />
      </Flex>
    </Flex>
  );
};

export default MetricsGrid;
