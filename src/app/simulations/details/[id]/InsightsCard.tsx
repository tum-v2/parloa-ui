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

const mockData2 = [
  [
    { x: 1, y: 4 },
    { x: 2, y: 12 },
    { x: 3, y: 15 },
    { x: 4, y: 20 },
    { x: 5, y: 6 },
    { x: 6, y: 9 },
    { x: 7, y: 7 },
    { x: 8, y: 5 }
  ]
];

const mockData3 = [
  [
    { x: 1, y: 0.5 },
    { x: 2, y: 0.6 },
    { x: 3, y: 0.7 },
    { x: 4, y: 0.8 },
    { x: 5, y: 0.9 },
    { x: 6, y: 0.8 },
    { x: 7, y: 0.7 },
    { x: 8, y: 0.6 }
  ]
];

const InsightsCard = () => {
  const [selectedChart, setSelectedChart] = useState<string | number>(
    'Success Rate'
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
            options={['Success Rate', 'Amount of steps', 'Evaluation Score']}
            value={selectedChart}
            onChange={setSelectedChart}
            className="w-1/2 self-center"
          />
          <div className="h-96">
            <ParentSize>
              {({ width, height }) =>
                (selectedChart === 'Success Rate' && (
                  <LineChart
                    data={mockData}
                    width={width}
                    height={height}
                    yUnit="%"
                    yMax={100}
                  />
                )) ||
                (selectedChart === 'Amount of steps' && (
                  <LineChart data={mockData2} width={width} height={height} />
                )) ||
                (selectedChart === 'Evaluation Score' && (
                  <LineChart data={mockData3} width={width} height={height} />
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
