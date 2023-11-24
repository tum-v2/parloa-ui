export interface Agent {
  _id: string;
  llm: string;
  temperature: number;
  maxTokens: number;
  prompt: string;
  updatedAt: string;
  createdAt: string;
}
