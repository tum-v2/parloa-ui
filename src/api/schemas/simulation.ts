import { z } from 'zod';

export const SimulationSchema = z.object({
  _id: z.string(),
  __v: z.number().optional(),
  name: z.string(),
  scenario: z.string(),
  type: z.enum(['AUTOMATED', 'MANUAL', 'OPTIMIZATION', 'A/B TESTING']),
  numConversations: z.number(),
  serviceAgent: z.string(),
  userAgent: z.string(),
  conversations: z.string().array(),
  status: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const createSimulationSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  scenario: z.string(),
  type: z.enum(['AUTOMATED', 'MANUAL', 'OPTIMIZATION', 'A/B TESTING']),
  numConversations: z.number(),
  serviceAgent: z.string(), // TODO: Add type validation for service agent
  userAgent: z.string(), // TODO: Add type validation for user agent
  conversations: z.string().array()
});

export type Simulation = z.infer<typeof SimulationSchema>;
export type CreateSimulation = z.infer<typeof createSimulationSchema>;
