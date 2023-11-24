import { Agent } from './agent';
import { Conversation } from './conversation';

export interface Simulation {
  _id: string;
  name: string;
  scenario: string;
  domain: string;
  type: string;
  numConversations: number;
  agents: Agent[];
  conversations: Conversation[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
