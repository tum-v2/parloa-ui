import { Agent } from './agent';
import { Conversation } from './conversation';

export type SimulationType =
  | 'AUTOMATED'
  | 'MANUAL'
  | 'OPTIMIZATION'
  | 'A/B TESTING';

export interface Simulation {
  _id: string;
  name: string;
  scenario: string;
  domain: string;
  type: SimulationType;
  numConversations: number;
  agents: Agent[];
  conversations: Conversation[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
