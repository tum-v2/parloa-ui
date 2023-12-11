import { z } from 'zod';

const typeOfSimulation = [
  'AUTOMATED',
  'MANUAL',
  'OPTIMIZATION',
  'A/B TESTING',
  ''
] as const;

export const SimulationSchema = z.object({
  _id: z.string(),
  __v: z.number().optional(),
  name: z.string(),
  scenario: z.string(),
  type: z.enum(typeOfSimulation),
  numConversations: z.number(),
  serviceAgent: z.string(),
  userAgent: z.string(),
  conversations: z.string().array(),
  status: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const CreateSimulationSchema = z.object({
  type: z.enum(typeOfSimulation),
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
