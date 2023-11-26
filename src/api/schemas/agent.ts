import { z } from 'zod';

export const AgentSchema = z.object({
  _id: z.string(),
  _v: z.undefined().optional(),
  llm: z.string(),
  temperature: z.number(),
  maxTokens: z.number(),
  prompt: z.string(),
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime()
});

export type Agent = z.infer<typeof AgentSchema>;
