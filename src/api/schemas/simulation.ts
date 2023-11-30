import { z } from 'zod';

export const SimulationSchema = z.object({
  _id: z.string(),
  _v: z.number().optional(),
  name: z.string(),
  scenario: z.string(),
  type: z.enum(['AUTOMATED', 'MANUAL', 'OPTIMIZATION', 'A/B TESTING']),
  numConversations: z.number(),
  serviceAgent: z.string(),
  userAgent: z.string(),
  conversations: z.number().array(),
  status: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type Simulation = z.infer<typeof SimulationSchema>;
