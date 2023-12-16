import { z } from 'zod';

export const SIMULATION_TYPES = [
  'AUTOMATED',
  'CHAT',
  'OPTIMIZATION',
  'A/B TESTING',
  ''
] as const;

export type SimulationType = (typeof SIMULATION_TYPES)[number];

export const SimulationSchema = z.object({
  _id: z.string(),
  __v: z.number().optional(),
  name: z.string(),
  scenario: z.string().optional().nullable(),
  type: z.enum(SIMULATION_TYPES),
  numConversations: z.number().optional().nullable(),
  totalNumberOfInteractions: z.number(),
  optimization: z.string().optional().nullable(),
  serviceAgent: z.string(),
  userAgent: z.string().optional().nullable(),
  conversations: z.string().array(),
  status: z.string(),
  duration: z.number(),
  evaluation: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const CreateSimulationSchema = z.object({
  type: z.enum(SIMULATION_TYPES),
  name: z.string(),
  description: z.string().optional(),
  numConversations: z.number(),
  userAgentConfig: z.object({
    name: z.string(),
    domain: z.string(),
    llm: z.string(),
    temperature: z.number(),
    maxTokens: z.number(),
    prompt: z.string()
  }),
  serviceAgentConfig: z.object({
    name: z.string(),
    domain: z.string(),
    llm: z.string(),
    temperature: z.number(),
    maxTokens: z.number(),
    prompt: z.string()
  })
});

export type Simulation = z.infer<typeof SimulationSchema>;
export type CreateSimulation = z.infer<typeof CreateSimulationSchema>;
