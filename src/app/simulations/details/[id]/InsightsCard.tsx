import { Card, Flex, Tooltip, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface InsightsCardProps {
  title: string;
  chart: React.ReactNode;
  tooltip?: string;
}

const InsightsCard = ({ title, chart, tooltip }: InsightsCardProps) => {
  return (
    <Card className="w-full">
      <Flex gap={'small'} align="center">
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
        {tooltip && (
          <Tooltip title={tooltip}>
            <Title level={5} style={{ margin: 0 }} type="secondary">
              <InfoCircleOutlined />
            </Title>
          </Tooltip>
        )}
      </Flex>
      <div className="h-72">{chart}</div>
    </Card>
  );
};

export default InsightsCard;
