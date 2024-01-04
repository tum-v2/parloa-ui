import { z } from 'zod';

export const AgentSchema = z.object({
  _id: z.string(),
  __v: z.number().optional(),
  name: z.string(),
  type: z.string(),
  llm: z.string(),
  temperature: z.number(),
  maxTokens: z.number(),
  domain: z.string(),
  prompt: z.array(
    z.object({
      name: z.string(),
      content: z.string()
    })
  ),
  updatedAt: z.string().datetime(),
  createdAt: z.string().datetime()
});

export type Agent = z.infer<typeof AgentSchema>;

export const PromptPartSchema = z.object({
  name: z.string(),
  content: z.string(),
  optimizable: z.boolean().optional()
});

export type PromptPart = z.infer<typeof PromptPartSchema>;

export const CreateAgentSchema = z.object({
  name: z.string(),
  type: z.string(),
  llm: z.string(),
  domain: z.string(),
  prompt: PromptPartSchema,
  maxTokens: z.number(),
  temperature: z.number(),
  goal: z.string().optional()
});

export type CreateAgent = z.infer<typeof CreateAgentSchema>;
