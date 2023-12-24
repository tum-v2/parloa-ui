'use client';
import DetailsHeader from './DetailsHeader';
import InsightsCard from './InsightsCard';
import { Alert, Flex, Typography } from 'antd';
import { SettingOutlined, TableOutlined } from '@ant-design/icons';
import ConfigurationCard from './ConfigurationCard';
import { FormattedEvaluation } from '@/hooks/useSimulationEvaluation';
import MetricsGrid from './MetricsGrid';
import {
  AutomatedSimulation,
  OptimizationSimulation
} from '@/api/schemas/simulation';
import OptimizationInsightsCard from './OptimizationInsightsCard';

const { Title } = Typography;

interface SingleSimulationDetailsProps {
  simulation: AutomatedSimulation | OptimizationSimulation;
  evaluationData: FormattedEvaluation | null;
}

const SingleSimulationDetails = ({
  simulation,
  evaluationData
}: SingleSimulationDetailsProps) => {
  return (
    <>
      <DetailsHeader simulation={simulation} />
      {evaluationData && evaluationData.status === 'evaluated' ? (
        <>
          <Title level={4}>
            <TableOutlined /> Metrics
          </Title>
          <MetricsGrid simulation={simulation} evaluation={evaluationData} />

          {simulation.optimization ? (
            <OptimizationInsightsCard
              optimizationId={simulation.optimization}
            />
          ) : (
            simulation.numConversations > 1 && (
              <InsightsCard formattedEvaluations={evaluationData} />
            )
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
        <ConfigurationCard title="Agent" agentId={simulation.serviceAgent} />
        <ConfigurationCard title="User" agentId={simulation.userAgent} />
      </Flex>
    </>
  );
};

export default SingleSimulationDetails;
