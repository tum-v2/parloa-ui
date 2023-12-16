import { Simulation } from '@/api/schemas/simulation';
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
  simulation: Simulation;
  evaluation: FormattedEvaluation;
}

const metricsCardIconStyle: React.CSSProperties = {
  width: '2rem',
  height: '2rem'
};

const RESPONSE_TIME_MAX = 200;
const MESSAGE_COUNT_MAX = 50;

const MetricsGrid = ({ simulation, evaluation }: MetricsGridProps) => {
  return (
    <>
      <Flex gap={'small'} align="stretch">
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
        />
        <MetricsCard
          title="Time to run"
          icon={<IoTimeOutline style={metricsCardIconStyle} />}
          value={formatSecondsToMinutesAndSeconds(simulation.duration)}
        />
        <MetricsCard
          title="Interactions"
          icon={<IoSwapHorizontalOutline style={metricsCardIconStyle} />}
          value={simulation.totalNumberOfInteractions}
        />
        {simulation.numConversations && (
          <MetricsCard
            title="Conversations"
            icon={<IoChatboxEllipsesOutline style={metricsCardIconStyle} />}
            value={simulation.numConversations}
          />
        )}
      </Flex>
      <Flex gap={'small'}>
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
    </>
  );
};

export default MetricsGrid;
