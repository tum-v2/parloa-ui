import { Card, Flex, Typography } from 'antd';
import { StockOutlined } from '@ant-design/icons';
import LineChart from '@/components/charts/LineChart';
import { ParentSize } from '@visx/responsive';
import useOptimizationChildSimulations from '@/hooks/useOptimizationChildSimulations';
import { useRouter } from 'next/navigation';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title, Link } = Typography;

interface OptimizationInsightsCardProps {
  optimizationId: string;
}

const OptimizationInsightsCard = ({
  optimizationId
}: OptimizationInsightsCardProps) => {
  const { data, isLoading } = useOptimizationChildSimulations(optimizationId);
  const router = useRouter();

  if (isLoading || !data) {
    return null;
  }

  return (
    <>
      <Title level={4}>
        <StockOutlined /> Insights
      </Title>
      <Card className="w-full">
        <Flex vertical>
          <Title level={5} style={{ margin: 0 }}>
            Evaluation Score
          </Title>
          <div className="h-96">
            <ParentSize>
              {({ width, height }) => (
                <LineChart
                  data={data.chartData}
                  width={width}
                  height={height}
                  yUnit="%"
                  yMax={100}
                  onClick={index =>
                    router.push(`/simulations/details/${data.ids[index]}`)
                  }
                  tooltipTitle="Simulation"
                  tooltipExtra={
                    <div className="mt-2">
                      <Link>
                        <InfoCircleOutlined className="mr-2" />
                        Click to view details
                      </Link>
                    </div>
                  }
                />
              )}
            </ParentSize>
          </div>
        </Flex>
      </Card>
    </>
  );
};

export default OptimizationInsightsCard;
