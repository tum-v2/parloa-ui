import { Card, Flex, Segmented, Typography } from 'antd';
import { StockOutlined } from '@ant-design/icons';
import LineChart from '@/components/charts/LineChart';
import { ParentSize } from '@visx/responsive';
import { useState } from 'react';

const { Title } = Typography;

const mockData = [
  [
    { x: 1, y: 12 },
    { x: 2, y: 23 },
    { x: 3, y: 43 },
    { x: 4, y: 54 },
    { x: 5, y: 65 },
    { x: 6, y: 32 },
    { x: 7, y: 43 },
    { x: 8, y: 76 }
  ]
];

const InsightsCard = () => {
  const [selectedChart, setSelectedChart] = useState<string | number>(
    'Success Rate'
  );

  return (
    <Card
      title={
        <Title level={5} style={{ margin: 0 }}>
          <StockOutlined /> Insights
        </Title>
      }
      className="w-full"
    >
      <Flex vertical>
        <Segmented
          block
          options={['Success Rate', 'Amount of steps', 'Evaluation Score']}
          value={selectedChart}
          onChange={setSelectedChart}
          className="w-1/2 self-center"
        />
        <div className="h-96">
          <ParentSize>
            {({ width, height }) => (
              <LineChart
                width={width}
                height={height}
                data={mockData}
                yMax={100}
                yUnit="%"
                padding={48}
              />
            )}
          </ParentSize>
        </div>
      </Flex>
    </Card>
  );
};

export default InsightsCard;
