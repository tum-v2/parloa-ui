import { Card, Flex, Typography } from 'antd';
import { CustomerServiceOutlined, UserOutlined } from '@ant-design/icons';
import Pill from '@/components/generic/Pill';
import { getAgentLLMColor } from '@/lib/utils/simulations/simulationStyles';
import useAgent from '@/hooks/useAgent';

interface ConfigurationCardProps {
  agentId: string;
  title: string;
}

const { Title, Text } = Typography;

const ConfigurationCard = ({ agentId, title }: ConfigurationCardProps) => {
  const agent = useAgent(agentId).data;

  if (!agent) {
    return null;
  }

  return (
    <Card
      title={
        <Flex flex={1} justify="space-between" align="center" dir="row">
          <Title level={5} style={{ margin: 0 }}>
            {title === 'Agent' ? <CustomerServiceOutlined /> : <UserOutlined />}{' '}
            {title}
          </Title>
          <Pill color={getAgentLLMColor(agent.llm)}>{agent.llm}</Pill>
        </Flex>
      }
      className="w-1/2"
    >
      <Flex gap={'small'} vertical>
        <Text strong>Temperature</Text>
        <Text>{agent.temperature}</Text>
        <Text strong>Max Tokens</Text>
        <Text>{agent.maxTokens}</Text>
        {agent.prompt.map(p => (
          <>
            <Text strong>{p.name}</Text>
            <Text>{p.content}</Text>
          </>
        ))}
      </Flex>
    </Card>
  );
};

export default ConfigurationCard;
