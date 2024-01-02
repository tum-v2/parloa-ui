export interface SimulationControlState {
  currentStep: number;
  isWildStep: boolean;
  agentFlag: 'serviceAgent' | 'userAgent';
}

export type AgentType = 'userAgent' | 'serviceAgent';

export interface AgentState {
  name: string;
  type: AgentType; // AgentType as string
  llm: string; // LLMModel as string
  temperature: number;
  maxTokens: number;
  domain: string; // ConversationDomain as string
  temporary?: boolean;
  userGoal?: Goal | string;
  prompt: PromptPart[];
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
  scenarios: ConversationScenario[];
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
  userAgentConfig: AgentState;
}

export interface Dropdown {
  value: string;
  label: string;
}
