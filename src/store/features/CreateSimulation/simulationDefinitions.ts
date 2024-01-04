export interface SimulationControlState {
  currentStep: number;
  isWildStep: boolean;
  agentFlag: 'serviceAgent' | 'userAgent';
  GoalFlag: 'EDIT' | 'CREATE';
}

export type AgentType = 'userAgent' | 'serviceAgent' | '';

export interface AgentState {
  _id?: string;
  name: string;
  type: string;
  llm: string;
  temperature: number;
  maxTokens: number;
  domain: string;
  prompt: {
    name: string;
    content: string;
  }[];
  temporary?: boolean;
  updatedAt?: string;
  createdAt?: string;
  __v?: number | undefined;
  goal?: string | undefined;
}

export interface PromptPart {
  name: string;
  content: string;
  optimizable?: boolean;
}

export enum ConversationScenario {
  SEQUENCE = 'SEQUENCE',
  SLOT_FILLING = 'SLOT_FILLING',
  CALL_FORWARDING = 'CALL_FORWARDING'
}

export interface Goal {
  name: string;
  description: string;
  scenarios: string[];
  _id?: string;
  __v?: number;
  updatedAt?: string;
  createdAt?: string;
}

export const SIMULATION_TYPES = [
  'AUTOMATED',
  'CHAT',
  'OPTIMIZATION',
  'A/B TESTING',
  ''
] as const;

export type SimulationType = (typeof SIMULATION_TYPES)[number];

export interface SimulationState {
  type: SimulationType;
  name: string;
  description?: string;
  numConversations: number;
  serviceAgentConfig: AgentState;
  serviceAgent?: string;
  userAgent?: string;
  userAgentConfig: AgentState;
}

export interface Dropdown {
  value: string;
  label: string;
}
