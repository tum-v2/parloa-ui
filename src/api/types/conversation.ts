import { Agent } from './agent';

export interface Conversation {
  _id: string;
  messages: Message[];
  startTime: Date;
  status: string;
  usedEndpoints: string[];
}

export interface Message {
  _id: string;
  sender: Agent;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
