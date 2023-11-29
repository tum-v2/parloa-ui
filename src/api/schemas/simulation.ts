import { z } from 'zod';
import { ConversationSchema } from './conversation';

export const SimulationSchema = z.object({
  _id: z.string(),
  _v: z.number().optional(),
  name: z.string(),
  scenario: z.string(),
  type: z.enum(['AUTOMATED', 'MANUAL', 'OPTIMIZATION', 'A/B TESTING']),
  numConversations: z.number(),
  serviceAgent: z.string(),
  userAgent: z.string(),
  conversations: ConversationSchema.array().optional(),
  status: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type Simulation = z.infer<typeof SimulationSchema>;
