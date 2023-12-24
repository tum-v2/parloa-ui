import { Card, Flex, Segmented, Typography } from 'antd';
import { StockOutlined } from '@ant-design/icons';
import LineChart from '@/components/charts/LineChart';
import { ParentSize } from '@visx/responsive';
import { useState } from 'react';
import BarChart from '@/components/charts/BarChart';
import { FormattedEvaluation } from '@/hooks/useSimulationEvaluation';

const { Title } = Typography;

interface InsightsCardProps {
  formattedEvaluations: FormattedEvaluation;
}

const InsightsCard = ({ formattedEvaluations }: InsightsCardProps) => {
  const [selectedChart, setSelectedChart] = useState<string | number>(
    'Evaluation Score'
  );

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
                    data={formattedEvaluations.evaluationScores}
                    width={width}
                    height={height}
                    yUnit="%"
                    yMax={100}
                  />
                )) ||
                (selectedChart === 'Amount of steps' && (
                  <BarChart
                    data={formattedEvaluations.messageCount}
                    width={width}
                    height={height}
                    yUnit=" steps"
                  />
                )) ||
                (selectedChart === 'Response Time' && (
                  <BarChart
                    data={formattedEvaluations.responseTime}
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
