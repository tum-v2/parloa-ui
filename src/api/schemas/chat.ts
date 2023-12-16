import { z } from 'zod';
import { SIMULATION_TYPES } from './simulation';

export const CreateChatSchema = z.object({
  name: z.string(),
  agentConfig: z.object({
    name: z.string(),
    domain: z.string(),
    llm: z.string(),
    temperature: z.number(),
    maxTokens: z.number(),
    prompt: z.string()
  })
});

export const CreateChatResponseSchema = z.object({
  _id: z.string(),
  __v: z.number().optional(),
  name: z.string(),
  type: z.enum(SIMULATION_TYPES),
  totalNumberOfInteractions: z.number(),
  serviceAgent: z.string(),
  status: z.string(),
  conversations: z.string().array(),
  duration: z.number(),
  optimization: z.string().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export type CreateChat = z.infer<typeof CreateChatSchema>;

export type CreateChatResponse = z.infer<typeof CreateChatResponseSchema>;
