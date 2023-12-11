import { z } from 'zod';

export const SimulationSchema = z.object({
  _id: z.string(),
  __v: z.number().optional(),
  name: z.string(),
  type: z.enum(['AUTOMATED', 'MANUAL', 'OPTIMIZATION', 'A/B TESTING']),
  numConversations: z.number(),
  totalNumberOfInteractions: z.number(),
  optimization: z.string().optional().nullable(),
  serviceAgent: z.string(),
  userAgent: z.string(),
  conversations: z.string().array(),
  status: z.string(),
  duration: z.number(),
  evaluation: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type Simulation = z.infer<typeof SimulationSchema>;
