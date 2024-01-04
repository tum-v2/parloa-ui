import { z } from 'zod';

export const SIMULATION_TYPES = [
  'AUTOMATED',
  'CHAT',
  'OPTIMIZATION',
  'A/B TESTING'
] as const;

export type SimulationType = (typeof SIMULATION_TYPES)[number];

export const BaseSimulationSchema = z.object({
  _id: z.string(),
  __v: z.number().optional(),
  name: z.string(),
  type: z.enum(SIMULATION_TYPES),
  totalNumberOfInteractions: z.number(),
  serviceAgent: z.string(),
  conversations: z.string().array(),
  status: z.string(),
  duration: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const AutomatedSimulationSchema = BaseSimulationSchema.extend({
  type: z.literal('AUTOMATED'),
  numConversations: z.number(),
  userAgent: z.string(),
  optimization: z.null(),
  evaluation: z.string().optional()
});

export const ABTestingSimulationSchema = BaseSimulationSchema.extend({
  type: z.literal('A/B TESTING'),
  numConversations: z.number(),
  userAgent: z.string(),
  optimization: z.null(),
  evaluation: z.string().optional(),
  abPartner: z.string()
});

export const OptimizationSimulationSchema = BaseSimulationSchema.extend({
  type: z.literal('OPTIMIZATION'),
  numConversations: z.number(),
  userAgent: z.string(),
  optimization: z.string().nullable(), // TODO ask backend to make this non-optional for OPTIMIZATION type
  evaluation: z.string().optional()
});

export const ChatSimulationSchema = BaseSimulationSchema.extend({
  type: z.literal('CHAT'),
  optimization: z.null()
});

export const SimulationSchema = z.discriminatedUnion('type', [
  AutomatedSimulationSchema,
  ABTestingSimulationSchema,
  OptimizationSimulationSchema,
  ChatSimulationSchema
]);

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

export const CreateSimulationResponseSchema = z.object({
  _id: z.string(),
  __v: z.number().optional(),
  name: z.string(),
  scenario: z.string().optional().nullable(),
  type: z.enum(SIMULATION_TYPES),
  numConversations: z.number().optional().nullable(),
  totalNumberOfInteractions: z.number(),
  optimization: z.string().optional().nullable(),
  serviceAgent: z.object({
    _id: z.string(),
    name: z.string(),
    domain: z.string(),
    llm: z.string(),
    temperature: z.number(),
    maxTokens: z.number(),
    prompt: z.string(),
    temporary: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  }),
  userAgent: z.object({
    _id: z.string(),
    name: z.string(),
    domain: z.string(),
    llm: z.string(),
    temperature: z.number(),
    maxTokens: z.number(),
    prompt: z.string(),
    temporary: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime()
  }),
  conversations: z.string().array(),
  status: z.string(),
  duration: z.number(),
  evaluation: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const DeleteSimulationSchema = z.object({
  _id: z.string()
});

export type Simulation = z.infer<typeof SimulationSchema>;
export type AutomatedSimulation = z.infer<typeof AutomatedSimulationSchema>;
export type ABTestingSimulation = z.infer<typeof ABTestingSimulationSchema>;
export type OptimizationSimulation = z.infer<
  typeof OptimizationSimulationSchema
>;
export type ChatSimulation = z.infer<typeof ChatSimulationSchema>;

export type CreateSimulation = z.infer<typeof CreateSimulationSchema>;
export type CreateSimulationResponse = z.infer<
  typeof CreateSimulationResponseSchema
>;
export type DeleteSimulation = z.infer<typeof DeleteSimulationSchema>;
