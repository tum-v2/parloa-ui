export interface Simulation {
  _id: string;
  name: string;
  scenario: string;
  domain: string;
  type: string;
  numConversations: number;
  agents: string[];
  conversations: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}
