import { Agent } from './agent';

export interface Conversation {
  _id: string;
  messages: Message[];
  startTime: string;
  status: string;
  usedEndpoints: string[];
}

export interface Message {
  _id: string;
  sender: Agent;
  text: string;
  createdAt: string;
  updatedAt: string;
}
