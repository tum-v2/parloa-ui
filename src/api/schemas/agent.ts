import { z } from 'zod';

const BaseAgentSchema = z.object({
  name: z.string(),
  type: z.string(),
  llm: z.string(),
  temperature: z.number(),
  maxTokens: z.number(),
  domain: z.string(),
  goal: z.string().optional(),
  prompt: z.array(
    z.object({
      name: z.string(),
      content: z.string()
    })
  )
});

export const AgentSchema = BaseAgentSchema.extend({
  _id: z.string(),
  __v: z.number().optional(),
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime()
});

export type Agent = z.infer<typeof AgentSchema>;

// CreateAgentSchema is the same as BaseAgentSchema
export const CreateAgentSchema = BaseAgentSchema;

export type CreateAgent = z.infer<typeof CreateAgentSchema>;
