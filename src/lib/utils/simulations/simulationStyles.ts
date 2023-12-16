import { SimulationType } from '@/api/schemas/simulation';
import theme from '@/theme/theme';
import {
  ReloadOutlined,
  ExperimentOutlined,
  CodeOutlined,
  RocketOutlined
} from '@ant-design/icons';

export const getSimulationTypeStyle = (type: SimulationType) => {
  switch (type) {
    case 'AUTOMATED':
      return {
        color: theme.color.pink,
        icon: ReloadOutlined
      };
    case 'CHAT':
      return {
        color: theme.color.blue,
        icon: CodeOutlined
      };
    case 'OPTIMIZATION':
      return {
        color: theme.color.green,
        icon: RocketOutlined
      };
    case 'A/B TESTING':
      return {
        color: theme.color.orange,
        icon: ExperimentOutlined
      };
    default:
      return {
        color: theme.color.pink,
        icon: ReloadOutlined
      };
  }
};

export const getAgentLLMColor = (llm: string) => {
  switch (llm) {
    case 'GPT4':
      return theme.color.orange;
    case 'LLAMA2':
      return theme.color.blue;
    default:
      return theme.color.blue;
  }
};

export const getSimulationStatusBadgeStatus = (status: string) => {
  switch (status) {
    case 'SCHEDULED':
      return 'default';
    case 'RUNNING':
      return 'processing';
    case 'FAILED':
      return 'error';
    case 'FINISHED':
      return 'success';
    default:
      return 'default';
  }
};
