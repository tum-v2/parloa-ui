'use client';
import useSimulation from '@/hooks/useSimulation';
import DetailsHeader from './DetailsHeader';
import InsightsCard from './InsightsCard';
import { Alert, Empty, Flex, Spin, Typography } from 'antd';
import { SettingOutlined, TableOutlined } from '@ant-design/icons';
import ConfigurationCard from './ConfigurationCard';
import useSimulationEvaluation, {
  FormattedEvaluation
} from '@/hooks/useSimulationEvaluation';
import MetricsGrid from './MetricsGrid';
import { ABTestingSimulation } from '@/api/schemas/simulation';
import { FaCircle } from 'react-icons/fa';
import theme from '@/theme/theme';
import { useMemo } from 'react';

const { Title } = Typography;

interface ABTestingDetailsProps {
  simulation: ABTestingSimulation;
  evaluationData: FormattedEvaluation | null;
}

const ABTestingDetails = ({
  simulation: simulationA,
  evaluationData: evaluationA
}: ABTestingDetailsProps) => {
  const { data: simulationB, isLoading } = useSimulation(simulationA.abPartner);
  const { data: evaluationB, isLoading: evaluationLoading } =
    useSimulationEvaluation(simulationA.abPartner);

  // Get AB comparison data
  const formattedEvaluation: FormattedEvaluation | null = useMemo(() => {
    if (evaluationA && evaluationB) {
      return {
        ...evaluationA,
        evaluationScores: [
          evaluationA.evaluationScores[0],
          evaluationB.evaluationScores[0]
        ],
        messageCount: [
          {
            key: 'Simulation A',
            dataPoints: evaluationA.messageCount[0].dataPoints
          },
          {
            key: 'Simulation B',
            dataPoints: evaluationB.messageCount[0].dataPoints
          }
        ],
        responseTime: [
          {
            key: 'Simulation A',
            dataPoints: evaluationA.responseTime[0].dataPoints
          },
          {
            key: 'Simulation B',
            dataPoints: evaluationB.responseTime[0].dataPoints
          }
        ]
      };
    } else {
      return null;
    }
  }, [evaluationA, evaluationB]);

  // Get trend data between the two simulations e.g. success rate is 10% higher in simulation A
  const evaluationScoreTrend = useMemo(() => {
    if (evaluationA && evaluationB) {
      const diff = evaluationA.averageScore - evaluationB.averageScore;
      return Math.round((diff / evaluationB.averageScore) * 100);
    }
  }, [evaluationA, evaluationB]);

  const timeToRunTrend = useMemo(() => {
    if (simulationA && simulationB) {
      const diff = simulationA.duration - simulationB.duration;
      return Math.round(-(diff / simulationB.duration) * 100);
    }
  }, [simulationA, simulationB]);

  const messageCountTrend = useMemo(() => {
    if (simulationA && simulationB) {
      const diff =
        simulationA.totalNumberOfInteractions -
        simulationB.totalNumberOfInteractions;
      return (diff / simulationB.totalNumberOfInteractions) * 100;
    }
  }, [simulationA, simulationB]);

  // Show loading indicator while fetching simulation
  if (isLoading || evaluationLoading) {
    return <Spin fullscreen size="large" />;
  }

  // Handle simulation not found
  if (!simulationB) {
    return <Empty description="Simulation not found" />;
  }

  return (
    <>
      <DetailsHeader simulation={simulationA} />
      {evaluationA &&
      evaluationB &&
      evaluationA.status === 'evaluated' &&
      evaluationB.status === 'evaluated' &&
      formattedEvaluation ? (
        <>
          <Title level={4}>
            <TableOutlined /> Metrics
          </Title>
          <Flex gap={'middle'}>
            <Flex align="center" gap={'small'} className="w-1/2">
              <FaCircle
                style={{ color: theme.color.blue, fontSize: theme.fontSize.l }}
              />
              <Title level={4} style={{ margin: 0 }}>
                Simulation A
              </Title>
            </Flex>

            <Flex align="center" gap={'small'} className="w-1/2">
              <FaCircle
                style={{ color: theme.color.pink, fontSize: theme.fontSize.l }}
              />
              <Title level={4} style={{ margin: 0 }}>
                Simulation B
              </Title>
            </Flex>
          </Flex>
          <Flex gap={'middle'} align="stretch">
            <MetricsGrid
              simulation={simulationA}
              evaluation={evaluationA}
              evaluationScoreTrend={evaluationScoreTrend}
              timeToRunTrend={timeToRunTrend}
              messageCountTrend={messageCountTrend}
            />
            <MetricsGrid
              simulation={simulationB as ABTestingSimulation}
              evaluation={evaluationB}
            />
          </Flex>

          {simulationA.numConversations > 1 && (
            <InsightsCard formattedEvaluations={formattedEvaluation} />
          )}
        </>
      ) : (
        <Alert
          message="Evaluation in progress"
          description="The evaluation is still running. Please come back later."
          type="warning"
          showIcon
          closable
          className="mt-5"
        />
      )}

      <Title level={4}>
        <SettingOutlined /> Configurations
      </Title>
      <Flex gap={'small'}>
        <ConfigurationCard title="Agent A" agentId={simulationA.serviceAgent} />
        <ConfigurationCard title="Agent B" agentId={simulationB.serviceAgent} />
        <ConfigurationCard title="User" agentId={simulationA.userAgent} />
      </Flex>
    </>
  );
};

export default ABTestingDetails;
