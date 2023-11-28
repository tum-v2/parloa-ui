import { z } from 'zod';
import { ConversationSchema } from './conversation';

export const SimulationSchema = z.object({
  _id: z.string(),
  _v: z.number().optional(),
  user: z.string().optional().nullable(),
  name: z.string(),
  scenario: z.string(),
  domain: z.string(),
  type: z.enum(['AUTOMATED', 'MANUAL', 'OPTIMIZATION', 'A/B TESTING']),
  numConversations: z.number(),
  agents: z.array(z.string()),
  conversations: ConversationSchema.array(),
  status: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type Simulation = z.infer<typeof SimulationSchema>;
