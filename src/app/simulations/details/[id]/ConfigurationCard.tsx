import { Agent } from '@/api/schemas/agent';
import { Card, Flex, Typography } from 'antd';
import { CustomerServiceOutlined, UserOutlined } from '@ant-design/icons';
import Pill from '@/components/generic/Pill';
import { getAgentLLMColor } from '@/lib/utils/simulations/simulationStyles';

interface ConfigurationCardProps {
  title: string;
  agent: Agent;
}

const { Title, Text } = Typography;

const ConfigurationCard = ({ title, agent }: ConfigurationCardProps) => {
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
        <Text strong>Instruction template</Text>
        <Text>{agent.prompt}</Text>
      </Flex>
    </Card>
  );
};

export default ConfigurationCard;
