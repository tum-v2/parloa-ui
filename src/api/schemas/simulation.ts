import { z } from 'zod';
import { ConversationSchema } from './conversation';
import { AgentSchema } from './agent';

export const SimulationSchema = z.object({
  _id: z.string(),
  _v: z.number().optional(),
  user: z.string().optional().nullable(),
  name: z.string(),
  scenario: z.string(),
  domain: z.string(),
  type: z.enum(['AUTOMATED', 'MANUAL', 'OPTIMIZATION', 'A/B TESTING']),
  numConversations: z.number(),
  agents: AgentSchema.array(),
  conversations: ConversationSchema.array(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});
