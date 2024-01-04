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
