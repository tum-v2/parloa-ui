import { Card, Flex, Segmented, Typography } from 'antd';
import { StockOutlined } from '@ant-design/icons';
import LineChart from '@/components/charts/LineChart';
import { ParentSize } from '@visx/responsive';
import { useMemo, useState } from 'react';
import BarChart from '@/components/charts/BarChart';
import { FormattedEvaluation } from '@/hooks/useSimulationEvaluation';
import { BarChartData, Datapoint } from '@/types/chart';

const { Title } = Typography;

interface InsightsCardProps {
  formattedEvaluations: FormattedEvaluation[];
}

const InsightsCard = ({ formattedEvaluations }: InsightsCardProps) => {
  const [selectedChart, setSelectedChart] = useState<string | number>(
    'Evaluation Score'
  );

  const evaluationScoresData: Datapoint[][] = useMemo(() => {
    if (formattedEvaluations.length > 1) {
      // If there are multiple evaluations format line chart data
      return formattedEvaluations.flatMap(
        evaluation => evaluation.evaluationScores
      );
    } else {
      // If there is only one evaluation format line chart data
      return formattedEvaluations[0].evaluationScores;
    }
  }, [formattedEvaluations]);

  const stepsData: BarChartData[] = useMemo(() => {
    if (formattedEvaluations.length > 1) {
      // If there are multiple evaluations format bar chart data
      return formattedEvaluations.map((evaluation, i) => ({
        key: `Simulation ${i + 1}`,
        dataPoints: evaluation.messageCount[0].dataPoints
      }));
    } else {
      // If there is only one evaluation format bar chart data
      return formattedEvaluations[0].messageCount;
    }
  }, [formattedEvaluations]);

  const responseTimeData: BarChartData[] = useMemo(() => {
    if (formattedEvaluations.length > 1) {
      // If there are multiple evaluations format bar chart data
      return formattedEvaluations.map((evaluation, i) => ({
        key: `Simulation ${i + 1}`,
        dataPoints: evaluation.responseTime[0].dataPoints
      }));
    } else {
      // If there is only one evaluation format bar chart data
      return formattedEvaluations[0].responseTime;
    }
  }, [formattedEvaluations]);

  return (
    <>
      <Title level={4}>
        <StockOutlined /> Insights
      </Title>
      <Card className="w-full">
        <Flex vertical>
          <Segmented
            block
            options={['Evaluation Score', 'Amount of steps', 'Response Time']}
            value={selectedChart}
            onChange={setSelectedChart}
            className="w-1/2 self-center"
          />
          <div className="h-96">
            <ParentSize>
              {({ width, height }) =>
                (selectedChart === 'Evaluation Score' && (
                  <LineChart
                    data={evaluationScoresData}
                    width={width}
                    height={height}
                    yUnit="%"
                    yMax={100}
                  />
                )) ||
                (selectedChart === 'Amount of steps' && (
                  <BarChart
                    data={stepsData}
                    width={width}
                    height={height}
                    yUnit=" steps"
                  />
                )) ||
                (selectedChart === 'Response Time' && (
                  <BarChart
                    data={responseTimeData}
                    width={width}
                    height={height}
                    yUnit=" ms"
                  />
                ))
              }
            </ParentSize>
          </div>
        </Flex>
      </Card>
    </>
  );
};

export default InsightsCard;
