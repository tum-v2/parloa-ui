import { z } from 'zod';
import { ConversationSchema } from './conversation';

export const AgentSchema = z.object({
  _id: z.string(),
  _v: z.undefined().optional(),
  llm: z.string(),
  temperature: z.number(),
  maxTokens: z.number(),
  prompt: z.string(),
  conversations: ConversationSchema.array(), // TODO: remove this when backend figures out how to return this
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime()
});

export type Agent = z.infer<typeof AgentSchema>;
