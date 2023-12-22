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

const { Title } = Typography;

interface ABTestingDetailsProps {
  simulation: ABTestingSimulation;
  evaluationData: FormattedEvaluation | null;
}

const ABTestingDetails = ({
  simulation,
  evaluationData
}: ABTestingDetailsProps) => {
  const { data: simulationB, isLoading } = useSimulation(simulation.abPartner);
  const { data: simulationBEvaluationData, isLoading: evaluationLoading } =
    useSimulationEvaluation(simulation.abPartner);

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
      <DetailsHeader simulation={simulation} />
      {evaluationData &&
      simulationBEvaluationData &&
      evaluationData.status === 'evaluated' &&
      simulationBEvaluationData.status === 'evaluated' ? (
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
          <Flex gap={'middle'}>
            <MetricsGrid simulation={simulation} evaluation={evaluationData} />
            <MetricsGrid
              simulation={simulationB as ABTestingSimulation}
              evaluation={simulationBEvaluationData}
            />
          </Flex>

          {simulation.numConversations > 1 && (
            <InsightsCard
              formattedEvaluations={[evaluationData, simulationBEvaluationData]}
            />
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
        <ConfigurationCard title="Agent A" agentId={simulation.serviceAgent} />
        <ConfigurationCard title="Agent B" agentId={simulationB.serviceAgent} />
        <ConfigurationCard title="User" agentId={simulation.userAgent} />
      </Flex>
    </>
  );
};

export default ABTestingDetails;
